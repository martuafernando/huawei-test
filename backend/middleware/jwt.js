const { verifyAccessToken } = require('../helper/jwt');
const { failedResponse } = require('../helper/response');
const userRepository = require('../repository/users')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')?.[1]

  if (!token) return res
    .status(401)
    .json(failedResponse('Unauthorized'))

  verifyAccessToken(token, (error, data) => {
    if (error) {
      return res
        .status(403)
        .json(failedResponse('Forbidden'))
    }

    const user = userRepository.getById(data.id)

    if (!user) {
      return res
        .status(401)
        .json(failedResponse('Unauthorized'))
    }

    req.user = user

    next()
  })
}

module.exports = authenticateToken