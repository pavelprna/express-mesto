const Card = require("../models/card")

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards));
}

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id
  })
    .then(card => res.status(200).send(card))
}

const deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then(card => res.status(200).send(card))
}

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id} },
  { new: true },
)
  .then(card => res.status(200).send(card))

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then(card => res.status(200).send(card))

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
}
