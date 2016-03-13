'use strict'

module.exports = function(bookshelf) {

  const DataType = bookshelf.Model.extend({
    tableName: 'data_type'
  })

  return bookshelf.model('DataType', DataType)

}
