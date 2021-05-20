const jwt = require('jsonwebtoken')

exports.requireLogin = (req, res, next) => {
  const auth = req.headers.authorization
  try {
    if (auth) {
      const token = auth.split(' ')[1]

      // verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      // atach token to request
      req.user = decode

      next()
    } else {
      return res.status(400).json({ message: 'Unauthorized' })
    }
  } catch (err) {
    console.log('something went wrong', err)
  }
}
