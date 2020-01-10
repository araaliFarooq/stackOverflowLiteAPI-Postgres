import { QuestionController } from '../../controllers';

export default class QuestionView {
  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with array of all questions
   */
  static async getAllQuestions(req, res) {
    const response = await QuestionController.findAllQuestions({});
    if (response.length > 0) {
      return res.status(200).send({
        data: response
      });
    }
    return res.status(204).send({
      message: 'No questions posted yet'
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with a single question
   */
  static async getSingleQuestions(req, res) {
    const {
      params: { id }
    } = req;

    const response = await QuestionController.findOneQuestion({ id });
    if (response) {
      return res.status(200).send({
        data: response
      });
    }
    return res.status(404).send({
      message: 'Question not found'
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with array of question details.
   */
  static async postQuestion(req, res) {
    try {
      const exception = await QuestionView.validateDocs(req);
      if (exception) {
        return res.status(409).send({ message: exception });
      }

      const data = { ...req.body, userId: req.user.id };
      const question = await QuestionController.postQuestion({
        ...data
      });
      return res.status(201).send({
        question,
        message: 'Question posted successfully',
        success: true
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'Couldnot post question',
        success: false
      });
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response>} with array of edited question details.
   */
  static async updateQuestion(req, res) {
    try {
      const qstnId = req.params.id;
      const userId = req.user.id;

      const qstnById = await QuestionController.findOneQuestion({
        id: qstnId
      });
      if (!qstnById) {
        return res.status(400).send({
          message: 'Question does not exist',
          success: false
        });
      }
      if (qstnById.userId === userId) {
        const exception = await QuestionView.validateDocs(req);
        if (exception) {
          return res.status(409).send({ message: exception });
        }
        const data = { ...req.body };
        const updatedQuestion = await QuestionController.updateQuestion(
          qstnId,
          {
            ...data
          }
        );
        return res.status(updatedQuestion[0] ? 200 : 500).send({
          success: !!updatedQuestion[0],
          message: updatedQuestion[0]
            ? 'Question successfully updated'
            : 'Update not successfully'
        });
      }
      return res.status(401).send({
        message: 'unauthorized to edit question',
        success: false
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'Couldnot edit question',
        success: false
      });
    }
  }

  /**
   * @param  {Request} req
   * @returns {String} a specific error as a response from operation.
   */
  static async validateDocs(req) {
    const {
      body: { title, qstnbody },
      params: { id }
    } = req;
    let exception = '';

    const qstnBytitle = await QuestionController.findOneQuestion({
      title
    });

    const qstnBybody = await QuestionController.findOneQuestion({
      qstnbody
    });

    if (id) {
      // eslint-disable-next-line no-underscore-dangle
      if (qstnBytitle && (qstnBytitle.id === id) === false) {
        exception = `Title "${title}" is already in use`;
      }
      // eslint-disable-next-line no-underscore-dangle
      if (qstnBybody && (qstnBybody.id === id) === false) {
        exception = 'This question already exists. Check out its answers';
      }
    } else if (qstnBytitle || qstnBybody) {
      exception = qstnBytitle
        ? `Title "${title}" is already in use`
        : 'This question already exists. Check out its answers';
    }
    return exception;
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise} object containing a boolean and deletedCount .
   */
  static async deleteQuestion(req, res) {
    try {
      const qstnId = req.params.id;
      const userId = req.user.id;

      const qstnById = await QuestionController.findOneQuestion({
        id: qstnId
      });

      if (!qstnById) {
        return res.status(400).send({
          message: 'Question does not exist',
          success: false
        });
      }
      if (qstnById.userId === userId) {
        const deletedResponse = await QuestionController.deleteQuestion(qstnId);
        if (deletedResponse) {
          return res.status(200).send({
            message: 'Question deleted successfully',
            success: true
          });
        }
        return res.status(400).send({
          message: 'Couldnot delete question',
          success: false
        });
      }
      return res.status(401).send({
        message: 'unauthorized to edit question',
        success: false
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'Couldnot delete question',
        success: false
      });
    }
  }
}
