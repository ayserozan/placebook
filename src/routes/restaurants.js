const express = require('express')
const Restaurant = require('../models/restaurant')

const router = express.Router()

router.get('/initialize', async (req, res) => {
  const kebabi = await Restaurant.create({ name: 'kebabi' })
  const samis = await Restaurant.create({ name: 'samis' })

  await kebabi.createMenu('soups')
  await kebabi.createMenu('kebabs')
  await kebabi.createMenu('beverages')
  await kebabi.menus[0].addProduct('mercimek', 10)
  await kebabi.menus[0].addProduct('iskembe', 10)
  await kebabi.menus[1].addProduct('adana', 10)
  await kebabi.menus[1].addProduct('urfa', 10)
  await kebabi.menus[1].addProduct('tepsi', 15)
  await kebabi.menus[2].addProduct('fanta', 2)
  await kebabi.menus[2].addProduct('Coca cola', 2)
  await kebabi.menus[2].addProduct('Ice Tea', 1.8)
  await kebabi.menus[2].addProduct('Sprite', 2.1)

  await samis.createMenu('pizza')
  await samis.createMenu('beverages')
  await samis.menus[0].addProduct('margaritta', 10)
  await samis.menus[0].addProduct('vegan', 12)
  await samis.menus[0].addProduct('salami', 15)
  await samis.menus[1].addProduct('fanta', 3)
  await samis.menus[1].addProduct('Coca cola', 3)
  await samis.menus[1].addProduct('Ice Tea', 2)
  await samis.menus[1].addProduct('Sprite', 2.5)

  await samis.save()
  await kebabi.save()

  res.sendStatus(200)
})

router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  res.send(await Restaurant.find(query))
})

router.get('/:restaurantId', async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurantId)

  if (restaurant) {
    res.render('restaurant', { restaurant })
  } else res.sendStatus(404)
})

router.post('/', async (req, res) => {
  const { name } = req.body

  const restaurant = await Restaurant.create({ name })
  res.send(restaurant)
})

router.delete('/:restaurantId', async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.restaurantId)

  res.sendStatus(200)
})

router.patch('/:restaurantId', async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.send(404)
    return
  }
  const restaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantId, { name })
  res.send(restaurant)
})

module.exports = router
