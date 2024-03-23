const knex = require('../database/knex');

class ImagesControllers {
    async createImages(req, res) {
        const {link_image} = req.body
        const {points_id} = req.params

        await knex('images').insert({
            link_image,
            points_id
        });
        return res.status(201).json("Imagem criada com sucesso");
    }

    async getImages(req, res) {
        const images = await knex('images');
        return res.status(200).json(images);
    }
    async getImagesByPointsId(req, res) {
        const {points_id} = req.params
        const images = await knex('images').where({points_id})
        return res.status(200).json(images)
    }

    async deleteImages(req, res) {
        const {id} = req.params;
        await knex('images').where({id}).del();
        return res.status(200).json("Imagem deletada com sucesso");
    }
}

module.exports = ImagesControllers;