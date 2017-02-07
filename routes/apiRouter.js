// require express.
const express = require('express')
// Get the Search model. basically access the data base.
const Search = require('./../models/imageSearchModel')
// Require the controllers
// make sure to call the function other wise it won't work.
const apiController = require('./../controllers/apiController.js')(Search)


// initiate a router => a mini app if you will.
const apiRouter = express.Router()

// we have two main routes the /api/:query, and /latest
// To test /api
apiRouter.route('')
  .get(apiController.get)

// Routes for /api/latest search
apiRouter.route('/latest')
  .get(apiController.getLatest)


// Searches Controller /api/:query
apiRouter.route('/:search')
  .get(apiController.handleSearch)

// export the router, make it available to be required.
module.exports = apiRouter
