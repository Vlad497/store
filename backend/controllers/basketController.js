const { Basket, BasketDevice, Device, DeviceInfo } = require('./../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

class BasketController {
    async addDevice(req, res) {
        try {
            const { id } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, "sdsgdsgdsfgdf");
            const basket = await Basket.findOne({ where: { userId: user.id } });
            await BasketDevice.create({ basketId: basket.id, deviceId: id });
            return res.json("Товар добавлен в корзину");
        } catch (e) {
            console.error(e);
        }
    }

    async getDevices(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, "sdsgdsgdsfgdf");
            const { id } = await Basket.findOne({ where: { userId: user.id } });
            const basket = await BasketDevice.findAll({ where: { basketId: id } });

            const basketArr = [];
            for (let i = 0; i < basket.length; i++) {
                const basketDevice = await Device.findOne({
                    where: {
                        id: basket[i].deviceId,

                    },
                    include: {
                        model: DeviceInfo, as: "info",
                        where: {
                            deviceId: basket[i].deviceId,
                            [Op.or]: [
                                {
                                    deviceId: {
                                        [Op.not]: null
                                    }
                                }
                            ],
                        },
                        required: false
                    }
                });
                basketArr.push(basketDevice);
            }

            return res.json(basketArr);
        } catch (e) {
            console.error(e);
        }
    }

    async deleteDevice(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;

            await Basket.findOne({ where: { userId: user.id } }).then(async userBasket => {
                if (userBasket.userId === user.id) {
                    await BasketDevice.destroy({ where: { basketId: userBasket.id, deviceId: id } })
                }
                return res.json(`У вас нет доступа для удаления устройства (${id}) из корзины, которая вам не принадлежит`);
            });
            return res.json("Товар удален из вашей корзины");
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new BasketController();
