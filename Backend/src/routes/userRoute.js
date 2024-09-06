const express = require("express")
const { createUser, userLogin, allUser, user, updateUser, updataPassword, logoutUser } = require("../controller/userControlle")
const upload = require("../middleware/multer")
const verifyAuth = require("../middleware/auth")
const router = express.Router()
// console.log(Router)

router.route("/createUser").post(upload.single('avatar'),createUser)
router.route("/login").post(userLogin)
router.route("/allUser").get(verifyAuth,allUser)
router.route("/me").get(verifyAuth,user)
router.route("/updateUser").patch(upload.single('avatar'),verifyAuth,updateUser)
router.route("/updatePassword").put(verifyAuth,updataPassword)
router.route("/logout").get(verifyAuth,logoutUser)


module.exports = router