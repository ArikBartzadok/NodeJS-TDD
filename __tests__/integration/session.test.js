const request = require('supertest')

const app = require('../../src/app')
const factory = require('../factories')
const truncate = require('../utils/truncate')

describe('Authentication', () => {
    // Executando antes de cada teste
    beforeEach(async () => {
        // Esperando que todos os registros sejam eliminados antes de rodar o teste em sua vez
        await truncate()
    })

    it('should authenticate with valid credentials', async () => {
        // Criando um novo usuário, sobrescrevendo a propriedade password do meu factory
        const user = await factory.create('User', {
            password: '123000'
        })

        console.log(user);

        // Autenticando um novo usuário
        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123000'
        })

        expect(response.status).toBe(200)
    })

    it('should not authenticate with invalid credential', async () => {
        // Criando um novo usuário, sobrescrevendo a propriedade password do meu factory
        const user = await factory.create('User', {
            password: '123000'
        })

        // Autenticando um novo usuário
        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '11111111'
        })

        expect(response.status).toBe(401)
    })

    it('should return jwt token when authenticated', async () => {
        // Criando um novo usuário, sobrescrevendo a propriedade password do meu factory
        const user = await factory.create('User', {
            password: '123000'
        })

        // Autenticando um novo usuário
        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123000'
        })

        // Espero que exista este campo no corpo de resposta da requisição
        expect(response.body).toHaveProperty("token")
    })

    it('should be able to access private routes when authenticated', async () => {
        // Criando um novo usuário, sobrescrevendo a propriedade password do meu factory
        const user = await factory.create('User', {
            password: '123000'
        })

        // Autenticando se um novo usuário pode acessar rotas que necessitem de autenticação
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`)

        // Espero que exista este campo no corpo de resposta da requisição
        expect(response.status).toBe(200)
    })

    it('should not be able to access private routes without jwt token', async () => {
        // Requisição sem token, nem autenticação
        const response = await request(app)
            .get('/dashboard')

        // Espero que exista este campo no corpo de resposta da requisição
        expect(response.status).toBe(401)
    })

    it('should not be able to access private routes with invalid jwt token', async () => {
        // Requisição sem token, nem autenticação
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer tokenDeTeste1230000`)

        // Espero que exista este campo no corpo de resposta da requisição
        expect(response.status).toBe(401)
    })
})