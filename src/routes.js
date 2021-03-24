const routes = require('express').Router()

const SessionController = require('./app/Controllers/SessionController')

routes.post('/sessions', SessionController.store)

module.exports = routes