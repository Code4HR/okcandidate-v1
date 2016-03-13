'use strict'

module.exports = function(bookshelf) {

  require('./Question')
  const Survey = bookshelf.Model.extend({
    tableName: 'survey',
    questions: function() {
      return this.hasMany(bookshelf.model('Question'))
    }
  })

  return bookshelf.model('Survey', Survey)

}
