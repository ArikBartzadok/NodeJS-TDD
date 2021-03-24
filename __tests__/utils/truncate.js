const { sequelize } = require('../../src/app/models')

module.exports = () => {
    // Encapsulando todos os retornos em uma única promise
    return Promise.all(
        Object.keys(sequelize.models).map(key => {
            // Deletando todos os dados da tabela
            return sequelize.models[key].destroy({ truncate: true, force: true })
    }))
}