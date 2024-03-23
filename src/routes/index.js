const {Router} = require('express')
const usersRouter = require('./users.routes')
const imagesRouter = require('./images.routes')
const commentsRouter = require('./comments.routes')
const pointsRouter = require('./points.routes')
const sessionRouter = require('./session.routes')

const routes = Router();

routes.use('/users', usersRouter)
routes.use('/images', imagesRouter)
routes.use('/comments', commentsRouter)
routes.use('/points', pointsRouter)
routes.use('/session', sessionRouter)

module.exports = routes;
