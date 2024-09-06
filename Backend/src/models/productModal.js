const mongoose = require("mongoose")
const User = require("./userModel")
const productSchema  = new mongoose.Schema(
    {
        name:{
            type:String,
            require:[true,"please enter product name"]
        },
        category:{
            type:String,
            require:[true,"please enter product name"]
        },
        description:{
            type:String,
            require:[true,"please enter description of product "]
        },
        price:{
            type:Number,
            require:[true,"please enter price of product"]
        },
        rating:{
            type:Number,
            default:0
        },
        image:{
            type:[String],
            require:[true,"please uplode image"]
        },
        category:{
            type:String,
           // require:[true,"please enter product name"]
        },
        numberOfReview:{
            type:Number,
            default:0
        },
        reviews:[
            {
                user:{
                    type:mongoose.Schema.ObjectId,
                    ref:User
                },
                name:{
                    type:String

                },
                rating:{
                    type:Number
                },
                comment:{
                    type:String
                }
            }
        ],
        user:{
            type:mongoose.Schema.ObjectId,
            ref:User

        },
        createdAt:{
            type:Date,
            default:Date.now()
        }

    }
)
const product = mongoose.model("product",productSchema)
module.exports = product