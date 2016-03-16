'use strict'

module.exports = (server) => {

  const Category = server.plugins['hapi-shelf'].model('Category');
  const DataType = server.plugins['hapi-shelf'].model('DataType');
  const Survey = server.plugins['hapi-shelf'].model('Survey');
  const Question = server.plugins['hapi-shelf'].model('Question');
  const Answer = server.plugins['hapi-shelf'].model('Answer');

  return [
    {
      method: 'GET',
      path: '/',
      handler: {
        view: 'Default'
      }
    },
    {
      method: 'GET',
      path: '/admin',
      handler: {
        view: 'Default'
      }
    },
    {
      method: 'GET',
      path: '/login',
      handler: {
        view: 'Login'
      }
    },
    {
      method: 'GET',
      path: '/category',
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
      path: '/category',
      handler: (request, reply) => {
        var category = new Category();

        category
          .save({
            category_name: request.payload.categoryName
          })
          .then(function(newCategory) {
            reply(newCategory)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/category/{id}',
      handler: (request, reply) => {
        Category
          .where({id: request.params.id})
          .fetch()
          .then(function(category) {
            category.save({
              category_name: request.payload.categoryName
            })
            .then(function(category) {
              reply(category)
            })
            .catch()
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/category/delete/{id}',
      handler: (request, reply) => {
        Category
          .where({id: request.params.id})
          .fetch()
          .then(function(category) {
            category.destroy()
            .then(function(category) {
              reply(category)
            })
            .catch()
          })
          .catch()
      }
    },
    {
      method: 'GET',
      path: '/data_type',
      handler: (request, reply) => {
        DataType
          .fetchAll()
          .then(dataTypes => {
            reply(dataTypes)
          })
      }
    },
    {
      method: 'GET',
      path: '/survey',
      handler: (request, reply) => {
        Survey
          .fetchAll()
          .then(surveys => {
            reply(surveys)
          })
      }
    },
    {
      method: 'GET',
      path: '/survey/{id}',
      handler: (request, reply) => {
        Survey
          .where({id: request.params.id})
          .fetch({withRelated: ['questions']})
          .then(survey => {
            reply(survey)
          })
      }
    },
    {
      method: 'POST',
      path: '/survey',
      handler: (request, reply) => {
        var survey = new Survey();

        survey
          .save({
            survey_name: request.payload.surveyName
          })
          .then(function(newSurvey) {
            reply(newSurvey)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/survey/{id}',
      handler: (request, reply) => {
        Survey
          .where({id: request.params.id})
          .fetch()
          .then(function(survey) {
            survey.save({
              survey_name: request.payload.surveyName
            })
            .then(function(survey) {
              reply(survey)
            })
            .catch()
          })
          .catch()
      }
    },
    {
      method: 'GET',
      path: '/question',
      handler: (request, reply) => {
        Question
          .fetchAll({withRelated: ['answers']})
          .then(questions => {
            reply(questions)
          })
      }
    },
    {
      method: 'GET',
      path: '/question/{id}',
      handler: (request, reply) => {
        Question
          .where({id: request.params.id})
          .fetch({withRelated: ['answers']})
          .then(questions => {
            reply(questions)
          })
      }
    },
    {
      method: 'POST',
      path: '/question',
      handler: (request, reply) => {
        var question = new Question();

        question
          .save({
            survey_id: request.payload.surveyId,
            category_id: request.payload.categoryId,
            data_type: request.payload.dataType,
            question_text: request.payload.questionText
          })
          .then(function(newQuestion) {
            reply(newQuestion)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/question/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(function(question) {
            question.save({
              survey_id: request.payload.surveyId,
              category_id: request.payload.categoryId,
              data_type: request.payload.dataType,
              question_text: request.payload.questionText
            })
            .then(function(answer) {
              reply(answer)
            })
            .catch()
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/question/delete/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(function(question) {
            question.destroy()
            .then(function() {
              reply()
            })
            .catch()
          })
          .catch()
      }
    },
    {
      method: 'GET',
      path: '/answer',
      handler: (request, reply) => {
        Answer
          .fetchAll()
          .then(answers => {
            reply(answers)
          })
      }
    },
    {
      method: 'GET',
      path: '/answer/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(answers => {
            reply(answers)
          })
      }
    },
    {
      method: 'POST',
      path: '/answer',
      handler: (request, reply) => {
        var answer = new Answer();

        answer
          .save({
            question_id: request.payload.questionId,
            answer_label: request.payload.answerLabel,
            answer_value: request.payload.answerValue,
            answer_order: request.payload.answerOrder
          })
          .then(function(newAnswer) {
            reply(newAnswer)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/answer/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(function(answer) {
            answer.save({
              question_id: request.payload.questionId,
              answer_label: request.payload.answerLabel,
              answer_value: request.payload.answerValue,
              answer_order: request.payload.answerOrder
            })
            .then(function(answer) {
              reply(answer)
            })
            .catch()
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/answer/delete/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(function(answer) {
            answer.destroy()
            .then(function() {
              reply()
            })
            .catch()
          })
          .catch()
      }
    }
  ]

}
