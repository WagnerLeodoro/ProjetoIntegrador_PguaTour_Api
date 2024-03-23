const {Router} = require('express')
const PointsControllers = require('../controllers/PointsControllers')
const checkIsAdmin = require('../middlewares/checkIsAdmin')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const pointsRoutes = Router()

const pointsControllers = new PointsControllers()

pointsRoutes.get('/', pointsControllers.listPoints);
pointsRoutes.get('/:id', pointsControllers.listPointsById);

pointsRoutes.use(ensureAuthenticated)
pointsRoutes.use(checkIsAdmin)

pointsRoutes.post('/', pointsControllers.createPoints);
pointsRoutes.delete('/:id', pointsControllers.deletePoints);
pointsRoutes.put('/:id', pointsControllers.updatePoints);

module.exports = pointsRoutes

