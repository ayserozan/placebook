const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        autopopulate: { maxDepth: 1 },
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
})

class Order {
  async addProduct(product, quantity = 1) {
    const currentItem = this.orderItems.find(orderItem => orderItem.id == product.id)
    if (currentItem) {
      currentItem.quantity += quantity
    } else {
      this.orderItems.push({ item: product, quantity })
    }

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
