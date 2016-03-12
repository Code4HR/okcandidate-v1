'use strict'

module.exports = function(bookshelf) {

  const ResponseType = bookshelf.Model.extend({
    tableName: 'response_type'
  })

  return bookshelf.model('ResponseType', ResponseType)

}
