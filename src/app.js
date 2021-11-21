// @ts-check

const express = require('express')

const app = express()
const userRouter = require('./routers/user')

// views 폴더 경로 지정
app.set('views', 'src/views')
app.set('view engine', 'pug')

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))
app.use('/uploads', express.static('uploads'))

// 에러 핸들링
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})
// index.pug 랜더링
app.get('/', (req, res) => {
  res.render('index', {
    message: 'Render Message',
  })
})

module.exports = app
