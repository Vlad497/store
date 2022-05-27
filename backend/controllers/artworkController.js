const { Op } = require("sequelize");
const uuid = require('uuid');
const path = require('path');
const { Artwork, ArtworkInfo, Type, Author, OrderArtwork, BasketArtwork } = require('../models/models');
const apiError = require('../error/apiError');

class ArtworkController {
    async create(req, res, next) {
        try {
            let { name, price, authorId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const artwork = await Artwork.create({
                name,
                price,
                authorId,
                typeId,
                img: fileName
            });

            if (info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    ArtworkInfo.create({
                        title: i.title,
                        description: i.description,
                        artworkId: artwork.id
                    })
                })
            }

            return res.json(artwork);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) {
        try {
            let { authorId, typeId, limit, page } = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let artworks;
            if (!authorId && !typeId) {
                artworks = await Artwork.findAndCountAll({
                    include: [
                        { model: Author },
                        { model: Type },
                    ],
                    limit,
                    offset
                })
            }
            if (authorId && !typeId) {
                artworks = await Artwork.findAndCountAll({
                    where: { authorId },
                    include: [
                        { model: Author },
                        { model: Type },
                    ],
                    limit,
                    offset
                })
            }
            if (!authorId && typeId) {
                artworks = await Artwork.findAndCountAll({
                    where: { typeId },
                    include: [
                        { model: Author },
                        { model: Type },
                    ],
                    limit,
                    offset
                })
            }
            if (authorId && typeId) {
                artworks = await Artwork.findAndCountAll({
                    where: { typeId, authorId },
                    include: [
                        { model: Author },
                        { model: Type },
                    ],
                    limit,
                    offset
                })
            }
            return res.json(artworks)
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getSearchAllArtworkByName(req, res, next) {
        try {
            let { limit, page, name, filter } = req.query;

            page = page || 1;
            limit = limit || 7;
            let offset = page * limit - limit
            if (filter === "All") {
                const artworks = await Artwork.findAndCountAll({
                    attributes: ["name", "price", "img", "id"],
                    where:
                    {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    include: [
                        {
                            attributes: ["name"],
                            model: Author
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })

                return res.json(artworks);
            } else {
                const artworks = await Artwork.findAndCountAll({
                    attributes: ["name", "price", "img", "id", "authorId", "typeId"],
                    where:
                    {
                        name: {
                            [Op.like]: `%${name}%`
                        },
                        [Op.or]: [
                            {
                                authorId: null,
                            },
                            {
                                typeId: null,
                            },
                        ],
                    },
                    include: [
                        {
                            attributes: ["name"],
                            model: Author
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })


                return res.json(artworks);
            }
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            let artworks = await Artwork.findOne({
                where: { id },
                include: [
                    { model: ArtworkInfo, as: 'info' },
                    { model: Type },
                    { model: Author },
                ]
            });
            return res.json(artworks);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await Artwork.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        await Artwork.destroy({ where: { id } }).then(() => {
                            return res.json("Произведение искусства удалено");
                        })
                    } else {
                        return res.json("Это произведение искусства не существует в базе данных");
                    }

                    await OrderArtwork.destroy({ where: { artworkId: id } })
                    await BasketArtwork.destroy({ where: { artworkId: id } })
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { authorId, typeId, name, price, info } = req.body;

            await Artwork.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        let newVal = {};
                        authorId ? newVal.authorId = authorId : false;
                        typeId ? newVal.typeId = typeId : false;
                        name ? newVal.name = name : false;
                        price ? newVal.price = price : false;

                        if (req.files) {
                            const { img } = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        if (info) {
                            const parseInfo = JSON.parse(info);
                            for (const item of parseInfo) {
                                await ArtworkInfo.findOne({ where: { id: item.id } }).then(async data => {
                                    if (data) {
                                        await ArtworkInfo.update({
                                            title: item.title,
                                            description: item.description
                                        }, { where: { id: item.id } })
                                    } else {
                                        await ArtworkInfo.create({
                                            title: item.title,
                                            description: item.description,
                                            artworkId: id
                                        })
                                    }
                                })

                            }
                        }

                        await Artwork.update({
                            ...newVal
                        }, { where: { id } }).then(() => {
                            return res.json("Произведение искусства обновлено");
                        })
                    } else {
                        return res.json("Это произведение искусства не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new ArtworkController();
