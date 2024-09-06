const errorHandler =(err,req,res,next)=>{
    // console.log(err)
    message= err.message || "something went wrong"
    statusCode = err.status || 500 
    res.status(statusCode).json({
        message:message,
        
    })

}
module.exports = errorHandler