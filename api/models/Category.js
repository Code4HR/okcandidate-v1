'use strict'

module.exports = function(bookshelf) {

  const Category = bookshelf.Model.extend({
    tableName: 'category',
    survey: function() {
      return this.belongsTo(bookshelf.model('Survey'))
    }
  })

  return bookshelf.model('Category', Category)

}
