import JoiValidator from "./JoiValidator";
import answerCreateSchema from "../helpers/validations/answer";

export default class answerValidator {
  static validateAnswer(req, res, next) {
    return JoiValidator.validateRequestBody(req, res, next, answerCreateSchema);
  }
}
