const userRepository = require("../../repository/users");
const { successResponse, failedResponse } = require("../../helper/response");
const { generateAccessToken } = require("../../helper/jwt");
const hash = require('pbkdf2-password')()

function registerUser(req, res) {
  const { name, email, password } = req.body

  const isUserExists = userRepository.isUserExists(email)

  if (isUserExists) {
    return res
      .status(400)
      .json(failedResponse('User has been Created'))
  }

  const users = {}

  hash({ password }, function (err, pass, salt, hash) {
    if (err) throw err;

    users.salt = salt;
    users.hash = hash;

    userRepository.create({ name, email, password: hash, salt })
  });

  return res.json(successResponse('User Created'))
}

function loginUser(req, res) {
  const { email, password } = req.body

  const user = userRepository.getByEmail(email)

  if (!user) {
    return res
      .status(400)
      .json(failedResponse('User has not registered'))
  }

  hash({ password, salt: user.salt }, function (err, pass, salt, hash) {
    if (hash === user.password) {
      const token = generateAccessToken({
        id: user.id
      })

      return res.json(successResponse('User logged successfully', { accessToken: token }))
    }

    return res
      .status(400)
      .json(failedResponse('Email / password incorrect'))
  });
}

function getUser(req, res) {
  const user = req.user

  if (!user) {
    return res
      .status(400)
      .json(failedResponse('User not found'))
  }

  return res.json(successResponse('User retrieved', user))
}

module.exports = {
  registerUser,
  loginUser,
  getUser
}