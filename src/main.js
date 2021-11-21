// @ts-check

const app = require('./app')

const { log } = console
const PORT = 5000

app.listen(PORT, () => {
  log('server Start')
})
