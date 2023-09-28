const express=require("express")
const router=express.Router()

const {  
    getOrders,
    getOrder,
    getMyOrders,
    createOrder,
} = require("../controllers/orders")


router.get("/",getOrders)
router.get("/:orderId",getOrder)
router.get("/my-orders",getMyOrders)
router.post("/",createOrder)


module.exports=router