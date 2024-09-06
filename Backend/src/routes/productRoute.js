const express = require("express")
const { createProduct, getAllProduct, deletProduct, updateProduct,productDetail, searchProduct, createProductReview, allReview } = require("../controller/productController")
const upload = require("../middleware/multer")
const verifyAuth = require("../middleware/auth")
const router = express.Router()
router.route("/create").post(upload.array('image',10),verifyAuth,createProduct)
router.route("/allProduct").get(getAllProduct)
router.route("/searchProduct").get(searchProduct)

router.route("/productInfo/:id").delete(deletProduct).get(productDetail)
router.route("/updateProduct/:id").patch(upload.any(),updateProduct)
router.route("/createReview").post(verifyAuth,createProductReview)
router.route("/allReview/:id").get(verifyAuth,allReview)

module.exports = router