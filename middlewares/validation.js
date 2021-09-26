const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const isUrlValidator = (link) => {
  const result = validator.isURL(link);
  if (result) {
    return link;
  }
  throw new Error('Неверный формат URL');
};

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(isUrlValidator),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  createCardValidator,
  cardIdValidator,
};
