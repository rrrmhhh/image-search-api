// instantiate the app
const app = require('express')()
// require mongoose the db ORM
const mongoose = require('mongoose')
// require the api router
const apiRouter = require('./routes/apiRouter')
// require pug as a view template
const pug = require('pug')
// import mlab credentials.
const mlabInfo = require('./.mlabInfos')
// Connect to the data base
// const db = mongoose.connect('mongodb://127.0.0.1:27017/latestSitesDB')
const db = mongoose.connect(mlabInfo.uri)
// Start the server.
app.set('port', (process.env.PORT || 3000))
app.listen(app.get('port'), ()=> {
  console.log(` Houston the app is running on localhost: `, app.get('port'));
})
// for the home page of the api
// Using pug as view template
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
// Home set up.
app.get('/', (req, res)=> {
  // res.send('Houston we are ON!')
  res.render('index', {title: "image search api"})
})
// route the api routes.
app.use('/api', apiRouter)
