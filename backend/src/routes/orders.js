const express = require('express')
const Order = require('../models/order')
// const User = require('../models/user')
// const Product = require('../models/product')

const router = express.Router()

/* async function main() {
  const order1 = await Order.create({ item: [], quantity: [], amount: 0 })
  const margaritta = await Product.create({ name: 'margaritta', price: 10 })
  const cola = await Product.create({ name: 'Coca-cola', price: 3 })

  await order1.addProduct(margaritta)
  await order1.addProduct(cola)
  await order1.calculateAmount()

  return order1
} */

/* GET users listing. */
router.get('/', async (req, res) => {
  // const { name, age } = req.body
  // const order = await main()
  const order = await Order.find()
  res.send(order)
})

router.post('/', async (req, res) => {
  const { orderItems, userId } = req.body

  const createdOrder = await Order.create({ orderItems, userId, amount: 0 })
  // we created 33 line because of the mongoose autopopulate
  const order = await Order.findById(createdOrder._id)

  await order.calculateAmount()
  res.send(order)
})

router.patch('/:id', async (req, res) => {})

module.exports = router
