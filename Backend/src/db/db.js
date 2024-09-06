const mongoose = require("mongoose")
const mongoDB =async()=>{
   
        // await mongoose.connect(process.env.MONGO_URI).then(()=>{
        //     console.log("connected successfully")
        //  }).catch((error)=>{
        //     console.log("connection failed"+ error)
        //     throw error
        //  })

        //OR

         try {
           const mongo =  await mongoose.connect(process.env.MONGO_URI)
           console.log("connection sucessfully")
        //    console.log(mongo)
          // return  "hello"

           
            
         } catch (error) {
            console.log("connection failed"+ error)
            throw error
         }
       
   
    
}
module.exports = mongoDB