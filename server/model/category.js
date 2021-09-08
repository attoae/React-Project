const mongoose = require('mongoose');

const Category = mongoose.model('category', mongoose.Schema({
  name: String
}));

module.exports = Category;