let Product=require("../models/Product")

// get all products
const getProducts=async(req,res)=>{
  try {
    let products = await Product.find({})

    if (products) {
      res.status(200).json({
        msg: 'products fetched',
        products,
      })
    } else {
      res.status(403).json({
        msg: 'can not fetch products',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}

// get single product
const getProduct=async(req,res)=>{
   try {
    let product = await Product.findById(req.params.productId)

    if (product) {
      res.status(200).json({
        msg: 'product fetched',
        product,
      })
    } else {
      res.status(403).json({
        msg: 'can not fetch product',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}

// create product
const createProduct=async(req,res)=>{
   try {
    await new Product({
      title:req.body.title,
      image:req.files.image[0].filename,
      category:req.body.category,
      description:req.body.description,
      price:req.body.price,
    }).create().then(product=>{
      if(product){
        res.status(201).json({
          msg:"create product",
          product
      })
      }
    }).catch((err)=>{
      res.status(403).json({
        msg:"محصول ساخته نشد",
        err
      })
    })
     
   } catch (error) {
     console.log(error);
   }
}

// update product information
const updateProductInfo=async(req,res)=>{
  console.log(req.body);
  try {
    await Product.findByIdAndUpdate({_id:req.params.productId},{
      title:req.body.title,
      category:req.body.category,
      description:req.body.description,
      price:req.body.price,
    },{new:true}).then(product=>{
      if(product){
        res.status(200).json({
          msg:"create update",
          product
      })
      }
    }).catch((err)=>{
      console.log(err);
      res.status(403).json({
        msg:"محصول به روز رسانی نشد",
        err
      })
    })
     
   } catch (error) {
     console.log(error);
   }
}

// update product image
const updateProductImage=async(req,res)=>{
  try {
    await Product.findByIdAndUpdate(
      req.params.productId,
      {
        image: req.file.filename,
      },
      { new: true }
    ).then((product) => {
      if (product) {
        res.status(200).json({
          msg: 'عکس ویرایش شد',
          product,
        })
      } else {
        res.status(403).json({
          msg: 'عکس ویرایش نشد',
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}

// delete product
const deleteProduct=async(req,res)=>{
  try {
    await Product.findByIdAndDelete(req.params.productId).then((product) => {
      if (product) {
        res.status(200).json({
          msg: ' با موفقیت حذف شد',
          product,
        })
      } else {
        res.status(403).json({
          msg: ' حذف نشد',
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}

module.exports={
    getProducts,
    getProduct,
    createProduct,
    updateProductInfo,
    updateProductImage,
    deleteProduct
}