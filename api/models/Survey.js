'use strict'

module.exports = function(bookshelf) {

  const Survey = bookshelf.Model.extend({
    tableName: 'survey',
    questions: function() {
      return this.hasMany(bookshelf.model('Question'))
    }
  })

  return bookshelf.model('Survey', Survey)

}
