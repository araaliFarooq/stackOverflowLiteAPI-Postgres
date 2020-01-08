import { Router } from "express";
import { questionValidator, SecureRoute } from "../../middleware/index";
import QuestionController from "./question-controller";

const questionRouter = Router();

questionRouter.post(
  "",
  SecureRoute.loginRequired,
  questionValidator.validateCreateQuestion,
  QuestionController.postQuestion
);

questionRouter.put(
  "/:id",
  SecureRoute.loginRequired,
  questionValidator.validateCreateQuestion,
  QuestionController.updateQuestion
);

questionRouter.delete(
  "/:id",
  SecureRoute.loginRequired,
  QuestionController.deleteQuestion
);

questionRouter.get("", QuestionController.getAllQuestions);

questionRouter.get("/:id", QuestionController.getSingleQuestions);

export default questionRouter;
