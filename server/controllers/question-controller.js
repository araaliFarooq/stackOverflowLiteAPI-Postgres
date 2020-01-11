import models from '../models';

export default class QuestionController {
  /**
   * @param  {object} options
   * @returns {Promise} any
   * @description returns a single question object basing on the options
   */
  static async findOneQuestion(option) {
    const question = await models.Question.findOne({
      where: option,
      include: [
        {
          model: models.Answer,
          as: 'answers'
        },
        {
          model: models.User,
          as: 'author',
          attributes: ['id', 'username']
        }
      ]
    });
    return question;
  }

  /**
   * @param  {object} data
   * @returns {Promise}
   * @description creates a single question object from data object
   *
   */
  static async postQuestion(data) {
    const newQuestion = await models.Question.create({
      ...data
    });
    return newQuestion;
  }

  /**
   * @param  {object} data
   * @param {string} id  id of question object to be updated
   * @returns {Promise}
   * @description updates a single question object
   *@
   */
  static async updateQuestion(id, data) {
    const updated = await models.Question.update(
      { ...data },
      { where: { id } }
    );
    return updated;
  }

  /**
   * @param {string} id  id of question object to be deleted
   * @returns {Promise}
   * @description deletes a single question object
   *@
   */
  static async deleteQuestion(id) {
    const deleted = await models.Question.destroy({ where: { id } });
    return deleted;
  }

  /**
   * @param {object}option
   * @returns {Promise}
   * @description returns all users or filtered using options param
   */

  static async findAllQuestions() {
    const results = await models.Question.findAndCountAll({
      include: [
        {
          model: models.Answer,
          as: 'answers'
        },
        {
          model: models.User,
          as: 'author',
          attributes: ['id', 'username']
        }
      ],
      distinct: true
    });
    return results;
  }
}
// static async findAllQuestions() {
//   const results = await models.Question.findAll({
//     attributes: [
//       [
//         models.sequelize.fn('COUNT', models.sequelize.col('questionId')),
//         'count'
//       ]
//     ],
//     include: {
//       model: models.Answer,
//       as: 'answers'
//     },
//     group: ['Question.id', 'answers.id']
//   });
//   return results;
// }

//   static async findAllQuestions() {
//     const results = await models.sequelize.query(
//       'SELECT "Question"."id", "Question"."title", "Question"."qstnbody", "Question"."tags", "Question"."createdAt", "Question"."updatedAt", "Question"."userId", "answers"."id" AS "answers.id", "answers"."answer" AS "answers.answer", "answers"."votes" AS "answers.votes", "answers"."status" AS "answers.status", "answers"."createdAt" AS "answers.createdAt", "answers"."updatedAt" AS "answers.updatedAt", "answers"."userId" AS "answers.userId", "answers"."questionId" AS "answers.questionId" FROM "Questions" AS "Question" LEFT OUTER JOIN "Answers" AS "answers" ON "Question"."id" = "answers"."questionId"',
//       {
//         type: models.sequelize.QueryTypes.SELECT,
//         model: models.Question,
//         mapToModel: true
//       }
//     );
//     return results;
//   }
// }
