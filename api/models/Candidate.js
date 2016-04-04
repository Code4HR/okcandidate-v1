'use strict'

module.exports = function(bookshelf) {

  const Candidate = bookshelf.Model.extend({
    tableName: 'candidate'
  })

  return bookshelf.model('Candidate', Candidate)

}
