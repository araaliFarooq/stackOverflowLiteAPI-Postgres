import models from '../models';

// This Class is responsible for handling all database interactions for a user
export default class UserController {
  /**
   * @param  {object} options
   * @returns {Promise}
   * @description returns all users or filtered using options param
   */
  static async findAllUsers(options) {
    const results = await models.User.findAll(options);
    return results;
  }

  /**
   * @param  {object} options
   * @returns {Promise} any
   * @description returns a single user object basing on the options
   */
  static async findOneUser(options) {
    const user = await models.User.findOne({ where: options });
    return user;
  }

  /**
   * @param  {object} data
   * @returns {Promise}
   * @description creates a single user object from data object
   *@
   */
  static async createUser(data) {
    const newUser = await models.User.create({ ...data });
    return newUser;
  }

  /**
   * @param  {object} data
   * @param {string} id  id of user object to be updated
   * @returns {Promise}
   * @description updates a single user object
   *@
   */
  static async updateUser(id, data) {
    const updated = await models.User.update({ ...data }, { where: { id } });
    console.log('update -->>', updated);

    return updated;
  }
}
