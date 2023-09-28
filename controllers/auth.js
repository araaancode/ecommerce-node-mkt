const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const {sendEmail,sendSuccessEmail} = require("../utils/sendMail")

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// login user
const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(403).json({ msg: 'لطفا همه فیلدها را وارد کنید',msgCode:1 })
    }


    let user = await User.findOne({email:req.body.email})

    if (user) {
      if (await user.matchPassword(req.body.password)) {
        let token = createToken(user._id)
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        })

        res.status(200).json({
          msg: 'کاربر با موفقیت وارد سایت شد',
          msgCode:2,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
          token,
          
        })

      } else {
        res.status(400).json({
          msg: 'گذرواژه نادرست است',
          msgCode:1
        })
      }
    } 
    else {
      res.status(404).json({
        msg: 'کاربر یافت نشد, ثبت نام کنید',
        msgCode:1
      })
    }
  } catch (error) {
    res.status(403).json({
      msg: 'catch error',
      error,
      msgCode:3
    })
  }
}

// register user
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select('-password')

    if (user) {
      res.status(404).json({
        msg: 'کاربر وجود دارد, وارد سایت شوید',
        msgCode:1,
      })
    } else {
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      }).then((newUser, err) => {
        if (newUser) {
          let token = createToken(newUser._id)
          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          })
          res.status(201).json({
            msg: 'کاربر با موفقیت ثبت نام شد',
            msgCode:2,
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: newUser.password,
            isAdmin: newUser.isAdmin,
            token,

          })

        } else {
          res.status(400).json({
            msg: 'کاربر ثبت نام نشد',
            error: err,
            msgCode:3,
          })
        }
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
      msgCode:3,
    })
  }
}

// logout user
const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/login')
}


const forgotPassword = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })

    if (user) {
      let token = await Token.findOne({ userId: user._id })

      if (token) {
        await token.deleteOne()
      } else {
        let newToken = crypto.randomBytes(32).toString('hex') // raw token
        let hashedToken = await bcrypt.hash(newToken, 10) // cooked token

        let link = `${process.env.currentURL}/reset-password?token=${newToken}&userId=${user._id}`
        sendEmail(user, link)

        await Token.create({
          userId: user._id,
          token: hashedToken,
          createdAt: Date.now(),
        }).then((data) => {
          if (data) {
            res.status(201).json({ msg: 'لطفا ایمیل خود را بررسی کنید', data,msgCode:2 })
          } 
        }).catch(err=>{
            res.status(403).json({ msg: 'مشکل در فرستادن ایمیل', err,msgCode:3 })
        })
      }
    } else {
      res.status(404).json({
        msgCode:1,
        msg: 'چنین ایمیلی وجود ندارد',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'خطایی وجود دارد، دوباره امتحان کنید',
      error,
      msgCode:3
    })
  }
}

const resetPassword = async (req, res) => {
  let { userId, token, password, confirmPassword } = req.body

  let passwordResetToken = await Token.findOne({ userId })
  if (!passwordResetToken) {
    throw new Error('Invalid or expired password reset token')
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token)
  if (!isValid) {
    throw new Error('Invalid or expired password reset token')
  }
  if (password === confirmPassword) {
    const hash = await bcrypt.hash(password, 10)
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    )
    const user = await User.findById({ _id: userId })
    let link = `${process.env.currentURL}/login`
    sendSuccessEmail(user, link)
    await passwordResetToken.deleteOne()
    res.status(200).json({
      msg: 'گذرواژه با موفقیت تغییر کرد',
      msgCode:2
    })
  }
}

const adminOut=(req,res)=>{
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/admin/login')
}

const loginAdmin=async(req,res)=>{
  try {
    if (!req.body.email || !req.body.password) {
      res.status(403).json({ msg: 'لطفا همه فیلدها را وارد کنید',msgCode:1 })
    }


    let user = await User.findOne({email:req.body.email})

    if (user) {
      if (await user.matchPassword(req.body.password)) {
        let token = createToken(user._id)
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        })


        res.status(200).json({
          msg: 'کاربر با موفقیت وارد سایت شد',
          msgCode:2,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
          token,
          
        })

      } else {
        res.status(400).json({
          msg: 'گذرواژه نادرست است',
          msgCode:1
        })
      }
    } 
    else {
      res.status(404).json({
        msg: 'کاربر یافت نشد, ثبت نام کنید',
        msgCode:1
      })
    }
  } catch (error) {
    res.status(403).json({
      msg: 'catch error',
      error,
      msgCode:3
    })
  }
}


module.exports = {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  loginAdmin,
  adminOut
}