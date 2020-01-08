import * as Joi from "@hapi/joi";

const answerCreateSchema = Joi.object()
  .keys({
    answer: Joi.string()
      .required()
      .trim()
  })
  .min(1)
  .max(1);

export default answerCreateSchema;
