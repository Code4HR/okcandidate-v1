'use strict'

module.exports = function(bookshelf) {

  require('./Question')
  const Survey = bookshelf.Model.extend({
    tableName: 'survey',
    questions: function() {
      return this.hasMany(bookshelf.model('Question'))
    },
    categories: function() {
      return this.hasMany(bookshelf.model('Category'))
    }
  })

  return bookshelf.model('Survey', Survey)

}
