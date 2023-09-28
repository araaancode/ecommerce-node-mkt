const express=require("express")
const router=express.Router()

const {  
    index,
    login,
    register,
    profile,
    notFound,
    serverError,
    forgotPassword,
    resetPassword,
    cart,
    search,
    singleProduct,
    adminPanel,
    adminUsers,
    adminProducts,
    adminOrders,
    adminOut,
    adminLogin
    
} = require("../controllers/index")

const {
    authUser,
    isLogin,
    forwardAuth,
    authAdmin,
    isLoginAdmin,
    forwardAuthAdmin
} = require("../middlewares/auth")

// admin routes || admin pages
router.get("/admin",isLoginAdmin,adminPanel)
router.get("/admin/products",isLoginAdmin,adminProducts)
router.get("/admin/users",isLoginAdmin,adminUsers)
router.get("/admin/orders",isLoginAdmin,adminOrders)
router.get("/admin/signout",isLoginAdmin,adminOut)
router.get("/admin/login",forwardAuthAdmin,adminLogin)

// global routes
router.get('/',isLogin,index)
router.get('/login',forwardAuth,login)
router.get('/register',forwardAuth,register)
router.get('/profile',isLogin,profile)

// test routes
// router.get('/notFound',notFound)
// router.get('/serverError',serverError)
router.get('/forgot-password',forgotPassword)
router.get('/reset-password',resetPassword)


// product page
router.get('/cart',isLogin,cart)
router.get('/products/:productId',isLogin,singleProduct)

router.get('/search',search)
router.get('/servererror',serverError)

module.exports = router