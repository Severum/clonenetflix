const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const saltRounds = 10

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async (doc) => {
  console.log('save: '+JSON.stringify(doc,null,2))
  // try {
  //   doc.password = await bcrypt.hash(doc.password, await bcrypt.genSalt(saltRounds))
  // } catch (err) {
  //   console.log("err: "+err.message)
  //   throw err
  // }
})

module.exports = mongoose.model('User', userSchema)
