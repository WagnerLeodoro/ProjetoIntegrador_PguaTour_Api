const knex = require("../database/knex")
const bcrypt = require("bcryptjs")
const AppError = require("../utils/AppError")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      throw new AppError("Preencha todos os campos")
    }

    const userExists = await knex("users").where({ email }).first()
    if (userExists) {
      throw new AppError("Usuário já cadastrado")
    }

    const isAdmin = false

    const hashedPassword = await bcrypt.hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    })
    return res.status(201).json("Usuário criado com sucesso")
  }

  async listUsers(req, res) {
    const users = await knex("users")
    return res.status(200).json(users)
  }

  async listUsersById(req, res) {
    const { id } = req.params
    const users = await knex("users").where({ id })
    return res.status(200).json(users)
  }

  async deleteUser(req, res) {
    const { id } = req.params
    await knex("users").where({ id }).delete()

    return res.status(200).json("Ususário deletado com sucesso")
  }

  async updateUser(req, res) {
    const { name, email, password, old_password } = req.body
    const { id } = req.user

    const [userWithUpdatedEmail] = await knex("users").where({ email })

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.password = password ?? user.password

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha",
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha informada não confere com a senha antiga")
      }
      user.password = await hash(password, 8)
    }

    await knex("users").where({ id }).update({ name, email, password }),
      [user.name, user.email, user.password]

    return res.status(200).json()
  }
}

module.exports = UsersController
