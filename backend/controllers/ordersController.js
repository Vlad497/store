const { Orders, OrderArtwork, Artwork, Author, Type } = require('./../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');

class OrdersController {
    async create(req, res) {
        const auth = req.headers.authorization || "";
        const { mobile, name, address, basket } = req.body;

        try {
            let parseArtworks = [];
            for (let key of basket) {
                parseArtworks.push(key.id)
            }

            const isArtworkInDB = await Artwork.findAndCountAll({
                where: { id: parseArtworks },
                attributes: ["id"]
            });

            if (isArtworkInDB.count === parseArtworks.length) {
                const row = { mobile, name, address };
                if (auth) {
                    const token = auth.split(' ')[1];
                    const { id } = jwt.verify(token, "sdsgdsgdsfgdf");
                    row.userId = id;
                }

                await Orders.create(row).then(order => {
                    const { id } = order.get();
                    parseArtworks.forEach(async (artworkId, i) => {

                        await OrderArtwork.create({
                            orderId: id,
                            artworkId,
                            count: basket[i].count
                        });
                    });
                });
            } else {
                const notFoundIdArtworks = [];
                const arrArtworks = [];
                isArtworkInDB.rows.forEach(item => arrArtworks.push(item.id));
                parseArtworks.forEach(artworkId => {
                    if (!arrArtworks.includes(artworkId)) {
                        notFoundIdArtworks.push(artworkId);
                    }
                });
                return ApiError.badRequest(res.json(`Произведение искусства с id(${notFoundIdArtworks.join(', ')}) не существует в базе данных`));
            }

            return res.json("Спасибо вам за ваш заказ! Мы свяжемся с вами в ближайшее время");
        } catch (e) {
            return res.json(e);
        }
    }

    async updateOrder(req, res) {
        try {
            const { complete, id } = req.body;

            await Orders.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        await Orders.update({ complete }, { where: { id } }).then(() => {
                            return res.json("Заказ обновлен");
                        })
                    } else {
                        return res.json("Этот заказ не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json("Обновление не завершилось из-за ошибки: " + e);
        }

    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.body;

            await Orders.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        await Orders.destroy({ where: { id } }).then(() => {
                            return res.json("Заказ удален");
                        })
                    } else {
                        return res.json("Этот заказ не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json("Удаление не завершилось из-за ошибки: " + e);
        }
    }

    async getAll(req, res) {
        let { limit, page, complete } = req.query;
        page = page || 1;
        limit = limit || 7;
        let offset = page * limit - limit;
        let artworks;
        if (complete === "Не выполненные") {
            artworks = await Orders.findAndCountAll({ where: { complete: false }, limit, offset });
        } else if (complete === "Выполненные") {
            artworks = await Orders.findAndCountAll({ where: { complete: true }, limit, offset });
        } else {
            artworks = await Orders.findAndCountAll({ limit, offset });
        }

        return res.json(artworks);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const order = {};
        try {
            let artworks;
            let infoArtworks = [];
            await Orders.findOne({ where: { id } }).then(async data => {
                order.descr = data;
                artworks = await OrderArtwork.findAll({
                    attributes: ["artworkId", "count"],
                    where: { orderId: data.id },
                });

                for (let artwork of artworks) {
                    await Artwork.findOne({
                        attributes: ["name", "img", "price"],
                        where: { id: artwork.artworkId },
                        include: [
                            {
                                attributes: ["name"],
                                model: Type
                            },
                            {
                                attributes: ["name"],
                                model: Author
                            },
                        ]
                    }).then(async item => {
                        let newObj = {
                            descr: item,
                            count: artwork.count
                        }
                        infoArtworks.push(newObj);
                    });
                }
                order.artworks = infoArtworks;

                return res.json(order);
            }).catch(() => {
                return res.json("Этот заказ не существует в базе данных");
            });

        } catch (e) {
            return res.json("Удаление не завершилось из-за ошибки: " + e);
        }
    }
}

module.exports = new OrdersController();
