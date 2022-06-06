const Router = require('express');
const router = new Router();
const galleryController = require('../controllers/galleryController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/galleryOne', galleryController.create)
    .get('/galleryOne', galleryController.getAll)
    .get('/galleryOne/search', galleryController.getSearchAllGalleryByName)
    .get('/galleryOne/:id', galleryController.getOne)
    .delete('/galleryOne/:id', checkRole("ADMIN"), galleryController.delete)
    .put('/galleryOne/:id', checkRole("ADMIN"), galleryController.update)

module.exports = router;
