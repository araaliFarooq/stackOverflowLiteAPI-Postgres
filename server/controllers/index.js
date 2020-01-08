// This is the default export file for our database services
// Services are responsible for interacting with our database models
// Its good design pattern to separate concern
/*
Models => Database schemas
*/

import UserController from "./user-controller";
// import QuestionService from "./question-services";
// import AnswerService from "./answer-services";

// export { UserService, QuestionService, AnswerService };
export { UserController };
