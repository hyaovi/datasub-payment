require('dotenv').config()
const server = require('./backend/server')
const mongoose = require('mongoose');
const next = require('next')


const mongoConfig = {
  uri:process.env.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}
const dbPromise = mongoose.connect(mongoConfig.uri, mongoConfig.options)

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

  Promise.all([app.prepare(), dbPromise]).then(() => {

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  }).catch (error=> {
  console.log('SOMN WENT WRONG', error)
})
