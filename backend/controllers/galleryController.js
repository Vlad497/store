const { Op } = require("sequelize");
const uuid = require('uuid');
const path = require('path');
const { Gallery, GalleryArtwork, Artwork, Author } = require('../models/models');
const apiError = require('../error/apiError');

class GalleryController {
    async create(req, res, next) {
        try {
            let { name, description, address, artworkIds } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            let pArts = [];
            let parseArtworks = artworkIds.split(" ");
            parseArtworks.forEach((artId, i) => {
                let id = Number(artId);
                pArts.push(id)
            });

            const isArtworkInDB = await Artwork.findAndCountAll({
                where: { id: pArts },
                attributes: ["id"]
            });

            if (isArtworkInDB.count === parseArtworks.length) {
                const row = { name, description, address, img: fileName };

                const gallery = await Gallery.create(row).then(gallery => {
                    const { id } = gallery.get();
                    parseArtworks.forEach(async (artworkId, i) => {

                        await GalleryArtwork.create({
                            galleryId: id,
                            artworkId,
                            count: 1,
                        });
                    });
                });

                return res.json(gallery);
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
            let gallery;

            gallery = await Gallery.findAndCountAll({
                limit,
                offset
            })

            return res.json(gallery)
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getSearchAllGalleryByName(req, res, next) {
        try {
            let { limit, page, name, filter } = req.query;

            page = page || 1;
            limit = limit || 3;
            let offset = page * limit - limit
            if (filter === "All") {
                const gallery = await Gallery.findAndCountAll({
                    attributes: ["name", "img", "id"],
                    where:
                    {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    limit,
                    offset,
                })

                return res.json(gallery);
            }
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params;
        const gallery = {};
        try {
            let artIds = "";
            let artworks;
            let infoArtworks = [];
            await Gallery.findOne({ where: { id } }).then(async data => {
                gallery.descr = data;
                artworks = await GalleryArtwork.findAll({
                    attributes: ["artworkId", "count"],
                    where: { galleryId: data.id },
                });
                for (let artwork of artworks) {
                    artIds += artwork.artworkId + " ";
                }
                gallery.artworkIds = artIds.trim();

                for (let artwork of artworks) {
                    await Artwork.findOne({
                        attributes: ["id", "name", "img", "price"],
                        where: { id: artwork.artworkId },
                        include: [
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
                gallery.arts = infoArtworks;

                return res.json(gallery);
            })
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await Gallery.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        await Gallery.destroy({ where: { id } }).then(() => {
                            return res.json("Галерея удалена");
                        })
                    } else {
                        return res.json("Эта галерея не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description, address, artworkIds } = req.body;

            let pArts = [];
            let parseArtworks = artworkIds.trim().split(" ");
            parseArtworks.forEach((artId, i) => {
                let id = Number(artId);
                pArts.push(id)
            });

            const isArtworkInDB = await Artwork.findAndCountAll({
                where: { id: pArts },
                attributes: ["id"]
            });

            await Gallery.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        let newVal = {};
                        name ? newVal.name = name : false;
                        description ? newVal.description = description : false;
                        address ? newVal.address = address : false;

                        if (req.files) {
                            const { img } = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        if (isArtworkInDB.count === parseArtworks.length) {
                            await Gallery.update({
                                ...newVal
                            }, { where: { id } }).then(async () => {

                                await GalleryArtwork.destroy({ where: { galleryId: id } });

                                parseArtworks.forEach(async (artworkId, i) => {
                                    await GalleryArtwork.create({
                                        galleryId: id,
                                        artworkId,
                                        count: 1,
                                    });
                                });

                                return res.json("Галерея обновлена");
                            })
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

                    } else {
                        return res.json("Эта галерея не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new GalleryController();
