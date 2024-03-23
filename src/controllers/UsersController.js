const knex = require('../database/knex');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');

class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;

        if (!name ||!email ||!password) {
            return res.status(400).json({ error: 'Preencha todos os campos' });
        }

        const userExists = await knex('users').where({email}).first();
        if (userExists) {
            throw new AppError('Usuário já cadastrado');
        }

        const isAdmin = false

        const hashedPassword = await bcrypt.hash(password, 8);

        await knex('users').insert({
            name,
            email,
            password: hashedPassword,
            isAdmin
        })
        return res.status(201).json('Usuário criado com sucesso');
    }

    async listUsers(req, res) {
        const users = await knex('users');
        return res.status(200).json(users);
    }

    async listUsersById(req, res) {
        const {id} = req.params
        const users = await knex('users').where({id})
        return res.status(200).json(users)
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        await knex('users').where({id}).delete();

        return res.status(200).json('Ususário deletado com sucesso');
    }

    async updateUser(req, res) {
        const { name, email, password } = req.body;
        const { id } = req.user;

        console.log(id);

        if (email) {
            const userExists = await knex('users').where({email}).first();
            if (userExists) {
                throw new AppError('Usuário já cadastrado');
            }
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 8);

            await knex('users').where({id}).update({
                name,
                email,
                password: hashedPassword,
            })
            return res.status(200).json('Usuário atualizado com sucesso');
        } else {
            await knex('users').where({id}).update({
                name,
                email
            })
            return res.status(200).json('Usuário atualizado com sucesso');
        }
    }
}

module.exports = UsersController;