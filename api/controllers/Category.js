module.exports = function (server) {
  const Category = server.plugins['hapi-shelf'].model('Category')

  return [
    {
      method: 'GET',
      path: '/api/category',
      handler: (request, reply) => {
        Category
          .fetchAll()
          .then(categories => {
            reply(categories)
          })
      }
    },
    {
      method: 'POST',
      path: '/api/category',
      handler: (request, reply) => {
        const category = new Category()

        category
          .save({
            category_name: request.payload.categoryName
          })
          .then(function (newCategory) {
            reply(newCategory)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/category/{id}',
      handler: (request, reply) => {
        Category
          .where({id: request.params.id})
          .fetch()
          .then(function (category) {
            category.save({
              category_name: request.payload.categoryName
            })
              .then(function (category) {
                reply(category)
              })
              .catch()
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/category/delete/{id}',
      handler: (request, reply) => {
        Category
          .where({id: request.params.id})
          .fetch()
          .then(function (category) {
            category.destroy()
              .then(function (category) {
                reply(category)
              })
              .catch()
          })
          .catch()
      }
    }
  ]
}
