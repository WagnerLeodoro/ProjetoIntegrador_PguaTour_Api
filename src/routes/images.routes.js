const {Router} = require('express')
const ImagesControllers = require('../controllers/ImagesControllers');
const checkIsAdmin = require('../middlewares/checkIsAdmin');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const imagesRoutes = Router()

const imagesControllers = new ImagesControllers()

imagesRoutes.get('/', imagesControllers.getImages);
imagesRoutes.get('/:points_id', imagesControllers.getImagesByPointsId);

imagesRoutes.use(ensureAuthenticated)
imagesRoutes.use(checkIsAdmin)

imagesRoutes.post('/:points_id', imagesControllers.createImages);
imagesRoutes.delete('/:id', imagesControllers.deleteImages);

module.exports = imagesRoutes;



