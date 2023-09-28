require('dotenv').config()

// libs
const express=require("express")
const path=require("path")
const morgan=require("morgan")
const cookieParser = require('cookie-parser')

const errorMiddleware=require("./middlewares/errors")
const mongoErrorMiddleware=require("./middlewares/mongo_error")

const app=express()

// connect to datbase
require("./config/db")()

// define routes
const authRoutes=require("./routes/auth")
const indexRoutes=require("./routes/index")
const orderRoutes=require("./routes/orders")
const productRoutes=require("./routes/products")
const userRoutes=require("./routes/users")


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(express.static('public'))
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cookieParser())


// use routes
app.use('/api/auth',authRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/',indexRoutes)

// error middlewares
app.use(errorMiddleware.handler404)
app.use(errorMiddleware.handlerServerErrors)
app.use(mongoErrorMiddleware)

// server setup
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is listeng at PORT ${PORT}`);
})