const express=require("express")
const router=express.Router()

const { 
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    loginAdmin
} = require("../controllers/auth")


// admin routes
router.post("/admin/login",loginAdmin)

// user routes
router.post("/forgot-password",forgotPassword)
router.post("/reset-password",resetPassword)
router.post("/login",login)
router.post("/register",register)



router.get("/logout",logout)

module.exports=router