'use strict'

module.exports = function(bookshelf) {

  const Category = bookshelf.Model.extend({
    tableName: 'category'
  })

  return bookshelf.model('Category', Category)

}
