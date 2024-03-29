const Router = require('express');
const router = new Router();

const ordersController = require('./../controllers/ordersController');
const checkRole = require('./../middleware/checkRoleMiddleware');

router
    .post('/', ordersController.create)
    .get('/', checkRole("ADMIN"), ordersController.getAll)
    .get('/:id', checkRole("ADMIN"), ordersController.getOne)
    .put('/', checkRole("ADMIN"), ordersController.updateOrder)
    .delete('/', checkRole("ADMIN"), ordersController.deleteOrder)
    .get('/', checkRole("MANAGER"), ordersController.getAll)
    .get('/:id', checkRole("MANAGER"), ordersController.getOne)
    .put('/', checkRole("MANAGER"), ordersController.updateOrder)
    .delete('/', checkRole("MANAGER"), ordersController.deleteOrder);


module.exports = router;
