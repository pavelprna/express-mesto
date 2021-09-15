const Card = require("../models/card")

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка при получении карточек' }));
}

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id
  })
    .then(card => res.status(200).send(card))
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' })
      } else {
        res.status(500).send({ message: 'Ошибка при создании карточки' })
      }
    });
}

const deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then(card => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Ошибка при удалении карточки' }));
}

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
.then(card => res.status(200).send(card))
.catch((error) => {
  if (error.name === "ValidationError") {
    res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' })
  } else {
    res.status(500).send({ message: 'Ошибка при постановке лайка' })
  }
});

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
.then(card => res.status(200).send(card))
.catch((error) => {
  if (error.name === "ValidationError") {
    res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' })
  } else {
    res.status(500).send({ message: 'Ошибка при снятии лайка' })
  }
});

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
}
