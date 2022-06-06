const Router = require('express');
const router = new Router();
const newsController = require('../controllers/newsController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/newsOne', newsController.create)
    .get('/newsOne', newsController.getAll)
    .get('/newsOne/search', newsController.getSearchAllNewsByName)
    .get('/newsOne/:id', newsController.getOne)
    .delete('/newsOne/:id', checkRole("ADMIN"), newsController.delete)
    .put('/newsOne/:id', checkRole("ADMIN"), newsController.update)

module.exports = router;
