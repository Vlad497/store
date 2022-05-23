const { Basket, BasketArtwork, Artwork, ArtworkInfo } = require('./../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

class BasketController {
    async addArtwork(req, res) {
        try {
            const { id } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, "sdsgdsgdsfgdf");
            const basket = await Basket.findOne({ where: { userId: user.id } });
            await BasketArtwork.create({ basketId: basket.id, artworkId: id });
            return res.json("Произведение искусства добавлено в корзину");
        } catch (e) {
            console.error(e);
        }
    }

    async getArtworks(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, "sdsgdsgdsfgdf");
            const { id } = await Basket.findOne({ where: { userId: user.id } });
            const basket = await BasketArtwork.findAll({ where: { basketId: id } });

            const basketArr = [];
            for (let i = 0; i < basket.length; i++) {
                const basketArtwork = await Artwork.findOne({
                    where: {
                        id: basket[i].artworkId,

                    },
                    include: {
                        model: ArtworkInfo, as: "info",
                        where: {
                            artworkId: basket[i].artworkId,
                            [Op.or]: [
                                {
                                    artworkId: {
                                        [Op.not]: null
                                    }
                                }
                            ],
                        },
                        required: false
                    }
                });
                basketArr.push(basketArtwork);
            }

            return res.json(basketArr);
        } catch (e) {
            console.error(e);
        }
    }

    async deleteArtwork(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;

            await Basket.findOne({ where: { userId: user.id } }).then(async userBasket => {
                if (userBasket.userId === user.id) {
                    await BasketArtwork.destroy({ where: { basketId: userBasket.id, artworkId: id } })
                }
                return res.json(`У вас нет доступа для удаления произведения искусства (${id}) из корзины`);
            });
            return res.json("Произведение искусства удалено из корзины");
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new BasketController();
