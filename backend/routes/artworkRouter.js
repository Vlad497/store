const Router = require('express');
const router = new Router();
const artworkController = require('../controllers/artworkController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/', artworkController.create)
    .get('/', artworkController.getAll)
    .get('/search', artworkController.getSearchAllArtworkByName)
    .get('/:id', artworkController.getOne)
    .delete('/:id', checkRole("ADMIN"), artworkController.delete)
    .put('/:id', checkRole("ADMIN"), artworkController.update)

module.exports = router;
