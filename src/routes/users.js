const express = require('express')

const router = express.Router()

const User = require('../models/user')

/* GET users listing. */
router.get('/', async (req, res) => {
  // const { name, age } = req.body
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  res.send(await User.find(query))
})

router.get('/initialize', async (req, res) => {
  const ayse = await User.create({ name: 'ayse', age: 32 })
  const tuna = await User.create({ name: 'tuna', age: 2 })

  console.log(ayse, tuna)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

router.post('/', async (req, res) => {
  const { name, age } = req.body

  const user = await User.create({ name, age })
  res.send(user)
})

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

router.patch('/:id', async (req, res) => {
  let user
  if (req.body.name) {
    user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name })
  } else if (req.body.age) {
    user = await User.findByIdAndUpdate(req.params.id, { age: req.body.age })
  }

  res.send(user)
})

module.exports = router
