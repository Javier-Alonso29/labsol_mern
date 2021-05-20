const router = require('express').Router()
const userService = require('../services/user')
const { requireLogin } = require('../middlewares/auth')
// Register user con middleware
router.post('/register', userService.registerUser)

// Login
router.post('/login', userService.loginUser)

router.get('/', requireLogin, userService.getUsers)

module.exports = router
