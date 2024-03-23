const knex = require("../database/knex")

async function updateRating(pointId) {
    const ratingValue = await knex('comments').where({ points_id: pointId })
    
    const totalRating = ratingValue.map(rate => rate.rating).reduce((acc, current) => acc + current)
    const totalComments = ratingValue.length
    
    const media = totalRating / totalComments
    return media.toFixed(1)
}

module.exports = updateRating

