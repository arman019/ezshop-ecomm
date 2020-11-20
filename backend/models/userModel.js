import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

/* 
another way to encrypt

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch)=> {
      if (err) return cb(err);
      cb(null, isMatch);
  });
} */


// we can fire functions in any state of saving the data in the data base 
//here we have use the 'pre' which works before saving the data
//this is a middleware so we have to pass 'next'
// if the user modifies only name or email not password then we have to isModified() to check this checks if password modified or not .this is a mongoose function


userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})


const User = mongoose.model('User', userSchema)

export default User