const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const searchModel = new Schema({
  term: String,
  when: String
})

module.exports = mongoose.model('ImageSearch', searchModel)
