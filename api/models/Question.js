'use strict'

module.exports = function(bookshelf) {

  const Question = bookshelf.Model.extend({
    tableName: 'question',
    answers: function() {
      return this.hasMany(bookshelf.model('Answer'))
    }
  })

  return bookshelf.model('Question', Question)

}
