import { UserController } from '../../controllers';
import {
  FacebookAuthentication,
  GoogleAuthentication,
  UserHelper,
  hashPassword,
  sendUserEmailConfirmation,
  decodeToken,
  verifyPassword,
  createToken
} from '../../helpers';

export default class UserView {
  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with array of users
   */
  static async getAllUserRecords(req, res) {
    const response = await UserController.findAllUsers({});
    return res.json({
      data: response
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} authenticated user via google
   */
  static async googleAuthentication(req, res) {
    try {
      const {
        query: { accessToken }
      } = req;
      const profile = await GoogleAuthentication.getGoogleProfile(accessToken);
      if (profile.error) {
        return res.status(400).send({
          success: false,
          message: "Couldn't get user Profile info"
        });
      }
      const userInfo = GoogleAuthentication.extractUserProfile(profile);
      const user = await UserHelper.createSocialUser({
        username:
          userInfo.displayName +
          Math.random()
            .toString(36)
            .substring(7),
        email: userInfo.email
      });
      return res.status(200).send({
        user
      });
    } catch (e) {
      return res.status(500).send({
        success: false,
        message: "Couldn't authenticate user with google"
      });
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} authenticated user via facebook
   */
  static async faceBookAuthentication(req, res) {
    try {
      const {
        query: { accessToken }
      } = req;
      const response = await FacebookAuthentication.getFaceBookProfile(
        accessToken
      );
      const profile = UserController.validateFacebookProfile(response, res);
      const user = await UserHelper.createSocialUser({
        email: profile.email,
        username:
          profile.name +
          Math.random()
            .toString(36)
            .substring(7)
      });
      return res.json(user);
    } catch (e) {
      return res.status(500).send({
        success: false,
        message: e.message || 'Unable to authenticate user with facebook'
      });
    }
  }

  /**
   * @param  {} response
   * @param  {Response} res
   * @returns user profile
   * @throws error message is profile is not got successfully
   */
  static validateFacebookProfile(response, res) {
    if (response.error) {
      return res.status(500).json({
        success: false,
        message: response.error.message || 'Failed to get profile'
      });
    }
    const profile = FacebookAuthentication.serializeProfile(response);
    if (!profile.email) {
      return res.status(500).send({
        success: false,
        message:
          'This account doesnt have email associated with it,' +
          'Please use a different account or sign up using google or an email '
      });
    }
    return profile;
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns user profile
   * @throws error message if account not created successfully
   */
  static async registerUser(req, res) {
    try {
      const {
        body: { username, email, confirmPassword, password }
      } = req;
      let exception = '';
      if (password !== confirmPassword) {
        exception = 'Passwords do not match';
        return res.status(400).send({ message: exception });
      }
      const userByEmail = await UserController.findOneUser({
        email
      });
      const userByUsername = await UserController.findOneUser({
        username
      });
      if (userByEmail || userByUsername) {
        exception = userByUsername
          ? `Username "${username}" is already in use`
          : `Email "${email}" is already in use`;
      }
      if (exception) {
        return res.status(409).send({ message: exception });
      }
      const data = {
        ...req.body,
        password: await hashPassword(password)
      };
      const user = await UserController.createUser({ ...data });
      await sendUserEmailConfirmation(req, user);
      return res.send({
        user,
        message: `A confirmation email has been sent to "${user.email}" for verification`,
        success: true
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'Couldnot complete registration',
        success: false
      });
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns confirmation message
   * @throws error message if account not created successfully
   */
  static async confirmEmail(req, res) {
    try {
      const { id } = await decodeToken(req.params.token);
      const user = await UserController.findOneUser({ _id: id });
      if (!user) {
        return res.status(404).send({
          message: 'User not Found',
          success: false
        });
      }
      if (user.isVerified) {
        return res.status(400).send({
          success: false,
          message: 'User is already verified'
        });
      }
      const { nModified } = await UserController.updateUser(id, {
        isVerified: true
      });

      return res.status(nModified ? 200 : 500).send({
        success: nModified,
        message: nModified
          ? 'User successfully verified'
          : 'Verification not successfully'
      });
    } catch (e) {
      return res.status(500).send({
        message: 'The link seems to have expired please try again',
        success: false
      });
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns user auth token
   * @throws error message if login wasn't successful
   */
  static async loginUser(req, res) {
    const { username, password } = req.body;
    const user = await UserController.findOneUser({ username });
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }
    const verified = await verifyPassword(user.password, password);
    const message = !verified ? 'Invalid Password' : 'User not verified';

    if (!verified || !user.isVerified) {
      return res.status(400).send({
        success: false,
        message
      });
    }
    const { _id: userId } = user;
    const token = await createToken({
      id: userId,
      email: user.email
    });
    return res.send({
      success: true,
      message: 'Login success',
      token,
      data: {
        username: user.username,
        email: user.email,
        id: user.id
      }
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns a users profile
   * @throws error message if user doesn't exist
   */
  static async getUserProfile(req, res) {
    const { id } = req.user;
    const user = await UserController.findOneUser({ _id: id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
    const { email, username, _id: userId } = user;
    return res.status(200).send({
      success: true,
      data: { id: userId, email, username }
    });
  }
}
