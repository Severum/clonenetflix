const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    thumbnail: {
      type: String,
      unique: true,
      required: true,
    },
    src: {
      type: String,
      unique: true,
      required: true,
    },
    ytlink: {
      type: String,
      unique: true,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Film', filmSchema)
