const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
}

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании пользователя', body: req.body }))
}

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.updateOne({ _id: req.user._id}, { name, about })
    .then(user => res.send({ data: user }));
}

const updateAvatar = (req, res) => {
  const { link } = req.body;

  User.updateOne({ _id: req.user._id}, { avatar: link })
    .then(user => res.send({ data: user }));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar
}
