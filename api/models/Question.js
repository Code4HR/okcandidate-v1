'use strict'

module.exports = function(bookshelf) {

  const Question = bookshelf.Model.extend({
    tableName: 'question',
    survey: function() {
      return this.belongsTo(bookshelf.model('Survey'))
    },
    category: function() {
      return this.hasOne(bookshelf.model('Category'))
    },
    dataType: function() {
      return this.hasOne(bookshelf.model('DataType'), 'data_type')
    },
    answers: function() {
      return this.hasMany(bookshelf.model('Answer'))
    }
  })

  return bookshelf.model('Question', Question)

}
