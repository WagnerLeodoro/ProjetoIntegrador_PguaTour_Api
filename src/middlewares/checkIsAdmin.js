const knex = require('../database/knex');
const AppError = require('../utils/AppError');

async function checkIsAdmin(req, res, next) {
    const { id } = req.user;
    
    const user = await knex('users').where({id}).first()

    if(!user){
        throw new AppError('Usuário não encontrado')
    }
    if(user.isAdmin === 0){
       throw new AppError('Você não tem acesso a esse recurso')
    }

    next()
}

module.exports = checkIsAdmin;