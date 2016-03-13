'use strict'

module.exports = function(bookshelf) {

  require('./Question')
  const Answer = bookshelf.Model.extend({
    tableName: 'answer',
    question: function() {
      return this.belongsTo('Question')
    }
  })

  return bookshelf.model('Answer', Answer)

}
