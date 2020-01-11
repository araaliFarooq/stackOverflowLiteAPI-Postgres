import { Router } from 'express';
import { answerValidator, SecureRoute } from '../../middleware/index';
import AnswerView from './answer-view';

const answerRouter = Router();

answerRouter.post(
  '/:id/answers',
  SecureRoute.loginRequired,
  answerValidator.validateAnswer,
  AnswerView.postAnswer
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

answerRouter.get('', AnswerView.getAllAnswers);

export default answerRouter;
