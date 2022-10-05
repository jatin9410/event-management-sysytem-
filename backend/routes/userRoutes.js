const express = require('express')
const userController = require('../Controllers/userController')
const { signup, login ,logout,updatePassword,forgotPassword,eventinvitation} = userController;
const auth= require('../Middlewares/auth')
const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

// //login route
// router.post('/login', login )

// router.get('/logout',logout)


// router.route("/register").post(signup);

router.route("/login").post(login)

router.route("/logout").get(logout)

router.route("/password/forgot").post(forgotPassword)

router.post('/password/update', auth.isAuthenticatedUser , updatePassword);
// router.route("/password/update").put(updatePassword)

router.post('/dashboard',eventinvitation)


module.exports = router