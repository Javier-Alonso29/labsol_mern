const mongoose = require('mongoose')

// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
)

// Export model
module.exports = mongoose.model('User', userSchema)
