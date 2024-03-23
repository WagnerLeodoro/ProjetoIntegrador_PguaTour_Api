const knex = require('../database/knex')
const updateRating = require('../utils/updateRating')

class CommentsControllers {
    async create(req, res) {
    const {title, comment, rating} = req.body
    const {points_id} = req.params
    const {id} = req.user
    
    await knex('comments').insert({
        title,
        comment,
        user_id: id,
        points_id,
        rating   
    })

    const averageRating = await updateRating(points_id)

    await knex("points").where({id: points_id}).update({
        mediaRating: averageRating
    });
    
    return res.status(201).json('comentario criado com sucesso')
    }
    async listComments(req, res) {
        const comments = await knex('comments');
        return res.status(200).json(comments);
    }
    async listCommentsById(req, res) {
        const {id} = req.params
        const comments = await knex('comments').where({points_id: id})
        return res.status(200).json(comments)
    }
    async deleteComment(req, res) {
        const {id} = req.params;

        await knex('comments').where({id}).delete()

        return res.status(200).json('success')
    }
    async updateComment(req, res) {
        const {id} = req.params;
        const {title, comment} = req.body;

        await knex('comments').where({id}).update({
            title,
            comment,
        })
        return res.status(200).json('sucess')
    }
}

module.exports = CommentsControllers