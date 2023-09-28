const fs = require('fs')
const sharp = require('sharp')

const resizeAvatar = async (req, res, next) => {
  await sharp(req.file.path)
    .resize(100,100)
    .toFile(`public/images/${req.file.filename}`)
  await fs.unlinkSync(req.file.path)
  next()
}

const resizeProductImage = async (req, res, next) => {
  await sharp(req.file.path)
    .resize(300,300)
    .toFile(`public/images/${req.file.filename}`)
  await fs.unlinkSync(req.file.path)
  next()
}



module.exports = {
  resizeAvatar,
  resizeProductImage
}


