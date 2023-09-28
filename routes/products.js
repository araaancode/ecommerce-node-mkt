const express=require("express")
const router=express.Router()

const {  
    getProducts,
    getProduct,
    createProduct,
    updateProductInfo,
    updateProductImage,
    deleteProduct
} = require("../controllers/products")

const upload = require("../utils/upload") 
const resize = require("../utils/resize") 

router.get("/",getProducts)
router.get("/:productId",getProduct)
router.post("/",createProduct)
router.put("/:productId/update-info",updateProductInfo)
router.put("/:productId/update-image",upload.single('image'),resize.resizeProductImage,updateProductImage)
router.delete("/:productId",deleteProduct)


module.exports=router