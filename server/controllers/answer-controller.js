import models from '../models';

export default class AnswerController {
  /**
   * @param  {object} options
   * @returns {Promise} any
   * @description returns a single answer object basing on the options
   */
  static async findOneAnswer(option) {
    const answer = await models.Answer.findOne({ where: option });
    return answer;
  }

  /**
   * @param  {object} data
   * @returns {Promise}
   * @description creates a single answer object from data object
   *
   */
  static async postAnswer(data) {
    const newAnswer = await models.Answer.create({
      ...data
    });
    return newAnswer;
  }

  /**
   * @param  {object} data
   * @param {string} id  id of question object to be updated
   * @returns {Promise}
   * @description updates a single answer object
   *@
   */
  static async updateAnswer(id, data) {
    const updated = await models.Answer.updateOne(
      { ...data },
      { where: { id } }
    );
    return updated;
  }

  /**
   * @param {string} id  id of question object to be deleted
   * @returns {Promise}
   * @description deletes a single answer object
   *@
   */
  static async deleteAnswer(id) {
    const deleted = await models.Answer.destroy({ where: { id } });
    return deleted;
  }

  /**
   * @param {object}option
   * @returns {Promise}
   * @description returns all answers filtered using options param
   */
  static async findAllAnswers(options) {
    const results = await models.Answer.find(options);
    return results;
  }
}
