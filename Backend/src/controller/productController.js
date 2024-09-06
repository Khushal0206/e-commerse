const Product = require("../models/productModal");
const User = require("../models/userModel");
const ApiFeature = require("../utility/ApiFeature");
const uploadCloudinary = require("../utility/cloudnary");
const errorHandlerClass = require("../utility/errorHandler");
const responseApi = require("../utility/responsUtility");

exports.createProduct = async (req, res, next) => {

   req.body.user = req.user._id;
  const {name,price,discription,category,user} = req.body
  const urls = [];

  try {
    //console.log(req)
    const Imagepath = req.files;
   // console.log(Imagepath)
    
    if(Imagepath.length <=0){
      return next( new errorHandlerClass("please uplode a Image"))
    }
    
    const promises = Imagepath.map(async (ele) => {
      
      try {

         // console.log(ele.path)
          const response1 = await uploadCloudinary(ele.path);
          //console.log(response1)
          urls.push(response1);
        } catch (error) {
          next(error)
          
        }
      });
      await Promise.all(promises);
    //console.log(urls.map((ele) => ele.secure_url));

      const productInfo = await Product.create({
          name,price,discription,category,user,image: urls.map((ele) => ele.secure_url)
      });
      //console.log(productInfo)

     const productCheack =  await Product.findById(productInfo._id)
    // console.log(productCheack)
     if(!productCheack){
      return next(new errorHandlerClass("product is not created at try again"))
     }
      
    // OR 

    //  for (const file of Imagepath) {
    //   const  path  = file.path;
    //   const newPath = await uploadCloudinary(path);
    //   urls.push(newPath);
    // }

    //console.log(urls.map((ele) => ele.secure_url));
    
    res.status(201).json({
      status: true,
      productCheack,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL PRODUCTS

exports.getAllProduct = async(req,res,next)=>{
  try {
    const Api = new ApiFeature(Product.find(),req.query)
    Api.search().filter()
    //console.log(Api)
    //let quary = Api.quary
   // console.log(quary)
    let products = await Api.product;
    //console.log(products)
    res.status(200).json(
     new responseApi(200,"your product",true,products)
    )

    
  } catch (error) {
    next(error)
  }


}
// SEARCH PRODUCT 
exports.searchProduct = async(req,res,next)=>{
  try {
  //   const {name,category} = req.query
  //   const queryObject = {}
  //   if(name){
  //     queryObject.name = {$regex:name,$options:"i"}
  //   }
  //   if(category){
  //     // const removeFields = ["name", "page", "limit"];

  //     // removeFields.forEach((key) => delete queryObject[key]);
  //     queryObject.category = {$regex:category,$options:"i"}
  // }
  //   console.log(queryObject)
  //   const findProduct = await Product.find(queryObject)
  //   res.status(200).json({
  //     findProduct
  //   })
 
    const Api = new ApiFeature(Product.find(),req.query)
    Api.search().filter()
    //console.log(Api)
    //let quary = Api.quary
   // console.log(quary)
    let products = await Api.product;
   // console.log(products)
    
  } catch (error) {
    next(error)
  }

}
// DELETE PRODUCTS
exports.deletProduct = async(req,res,next)=>{
  try {
    // console.log(req.params)
    const id = req.params.id
    
    const deleteProduct = await Product.findByIdAndDelete({_id:id})
  //  console.log(deleteProduct)
  if(!deleteProduct){
  return  next(new errorHandlerClass("This product not present",400))
  }
    res.status(200).json(
      new responseApi(200,"product is deleted",true)
    )

    
  } catch (error) {
    next(error)
  }

}

// UPDATE PRODUCT

exports.updateProduct = async(req,res,next)=>{
  try {
    const {name,price,discription} = req.body
    const findProduct = Product.findById(req.params.id)
    if(!findProduct){
      next(new errorHandlerClass("product is not found",400))
    }
    const Id = req.params.id
    //console.log(name)
     const updateItem =  await Product.findByIdAndUpdate(Id,{name,price,discription},{
        new:true,
        runValidators:true
      })
      //console.log(updateItem)
      res.status(200).json(
        new responseApi(200,"update successfully",true)
      )
    
  } catch (error) {
    next(error)
  }
}

// PRODUCT DETAIL
exports.productDetail = async(req,res,next)=>{
  try {
    const findProduct = await Product.findById(req.params.id)
    // console.log(findProduct)
    if(!findProduct){
      next (new errorHandlerClass("product is not found",400))
    }
    res.status(200).json(
      new responseApi(200,"your product is here",true,findProduct)
    )
  } catch (error) {
    next(error)
    
  }
}

// Create New Review or Update the review

exports.createProductReview = async(req,res,next)=>{
  try {
    const{rating,comment,productId} = req.body
    // console.log(rating)
     //console.log(req.user)
    const option = {
       user:req.user._id,
      name:req.user.userName,
      rating:Number(rating),
      comment
    }
    //console.log(option)
    //console.log(Product)
    const product = await Product.findById({_id:productId})
    //console.log(product)
      const findUserReviewed = product.reviews.find((ele)=>  {
        return ele.user.toString() == req.user._id.toString()
      })
     // console.log(findUserReviewed)
     if(findUserReviewed){
      product.reviews.forEach((ele)=>{
        if(ele.user.toString() == req.user._id.toString()){
           ele.rating = rating;
           ele.comment = comment
        }
      })
     }else{
       product.reviews.push(option)
       product.numberOfReview = product.reviews.length

     }
     let avg = 0
     product.reviews.forEach((ele)=>{
      avg = avg+ele.rating
     })
     //console.log(avg)
     product.rating =(avg/product.reviews.length)
    await product.save()
    //const product1 = await Product.findById({_id:productId})

    res.status(200).json(
      new responseApi(200,"all your product",true,product)
    )   
  } catch (error) {
 next(error)   
  }

}

// GET ALL PRODUCT REVIEW
 
exports.allReview = async(req,res,next)=>{
  try {
    const _id = req.params.id
    const product = await Product.findById({_id})
    if(!product){
      next(new errorHandlerClass("product not found",400))
    }
    res.status(200).json(
      new responseApi(200,"all your review",true,{
        reviews:product.reviews
      })
    )
    
  } catch (error) {
    next(error)
  }

}