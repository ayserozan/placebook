const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderSchema = new mongoose.Schema({
  item: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      autopopulate: true,
    },
  ],
  amount: 0,
  quantity: [],
})

class Order {
  async addProduct(product, quantity = 1) {
    await this.item.push(product)
    await this.quantity.push(quantity)

    await this.save()
  }

  async calculateAmount() {
    for (let i = 0; i < this.item.length; i += 1) {
      this.amount += this.item[i].price * this.quantity[i]
    }
    await this.save()
  }
}

orderSchema.loadClass(Order)
orderSchema.plugin(autopopulate)
module.exports = mongoose.model('Order', orderSchema)
