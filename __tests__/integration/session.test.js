const request = require('supertest')
const app = require('../../src/app')

const { User } = require('../../src/app/models')

const truncate = require('../utils/truncate')

describe('Authentication', () => {
    // Executando antes de cada teste
    beforeEach(async () => {
        // Esperando que todos os registros sejam eliminados antes de rodar o teste em sua vez
        await truncate()
    })

    it('should authenticate with valid credentials', async () => {
        // Criando um novo usuário
        const user = await User.create({
            name: 'Diogo',
            email: 'diogo.teste1@teste.com',
            password_hash: '123000'
        })

        // Autenticando um novo usuário
        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '11111111'
        })

        expect(response.status).toBe(200)
    })
})