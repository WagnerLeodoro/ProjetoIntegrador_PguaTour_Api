const knex = require("../database/knex")

class PointsController {
  async createPoints(req, res) {
    const { name, description, location, category } = req.body

    await knex("points").insert({
      name,
      description,
      location,
      category,
    })

    return res.status(201).json("Ponto criado com sucesso")
  }

  async showPoints(req, res) {
    const { point_id } = req.params

    const points = await knex("points").where({ id: point_id })
    const comments = await knex("comments")
      .where({ points_id: point_id })
      .orderBy("created_at", "desc")
    const images = await knex("images").where({ points_id: point_id })

    const pointsComments = points.map((point) => {
      return {
        ...point,
        comments,
        images,
      }
    })
    return res.status(200).json(pointsComments)
  }

  async listPoints(req, res) {
    const points = await knex("points")
    return res.status(200).json(points)
  }

  async listPointsById(req, res) {
    const { id } = req.params
    const points = await knex("points").where({ id })
    return res.status(200).json(points)
  }

  async deletePoints(req, res) {
    const { id } = req.params
    await knex("points").where({ id }).delete()

    return res.status(200).json("Registro deletado com sucesso!")
  }

  async updatePoints(req, res) {
    const { id } = req.params
    const { name, description, location, category } = req.body

    const [point] = await knex("points").where({ id })

    if (!point) {
      throw new AppError("Ponto turístico não encontrado")
    }

    point.name = name ?? point.name
    point.description = description ?? point.description
    point.location = location ?? point.location
    point.category = category ?? point.category

    await knex("points").where({ id }).update({
      name,
      description,
      location,
      category,
      updated_at,
    }),
      [point.name, point.description, point.location, point.category]

    return res.status(200).json("Registro atualizado com sucesso!")
  }
}
module.exports = PointsController
