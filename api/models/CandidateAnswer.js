'use strict'

module.exports = function(bookshelf) {

  const CandidateAnswer = bookshelf.Model.extend({
    tableName: 'candidate_answer'
  })

  return bookshelf.model('CandidateAnswer', CandidateAnswer)

}
