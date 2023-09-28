const User=require("../models/User")
const Order=require("../models/Order")
const Product=require("../models/Product")

const index=async(req,res)=>{
    var perPage = 9
    let page = req.query.page || 1
    let limitProducts=await Product.find({}).skip((perPage * page) - perPage).limit(perPage)
    let allProducts=await Product.find({})
    res.render("index",
    {
        title:"خانه",
        limitProducts,  
        current: page,
        pages: Math.ceil(allProducts.length / perPage)
    })
}

const login=(req,res)=>{
    res.render("login",{title:"ورود"})
}

const register=(req,res)=>{
    res.render("register",{title:"ثبت نام"})
}

const forgotPassword=(req,res)=>{
    res.render("forgotPassword",{title:"فراموشی گذرواژه"})
}

const resetPassword=(req,res)=>{
    res.render("resetPassword",{title:"تغییر گذرواژه"})
}

const notFound=(req,res)=>{
    res.render("notFound",{title:"صفحه پیدا نشد | 404"})
}

const serverError=(req,res)=>{
    res.render("serverError",{title:"خطای سرور |‌ 500"})
}

const singleProduct=(req,res)=>{
    let product=Product.findOne({title:req.params.productId})
    res.render("singleProduct",{title:req.params.productId})
}

const profile=(req,res)=>{
    res.render("profile",{title:"پروفایل"})
}

const cart=(req,res)=>{
    res.render("cart",{title:"سبد خرید"})
}

const search=async(req,res)=>{
    let product=await Product.findOne({title:req.query.title})
    if(product){
        res.redirect(`/products/${product._id}`)
    }else{
        res.render('notFound')
    }
}

const adminPanel=(req,res)=>{
    res.render("admin/adminPanel",{title:"پنل ادمین"})
}

const adminUsers=async (req,res)=>{
    var perPage = 9
    let page = req.query.page || 1
    let users=await User.find({}).skip((perPage * page) - perPage).limit(perPage)
    let allUsers=await User.find({})
    res.render("admin/adminUsers",
    {
        title:"محصولات",
        users,  
        current: page,
        pages: Math.ceil(allUsers.length / perPage)
    })
}

const adminProducts=async(req,res)=>{
    var perPage = 9
    let page = req.query.page || 1
    let products=await Product.find({}).skip((perPage * page) - perPage).limit(perPage)
    let allProducts=await Product.find({})
    res.render("admin/adminProducts",
    {
        title:"محصولات",
        products,  
        current: page,
        pages: Math.ceil(allProducts.length / perPage)
    })
}

const adminOrders=async(req,res)=>{
    var perPage = 9
    let page = req.query.page || 1
    let orders=await Order.find({}).skip((perPage * page) - perPage).limit(perPage)
    let allOrders=await Order.find({})
    res.render("admin/adminOrders",
    {
        title:"سفارش ها",
        orders,  
        current: page,
        pages: Math.ceil(allOrders.length / perPage)
    })
}

const adminLogin=(req,res)=>{
    res.render("admin/adminLogin",{title:"ورود به پنل مدیریت"})
}

const adminOut=(req,res)=>{
    res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/admin/login')
}


module.exports={
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
}