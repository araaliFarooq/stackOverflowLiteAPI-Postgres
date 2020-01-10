import { Router } from 'express';
import { questionValidator, SecureRoute } from '../../middleware/index';
import QuestionView from './question-views';

const questionRouter = Router();

questionRouter.post(
  '',
  SecureRoute.loginRequired,
  questionValidator.validateCreateQuestion,
  QuestionView.postQuestion
);

questionRouter.put(
  '/:id',
  SecureRoute.loginRequired,
  questionValidator.validateCreateQuestion,
  QuestionView.updateQuestion
);

questionRouter.delete(
  '/:id',
  SecureRoute.loginRequired,
  QuestionView.deleteQuestion
);

questionRouter.get('', QuestionView.getAllQuestions);

questionRouter.get('/:id', QuestionView.getSingleQuestions);

export default questionRouter;
