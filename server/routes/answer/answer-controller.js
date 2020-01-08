import { AnswerService } from "../../services";

export default class AnswerController {
  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with array of all questions
   */
  static async getAllAnswers(req, res) {
    const response = await AnswerService.findAllAnswers({});
    if (response.length > 0) {
      return res.status(200).send({
        data: response
      });
    }
    return res.status(204).send({
      message: "No answers posted yet"
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with array of question details.
   */
  static async postAnswer(req, res) {
    try {
      const exception = await AnswerController.validateDocs(req);
      if (exception) {
        return res.status(409).send({ message: exception });
      }
      const data = {
        ...req.body,
        userId: req.user.id,
        questionId: req.params.id
      };
      console.log("data-->>", req);
      const answer = await AnswerService.postAnswer({
        ...data
      });
      return res.status(201).send({
        answer,
        message: "Answer posted successfully",
        success: true
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message || "Couldnot post answer",
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
      body: { answerbody },
      params: { id }
    } = req;
    let exception = "";

    const answerBybody = await AnswerService.findOneAnswer({
      answer: answerbody
    });
    if (answerBybody.questionId.equals(id)) {
      exception = "A similar answer to this question already exists";
    }
    return exception;
  }
}
