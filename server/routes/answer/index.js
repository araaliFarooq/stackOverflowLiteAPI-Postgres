import { Router } from "express";
import { answerValidator, SecureRoute } from "../../middleware/index";
import AnswerController from "./answer-controller";

const answerRouter = Router();

answerRouter.post(
  "/:id/answers",
  SecureRoute.loginRequired,
  answerValidator.validateAnswer,
  AnswerController.postAnswer
);

// answerRouter.put(
//   "/:id",
//   SecureRoute.loginRequired,
//   questionValidator.validateCreateQuestion,
//   QuestionController.updateQuestion
// );

// answerRouter.delete(
//   "/:id",
//   SecureRoute.loginRequired,
//   QuestionController.deleteQuestion
// );

answerRouter.get("", AnswerController.getAllAnswers);

export default answerRouter;
