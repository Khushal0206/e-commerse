const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validate = require("validator")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    require: [true, "please enter userName"],
  },
  email: {
    type: String,
    unique: true,
    require: [true, "please enter email"],
  },
  password: {
    type: String,
    require: [true, "please enter password"],
    minLength: [6, "password minimum length is 6 charater"],
    select: false,
  },
  conformPassword: {
    type: String,
    require: [true, "please enter password"],
    select: false,
    validate:function(){
         return this.password == this.conformPassword
    }

  },
  avatar: {
    type: Object,
    // require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.pre("save",async function(){
 //console.log(this)
 const hash = await bcrypt.hash(this.password,10)
this.password = hash
})

userSchema.methods.comparePassword = async function(password){
  try {
    //  console.log("je")
    // console.log(typeof(password))
    // console.log(password)
    // console.log(typeof(this.password))

    // console.log(this)
  
    const result = await bcrypt.compare(password,this.password)
    //console.log(result)
  
    return result
  } catch (error) {
    console.log(error)
    
  }
  
}

userSchema.methods.tokenGenrate = async function(){
  try {
   const token = await jwt.sign({id:this._id},process.env.ACCESS_TOKEN)
   return token
  } catch (error) {
    return next(error)
  }

}

// console.log(userSchema)


const User = mongoose.model("user", userSchema);
module.exports = User;
