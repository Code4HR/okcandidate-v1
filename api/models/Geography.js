'use strict'

module.exports = function(bookshelf) {

  const Geography = bookshelf.Model.extend({
    tableName: 'geography'
  })

  return bookshelf.model('Geography', Geography)

}
