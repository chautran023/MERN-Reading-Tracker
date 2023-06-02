import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
mongoose.set('strictQuery', false);

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên'],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      validate: {
        validator: validator.isEmail,
        message: 'Email không hợp lệ',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập password'],
      minlength: 6,
      select: false,//ko tim theo password. Bi loai bo khi thao tac findOne >>> ko tra ve response
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'lastName',
    },
    // location: {
    //   type: String,
    //   trim: true,
    //   maxlength: 20,
    //   default: 'my city',
    // },
  })
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash (this.password, salt)
})
UserSchema.methods.createJWT = function () {
    return jwt.sign({userID:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      })
}
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password) //this.password is hashed already
  return isMatch
}
export default mongoose.model('User', UserSchema)
