const { models } = require("mongoose");
const User = require("../models/userModel");
const errorHandlerClass = require("../utility/errorHandler");
const uploadCloudinary = require("../utility/cloudnary");
const ResponseApi = require("../utility/responsUtilityUser");

exports.createUser = async (req, res, next) => {
  try {
   // console.log(User)
    const { userName, email, password, avatar, conformPassword } = req.body;
     
    let avatarImg
    if(req.file && req.file.path){
      avatarImg = await uploadCloudinary(req.file.path)
 }
    //console.log(avatarImg)


    if (!userName || !email || !password || !conformPassword) {
      return next(new errorHandlerClass("please enter all your filed",400));
    }
    if(password != conformPassword){
      return next(new errorHandlerClass("please enter valid password",400));

    }

    const user = await User.create({
      userName,
      email,
      password,
      conformPassword,
      avatar:{
        profileUrl:avatarImg?.url,
        profileSecure_url:avatarImg?.secure_url
      }
    });
    //  const prototypeOfObj = Object.getPrototypeOf(user);
    //  console.log(prototypeOfObj);

    res.status(200).json(
     new ResponseApi(200,user,true,"Resister sucessfully")
    );
  } catch (error) {
    next(error);
  }
};

//LOGIN

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  //  console.log(req)
  // console.log(password)
    if (!email || !password) {
      next(new errorHandlerClass("please enter your all credentials",400));
    }
    const user = await User.findOne({ email }).select("+password");
      // console.log(user)
    if (!user) {
      return next(new errorHandlerClass("please enter valid creadentials",400));
    }

    const result = await user.comparePassword(password);
    console.log(result)
    //console.log(result);
    if (!result) {
      // console.log("false")
      return next(new errorHandlerClass("please enter valid creadentials password",400));
    }
    const token = await user.tokenGenrate();
    console.log(token)
    if (!token) {
      return next(new errorHandlerClass("please login first",400));
    }
    res.cookie("jwtToken",token,{
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'Lax',
       secure: false,
    })
    console.log(req)
    const responseApiUse = new ResponseApi(200,user,true,"Login sucessfully")

    res.status(200).json(
       responseApiUse
    );
  } catch (error) {
    next(error)
  }
};

// get user
exports.user = async(req,res,next)=>{
  try {
    const user =  await User.findOne(req.user._id)
    console.log(user)
    if(!user){
      return next(new errorHandlerClass("Not user find . Login first",400))
    }
    const responseApiUse = new ResponseApi(200, user , true, "Successfully retrieved user");

    res.status(200).json(
      responseApiUse
    )
  } catch (error) {
    return next(error)
  }

}

exports.allUser = async(req,res,next)=>{
  try {
     //console.log(next)
    const users = await User.find()
    if(!users){
      return next (new errorHandlerClass("no any user present",400))
    }
    //console.log(req)
    res.status(200).json(
      new ResponseApi(200,users,true,"All user heres")

    )

  } catch (error) {
    return next (error)
  }
}

//Update User

exports.updateUser = async(req,res,next)=>{
  try {
    const {userName,email} = req.body
    const id = req.user._id
    const updateData ={
      userName:userName,
      email:email
    }
    let avatarImg;
    // console.log(req.file.path)
    if(req.file && req.file.path){
      avatarImg = await uploadCloudinary(req.file.path)
       updateData.avatar = {
        profileUrl : avatarImg?.url,
        profileSecure_url : avatarImg?.secure_url
       }
       
  }
    const updatedUser =await User.findByIdAndUpdate(id,updateData,{new:true})
    res.status(200).json(
      new ResponseApi(200,updatedUser,true,"updated sucessfully")

    )
  } catch (error) {
    next(error)
    
  }


}
// Update password
exports.updataPassword =async(req,res,next)=>{
 try {
   const {oldPassword,newPassword,conformPassword} = req.body
  
   const id = req.user._id
   const user = await User.findById(id).select("+password")
  //  console.log(user)
  console.log(oldPassword)
  console.log(newPassword)
  console.log(conformPassword)
  
   const compareResult = await user.comparePassword(oldPassword)
   console.log(compareResult)
   if(!compareResult){
   return  next(new errorHandlerClass("you oldpassword are incorrect",400))
   }
   if(newPassword !== conformPassword){
    return next ("your newPassword and conform password are incorrect",400)
   }
 user.password = newPassword
 await user.save()
 const response = new ResponseApi(200,null,true,"Password update sucessfully")
 res.status(200).json(response)
 
 
 } catch (error) {
  return next(error)
  
 }
}
// Logout user
exports.logoutUser =async(req,res,next)=>{
  try {
    res.cookie("jwtToken","",{
      httpOnly:true
    })
    res.status(200).json({
      message:" logOut sucessfully "
    })
  } catch (error) {
    return next(error)
  }

}
// module.exports = {createUser}

