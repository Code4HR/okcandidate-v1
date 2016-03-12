'use strict'

module.exports = function(bookshelf) {

  const SurveyResponse = bookshelf.Model.extend({
    tableName: 'survey_response'
  })

  return bookshelf.model('SurveyResponse', SurveyResponse)

}
