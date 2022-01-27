const express = require('express')
const Order = require('../models/order')
const Product = require('../models/product')

const router = express.Router()

async function main() {
  const order1 = await Order.create({ item: [], quantity: [], amount: 0 })
  const margaritta = await Product.create({ name: 'margaritta', price: 10 })
  const cola = await Product.create({ name: 'Coca-cola', price: 3 })

  await order1.addProduct(margaritta)
  await order1.addProduct(cola)
  await order1.calculateAmount()

  return order1
}

/* GET users listing. */
router.get('/', async (req, res) => {
  // const { name, age } = req.body
  const order = await main()
  res.send(order)
})

router.post('/', async (req, res) => {
  const { item, quantity } = req.body

  const order = await Order.create({ item, amount: 0, quantity })
  res.send(order)
})

module.exports = router
