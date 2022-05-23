const Router = require('express');
const router = new Router();
const BasketController = require('./../controllers/basketController');
const authMiddleware = require('./../middleware/authMiddleware');
const checkDeleteArtworkFromBasket = require('./../middleware/checkDeleteArtworkFromBasket');

router
    .post('/', authMiddleware, BasketController.addArtwork)
    .get('/', authMiddleware, BasketController.getArtworks)
    .delete('/:id', authMiddleware, checkDeleteArtworkFromBasket, BasketController.deleteArtwork);

module.exports = router;
