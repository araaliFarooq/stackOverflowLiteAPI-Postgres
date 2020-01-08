// import { models } from "../database";

// export default class QuestionService {
//   /**
//    * @param  {object} options
//    * @returns {Promise} any
//    * @description returns a single question object basing on the options
//    */
//   static async findOneQuestion(option) {
//     const question = await models.Question.findOne(option);
//     return question;
//   }

//   /**
//    * @param  {object} data
//    * @returns {Promise}
//    * @description creates a single question object from data object
//    *
//    */
//   static async postQuestion(data) {
//     const newQuestion = await models.Question.create({
//       ...data
//     });
//     return newQuestion;
//   }

//   /**
//    * @param  {object} data
//    * @param {string} id  id of question object to be updated
//    * @returns {Promise}
//    * @description updates a single question object
//    *@
//    */
//   static async updateQuestion(id, data) {
//     const updated = await models.Question.updateOne(
//       { _id: id },
//       { $set: { ...data } }
//     );
//     return updated;
//   }

//   /**
//    * @param {string} id  id of question object to be deleted
//    * @returns {Promise}
//    * @description deletes a single question object
//    *@
//    */
//   static async deleteQuestion(id) {
//     const deleted = await models.Question.deleteOne({ _id: id });
//     return deleted;
//   }

//   /**
//    * @param {object}option
//    * @returns {Promise}
//    * @description returns all users or filtered using options param
//    */
//   static async findAllQuestions() {
//     const results = await models.Question.aggregate([
//       {
//         $lookup: {
//           from: "Answer",
//           localField: "questionId",
//           foreignField: "_id",
//           as: "answers"
//         }
//       }
//     ]);
//     return results;
//   }
// }
