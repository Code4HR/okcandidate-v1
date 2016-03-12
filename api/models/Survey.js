'use strict'

module.exports = function(bookshelf) {

  const Survey = bookshelf.Model.extend({
    tableName: 'survey'
  })

  return bookshelf.model('Survey', Survey)

}
