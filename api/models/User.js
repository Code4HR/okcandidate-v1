'use strict'

module.exports = function(bookshelf) {

  const User = bookshelf.Model.extend({
    tableName: 'app_user'
  })

  return bookshelf.model('User', User)

}
