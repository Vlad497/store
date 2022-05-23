const Router = require('express');
const router = new Router();
const artworkRouter = require('./artworkRouter');
const authorRouter = require('./authorRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const ordersRouter = require('./ordersRouter');

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/author', authorRouter)
router.use('/artwork', artworkRouter)
router.use('/basket', basketRouter)
router.use('/orders', ordersRouter)

module.exports = router;
