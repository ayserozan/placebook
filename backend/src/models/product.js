const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
})

module.exports = mongoose.model('Product', productSchema)

/* class Product {
  constructor(name, price) {
    this.name = name
    this.price = price
  }
}

module.exports = Product */
