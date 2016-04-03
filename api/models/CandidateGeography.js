'use strict'

module.exports = function(bookshelf) {

  const CandidateGeography = bookshelf.Model.extend({
    tableName: 'candidate_geography'
  })

  return bookshelf.model('CandidateGeography', CandidateGeography)

}
