import { AnswerController } from '../../controllers';

export default class AnswerView {
  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with array of all questions
   */
  static async getAllAnswers(req, res) {
    const response = await AnswerController.findAllAnswers({});
    if (response.length > 0) {
      return res.status(200).send({
        data: response
      });
    }
    return res.status(204).send({
      message: 'No answers posted yet'
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with array of question details.
   */
  static async postAnswer(req, res) {
    try {
      const exception = await AnswerView.validateDocs(req);
      if (exception) {
        return res.status(409).send({ message: exception });
      }
      const data = {
        ...req.body,
        userId: req.user.id,
        questionId: req.params.id
      };
      const answer = await AnswerController.postAnswer({
        ...data
      });
      return res.status(201).send({
        answer,
        message: 'Answer posted successfully',
        success: true
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'Couldnot post answer',
        success: false
      });
    }
  }

  /**
   * @param  {Request} req
   * @returns {String} a specific error as a response from operation.
   */
  static async validateDocs(req) {
    const {
      body: { answer },
      params: { id }
    } = req;
    let exception = '';

    const answerBybody = await AnswerController.findOneAnswer({ answer });
    if (answerBybody && answerBybody.questionId === id) {
      exception = 'A similar answer to this question already exists';
    }
    return exception;
  }
}
