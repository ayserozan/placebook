const express = require('express')
const Order = require('../models/order')
// const User = require('../models/user')
const Product = require('../models/product')
const User = require('../models/user')

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res) => {
  const order = await Order.find()
  res.send(order)
})

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id)
  res.send(order)
})

router.post('/', async (req, res) => {
  const { orderItems, userId } = req.body

  const createdOrder = await Order.create({ orderItems, userId, amount: 0 })
  // we created 33 line because of the mongoose autopopulate
  const order = await Order.findById(createdOrder._id)

  const user = await User.findById(userId)

  await user.createOrder(order)
  await order.calculateAmount()
  res.send(order)
})

router.patch('/:id', async (req, res) => {
  if (req.body.orderItems) {
    console.log(req.body.orderItems)
    const order = await Order.findById(req.params.id)
    const product = await Product.findById(req.body.orderItems.item)
    await order.addProduct(product, 1)
    await order.calculateAmount()
    res.send(order)
  }
})

module.exports = router
