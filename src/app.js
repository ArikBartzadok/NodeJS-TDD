require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})
const express = require('express')

class AppController {
    constructor () {
        // Definindo o app
        this.express = express()

        // Invocando métodos da minha classe
        this.middlewares()
        this.routes()
    }

    middlewares () {
        // Permitindo que a aplicação compreenda corpos de requisição no formato json
        this.express.use(express.json())
    }

    routes () {
        // Importando todas as rotas
        this.express.use(require('./routes'))
    }
}

// Exportando apenas a propriedade 'express', ou seja, o app
module.exports = new AppController().express