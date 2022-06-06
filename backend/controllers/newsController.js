const { Op } = require("sequelize");
const uuid = require('uuid');
const path = require('path');
const { News } = require('../models/models');
const apiError = require('../error/apiError');

class NewsController {
    async create(req, res, next) {
        try {
            let { name, description } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const news = await News.create({
                name,
                description,
                img: fileName
            });

            return res.json(news);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) {
        try {
            let { limit, page } = req.query;
            page = page || 1
            limit = limit || 4
            let offset = page * limit - limit
            let news;

            news = await News.findAndCountAll({
                limit,
                offset
            })

            return res.json(news)
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getSearchAllNewsByName(req, res, next) {
        try {
            let { limit, page, name, filter } = req.query;

            page = page || 1;
            limit = limit || 3;
            let offset = page * limit - limit
            if (filter === "All") {
                const news = await News.findAndCountAll({
                    attributes: ["name", "description", "img", "id"],
                    where:
                    {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    limit,
                    offset,
                })

                return res.json(news);
            }
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            let news = await News.findOne({ where: { id } });
            return res.json(news);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await News.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        await News.destroy({ where: { id } }).then(() => {
                            return res.json("Новость удалена");
                        })
                    } else {
                        return res.json("Эта новость не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            await News.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        let newVal = {};
                        name ? newVal.name = name : false;
                        description ? newVal.description = description : false;

                        if (req.files) {
                            const { img } = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }
                        await News.update({
                            ...newVal
                        }, { where: { id } }).then(() => {
                            return res.json("Новость обновлена");
                        })
                    } else {
                        return res.json("Эта новость не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new NewsController();
