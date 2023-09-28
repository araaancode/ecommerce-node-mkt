const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const products = require('./data/products.json');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config()

connectDB()

// import data => node importData.js -i
const importData = async () => {
  try {
    await Product.deleteMany()

    const sampleProducts = products.map((product) => {
      return { ...product }
    })
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// delete data => node importData.js -d
const destroyData = async () => {
  try {
    await Product.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}