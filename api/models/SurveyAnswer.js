'use strict'

module.exports = function(bookshelf) {

  const SurveyAnswer = bookshelf.Model.extend({
    tableName: 'survey_answer'
  })

  return bookshelf.model('SurveyAnswer', SurveyAnswer)

}
