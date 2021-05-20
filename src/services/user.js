const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    // find user
    let user = await User.findOne({ email })

    // check if the user exist
    if (user) {
      console.log('Entro')
      return res.status(400).json({ error: 'User already exist' })
    }

    const hashed_password = await bcrypt.hash(password, 10)

    user = new User({
      name,
      email,
      password: hashed_password,
    })

    await user.save()
    return res.status(201).json({ message: 'user created' })
  } catch (error) {
    console.log(error)
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ error: 'invalid credentials' })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    console.log(user)

    return res.json({ token })
  } catch (error) {
    console.log(error)
  }
}

const getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    return res.json(user)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { registerUser, loginUser, getUsers }
