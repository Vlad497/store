const { Basket, BasketArtwork } = require('../models/models');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = req.user;
        const userBasket = await Basket.findOne({ where: { userId: user.id } });
        const artworkItem = await BasketArtwork.findOne({ where: { basketId: userBasket.id, artworkId: id } });

        if (artworkItem) {
            return next();
        }
        return res.json("Произведение искусства не найдено в корзине пользователя");
    } catch (e) {
        res.json(e);
    }
};
