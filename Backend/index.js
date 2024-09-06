const express = require("express")
const mongoDB = require("./src/db/db")
const app = express()
const errorHandler = require("./src/middleware/errorMiddleware")

const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
  };
  
app.use(cors(corsOptions))

const cookie_parser = require("cookie-parser")
app.use(cookie_parser())


app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))


const dotenv= require("dotenv")
dotenv.config()


// mongoDB().then((data)=>{console.log(data)}).catch(()=>{console.log("failed")})
const userRoute = require("./src/routes/userRoute")
app.use("/api/v1",userRoute)

const productRoute = require("./src/routes/productRoute")
app.use("/api/v1/product",productRoute)

app.get("/",(req,res)=>{
res.json("welcome to here")
})

//Error middleware
app.use(errorHandler)

mongoDB().then(()=>{
    app.listen(8000,()=>{
        console.log("server is running port number 8000")
    })

}).catch((error)=>{
    console.log(error)

})