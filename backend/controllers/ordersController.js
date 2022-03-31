const { Orders, OrderDevice, Device, Brand, Type } = require('./../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');

class OrdersController {
    async create(req, res) {
        const auth = req.headers.authorization || "";
        const { mobile, basket } = req.body;

        try {
            let parseDevices = [];
            for (let key of basket) {
                parseDevices.push(key.id)
            }

            const isDeviceInDB = await Device.findAndCountAll({
                where: { id: parseDevices },
                attributes: ["id"]
            });

            if (isDeviceInDB.count === parseDevices.length) {
                const row = { mobile };
                if (auth) {
                    const token = auth.split(' ')[1];
                    const { id } = jwt.verify(token, "sdsgdsgdsfgdf");
                    row.userId = id;
                }

                await Orders.create(row).then(order => {
                    const { id } = order.get();
                    parseDevices.forEach(async (deviceId, i) => {

                        await OrderDevice.create({
                            orderId: id,
                            deviceId,
                            count: basket[i].count
                        });
                    });
                });
            } else {
                const notFoundIdDevices = [];
                const arrDevices = [];
                isDeviceInDB.rows.forEach(item => arrDevices.push(item.id));
                parseDevices.forEach(deviceId => {
                    if (!arrDevices.includes(deviceId)) {
                        notFoundIdDevices.push(deviceId);
                    }
                });
                return ApiError.badRequest(res.json(`Устройства с id(${notFoundIdDevices.join(', ')}) не существует в базе данных`));
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
        let devices;
        if (complete === "not-completed") {
            devices = await Orders.findAndCountAll({ where: { complete: false }, limit, offset });
        } else if (complete === "completed") {
            devices = await Orders.findAndCountAll({ where: { complete: true }, limit, offset });
        } else {
            devices = await Orders.findAndCountAll({ limit, offset });
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const order = {};
        try {
            let devices;
            let infoDevices = [];
            await Orders.findOne({ where: { id } }).then(async data => {
                order.descr = data;
                devices = await OrderDevice.findAll({
                    attributes: ["deviceId", "count"],
                    where: { orderId: data.id },
                });

                for (let device of devices) {
                    await Device.findOne({
                        attributes: ["name", "img", "price"],
                        where: { id: device.deviceId },
                        include: [
                            {
                                attributes: ["name"],
                                model: Type
                            },
                            {
                                attributes: ["name"],
                                model: Brand
                            },
                        ]
                    }).then(async item => {
                        let newObj = {
                            descr: item,
                            count: device.count
                        }
                        infoDevices.push(newObj);
                    });
                }
                order.devices = infoDevices;

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
