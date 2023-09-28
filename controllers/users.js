const nodeMailer = require('nodemailer')
const User = require('../models/User')

// @des get all users
// @route /api/users
const getUsers = async (req, res) => {
  try {
    let users = await User.find({}).select('-password -confirmPassword')

    if (users) {
      res.status(200).json({
        msg: 'all users fetched',
        count: users.length,
        users,
      })
    } else {
      res.status(403).json({
        msg: 'can not fetch users',
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

// @des get single user
// @route /api/users/:userId
const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId).select('-password -confirmPassword')

    if (user) {
      res.status(200).json({
        msg: 'user fetched',
        user,
      })
    } else {
      res.status(403).json({
        msg: 'can not fetch user',
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

// @des get single user
// @route /api/users/me

const getMe = async (req, res) => {
  try {
  
    let user = await User.findById(req.user.id).select('-password -confirmPassword')

    if (user) {
      res.status(200).json({
        msg: 'user fetched',
        user,
      })
    } else {
      res.status(403).json({
        msg: 'can not fetch user',
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

// @des create user 
// @route /api/users
// @access PRIVATE  => isAdmin
const createUser=async(req,res)=>{
  try {
    await User.create({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:req.body.password,
      confirmPassword:req.body.confirmPassword,
      isAdmin:req.body.isAdmin,
    }).then((newUser)=>{
      if(newUser){
        res.status(201).json({
          msg:"کاربر با موفقیت ساخته شد",
          firstName:newUser.firstName,
          lastName:newUser.lastName,
          email:newUser.email,
          isAdmin:newUser.isAdmin,
        })
      }
    }).catch(err=>{
        res.status(403).json({
          msg:"کاربر ساخته نشد",
          error:err
        })
    })
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}


// @des update user info
// @route /api/users/:userId/update-user-info
// @access PRIVATE  => isLogin
const updateUserInfo = async (req, res) => {
  console.log(req.body);
  try {
    await User.findByIdAndUpdate(
      req.params.userId,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      },
      { new: true }
    ).then((user) => {
      if (user) {
        res.status(200).json({
          msg: 'کاربر ویرایش شد',
          user,
          msgCode:2
        })
      } 
    }).catch((error)=>{
      console.log(error);
      res.status(400).json({
        msg:"user not update",
        msgCode:1,
        error:error
      })
    })
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
      msgCode:3,
    })
  }
}

// @des update user image
// @route /api/users/:userId/update-user-images
// @access PRIVATE  => isLogin
const updateUserAvatar = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.userId,
      {
        avatar: req.file.filename,
      },
      { new: true }
    ).then((user) => {
      if (user) {
        res.status(200).json({
          msg: 'آواتار کاربر ویرایش شد',
          user,
        })
      } 
    }).catch(err=>{
        console.log(err)
        res.status(403).json({
          msg: 'آواتار کاربر ویرایش نشد',
          err,
        })
    })
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}

// @des delete user
// @route /api/users/:userId
// @access PRIVATE  => isLogin
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId).then((user) => {
      if (user) {
        res.status(200).json({
          msg: 'کاربر با موفقیت حذف شد',
          user,
        })
      }
        
    }).catch((error)=>{
      console.log(error)
        res.status(403).json({
          msg: 'کاربر حذف نشد',
          error,
        })
    })
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}


const orderProducts=(req,res)=>{

  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  let mailOptions = {
    // should be replaced with real recipient's account
    to: req.user.email,
    subject: 'ثبت سفارش',
    html: `<p style="color:blue">سفارش به نام ${req.user.firstName} ${req.user.lastName} ثبت شد</p>` + '<br />' + `سفارش شما با قیمت کل ${req.body.total} ثبت شد.` + '<br />' + '<h1>******** لیست خرید ********</h1>' +  req.body.cart
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({
        msg:"ایمیل فرستاده نشد",
        msgCode:3
      })
    }
    res.json({
      msg: "سفارش با موفقیت ثبت شد. لطفا ایمیل خود را بررسی کنید.",
      msgCode:2
    })
  })
}

module.exports = {
  getUsers,
  getUser,
  orderProducts,
  createUser,
  getMe,
  updateUserInfo,
  updateUserAvatar,
  deleteUser,
}