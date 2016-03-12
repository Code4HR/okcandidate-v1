'use strict'

module.exports = function(bookshelf) {

  const Users = bookshelf.Model.extend({
    tableName: 'users'
  })

  return bookshelf.model('Users', Users)

}
