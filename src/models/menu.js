require('colors')
const Product = require('./product')

class Menu {
  constructor(name) {
    this.name = name
    this.productNames = []
    this.productInfos = []
  }

  addProduct(productName, price) {
    const newProduct = new Product(productName, price)
    this.productNames.push(newProduct.name)
    this.productInfos.push(newProduct)
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

module.exports = Menu
