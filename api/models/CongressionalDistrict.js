'use strict'

module.exports = function(bookshelf) {

  const CongressionalDistrict = bookshelf.Model.extend({
    tableName: 'congressional_district'
  })

  return bookshelf.model('CongressionalDistrict', CongressionalDistrict)

}
