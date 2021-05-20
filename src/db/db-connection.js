const mongoose = require('mongoose')

const connect = () => {
  console.log(process.env.MONGO_URI)
  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('bd connected'))
    .catch((err) => console.log(err))
}

module.exports = { connect }
