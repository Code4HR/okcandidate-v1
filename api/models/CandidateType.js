'use strict'

module.exports = function(bookshelf) {

  const CandidateType = bookshelf.Model.extend({
    tableName: 'candidate_type'
  })

  return bookshelf.model('CandidateType', CandidateType)

}
