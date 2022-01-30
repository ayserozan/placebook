const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const Product = require('./product')

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      autopopulate: true,
    },
  ],
})
class Menu {
  async addProduct(productName, productPrice) {
    const newProduct = await Product.create({ name: productName, price: productPrice })
    this.product.push(newProduct)
    console.log(this)

    // await newProduct.save()
    await this.save()
  }

  get menuInfo() {
    return (
      `${this.name.toUpperCase()}${':'}` +
      '\n\n' +
      `${this.productInfos.map((product, indx) => `${indx + 1}. ${product.name}`).join('\n')}`
    )
  }

  set menuInfo(newVal) {
    throw new Error(`menuInfo is only a getter. You can't override it with ${newVal}.`)
  }
}

menuSchema.loadClass(Menu)
menuSchema.plugin(autopopulate)

module.exports = mongoose.model('Menu', menuSchema)
