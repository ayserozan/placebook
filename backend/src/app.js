const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user')
require('./database-connection')

// const clientPromise = Promise.resolve(mongooseConnection.getClient())
const clientPromise = mongoose.connection.asPromise().then(connection => connection.getClient())
const socketService = require('./socket-service')

const indexRouter = require('./routes')
const usersRouter = require('./routes/users')
const restaurantsRouter = require('./routes/restaurants')
const orderRouter = require('./routes/orders')
const accountsRouter = require('./routes/accounts')

const app = express()

app.use(
  cors({
    // enables request from any domain, not safe, further add the only the domain you want
    origin: true,
    // origin: https://frontend-blablablabla.run.app/
    // allows cookies
    credentials: true,
  })
)

app.set('trust proxy', 1)

app.set('io', socketService)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// session initialize
app.use(
  session({
    secret: ['thisisasupersecuresecretsecret', 'whyweareneedsosupersecuresecretsecret'],
    store: MongoStore.create({ clientPromise, stringify: false }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
      secure: process.env.NODE_ENV == 'production',
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', (req, res, next) => {
  req.session.viewCount = req.session.viewCount || 0
  req.session.viewCount += 1
  next()
})

app.use('/api/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/account', accountsRouter)
app.use('/api/orders', orderRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
