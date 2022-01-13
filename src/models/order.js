const Orderitem = require('./orderitem')

class Order {
  constructor() {
    this.item = []
    this.amount = 0
    this.quantity = []
  }

  addProduct(product, quantity = 1) {
    this.item.push(product)
    this.quantity.push(quantity)
  }

  calculateAmount() {
    for (let i; i < this.item.length; i + 1) {
      this.amount += this.item[i].price * this.quantity[i]
    }
  }
}

module.exports = Order
