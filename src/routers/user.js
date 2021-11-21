// @ts-check

const express = require('express')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const router = express.Router()
router.use(express.json())
router.get('/', (req, res) => {
  res.send('User List')
})

const USERS = {
  15: {
    nickname: 'foo',
    profileImageKey: undefined,
  },
}

// /:id 값 얻어오기
router.param('id', async (req, res, next, value) => {
  // async 사용 시 try catch 처리 해줘야 함
  try {
    // @ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error('User Not Found')
      err.statusCode = 404
      throw err
    }

    // @ts-ignore
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res) => {
  // req.accepts([types]) : 클라이언트가 해당하는 타입을 받을 수 있는지 확인하는 간단한 메서드.
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
      userId: req.params.id,
      // profileImageURL: '/uploads/ebf3806a491a64ebd4d3fa48403b1155',
      profileImageURL: `/uploads/${req.user.profileImageKey}`,
    })
  }
})

router.post('/', (req, res) => {
  res.send('User POST List')
})

router.post('/:id/nickname', (req, res) => {
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname
  res.send(`User Nickname update : ${nickname}`)
})

router.post('/:id/profile', upload.single('profile'), (req, res, next) => {
  const { user } = req
  const { filename } = req.file
  user.profileImageKey = filename

  res.send(`FILE Upload ${filename}`)
})

module.exports = router
