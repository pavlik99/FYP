import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      required: false,
    },
    forename: {
      type: String,
      required: true,
      maxlength: 32,
    },
    surname: {
      type: String,
      required: true,
      maxlength: 32,
    },
    accountName: {
      type: String,
      required: false,
      maxlength: 32,
    },
    userImage: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Minimum password length must be 6 characters'],
    },
    isManager: {
      type: Boolean,
      default: false,
      required: true,
    },
    register_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)
// DELETE
// userSchema.methods.isPassword = async function (password) {
//   return await bcrypt.compare(password, this.password)
// }

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next()
//   }

//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

const User = mongoose.model('User', userSchema)

export default User
