# Express
```
npm install express --save
npm i -D @types/express
```

## body-parser
body를 파싱할수 있게 도와주는 라이브러리
express 버전이 높으면 설치 하지 않고 express.json으로 가능
```
npm i body-parser
```
```js
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
//body를 json형태로 받겠다.
//express 버전이 높으면 설치 하지 않고 express.json으로 가능
//app.use(express.json())
app.use(bodyParser.json())
```

## app.get()
GET 요청
```js
app.get('/',(req,res)=>{
  res.send('Root - GET)
})
```
## app.post()
POST 요청
```js
app.post('/',(req,res)=>{
  res.send('Root - POST)
})
```

## Path
https://expressjs.com/en/4x/api.html#path-examples

## Router
같은 URL 경로에 GET,POST 하위 경로에 있는 즉, 상위 도메인이 같은 경우
```js
const userRouter = express.Router()

userRouter.get('/',(req,res =>{
  res.send('User List)
}))

// /:id 값 얻어오기
userRouter.param('id',(req,res,next,value) =>{
  console.log(`id :`,vaule)
  next()
})
userRouter.get('/:id',(req,res =>{
  res.send('User List ID)
}))

userRouter.post('/',(req,res =>{
  res.send('User POST List)
}))

app.use('/users',userRouter)
```


## Pug로 템플릿 만들기
Node.js 템플릿 엔진
```
npm i pug
```
```js
app.set('view engine','pug')
```

## jest / supertest
```
npm i -D jest @types/jest supertest @types/supertest
```

## multer
파일 업로드를 도와주는 라이브러리
```js
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

router.post('/:id/profile', upload.single('profile'), () => {})
```

</br>
</br>
</br>

# NoSql
