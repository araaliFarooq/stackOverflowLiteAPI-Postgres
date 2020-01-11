// This is the default export file for our database services
// Services are responsible for interacting with our database models
// Its good design pattern to separate concern
/*
Models => Database schemas
*/

import UserController from './user-controller';
import QuestionController from './question-controller';
import AnswerController from './answer-controller';

// export { UserService, QuestionService, AnswerService };
export { UserController, QuestionController, AnswerController };
