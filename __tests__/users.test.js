const request = require('supertest')
const app = require('../src/app')
// const user = require('../src/models/user')

describe('users endpoints', () => {
  it('post request to/users should create a user', async () => {
    const userToCreate = {
      name: `SomeName${Date.now}`,
      age: 27,
    }
    const createdUser = (await (await request(app).post('/users')).send(userToCreate)).body
    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.age).toBe(userToCreate.age)
  })
  it('get request to/users should list users', async () => {
    const userList = (await request(app).get('/users')).body
    const usersExist = userList.length > 0
    expect(usersExist).toBe(true)
  })
  it('user get order', async () => {
    // create a new user
    const userToCreate = {
      name: `SomeName_${Date.Now}`,
      age: 21,
    }
    const createdUser = (await (await request(app).post('users')).send(userToCreate)).body

    // create a new restaurant
    const createdRestaurant = (await (await request(app).post('restaurants')).send({ name: `restaurant_${Date.now}` }))
      .body

    // create a new menu and a new product
    await createdRestaurant.createMenu('menu1')
    await createdRestaurant.menus[0].addproduct('product1', 10)

    // user search a restaurant and give an order
    // const createdOrder =
    expect(createdUser.myOrders.length).toBe(1)
    expect(createdRestaurant.menus.length).toBe(1)
  })
})
