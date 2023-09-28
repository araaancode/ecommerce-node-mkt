const express=require("express")
const router=express.Router()

const {  
    getUsers,
    getUser,
    orderProducts,
    createUser,
    getMe,
    updateUserInfo,
    updateUserAvatar,
    deleteUser,
} = require("../controllers/users")


const {authUser,isUserAdmin} = require("../middlewares/auth")
const {resizeAvatar} = require("../utils/resize")
const upload = require("../utils/upload")

// admins
// router.get("/admin",admin)

router.get("/me",authUser,getMe)
router.get("/:userId",getUser)

router.put("/:userId/update-user-info",updateUserInfo)
router.put("/:userId/update-user-avatar",authUser,upload.single('avatar'),resizeAvatar,updateUserAvatar)
router.delete("/:userId",deleteUser)

router.post("/order-products",authUser,orderProducts)



module.exports=router