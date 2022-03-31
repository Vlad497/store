const { Brand } = require('./../models/models');

class BranController {
    async create(req, res) {
        const { name } = req.body;

        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getAll(req, res) {
        const types = await Brand.findAll();
        return res.json(types);
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Brand.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        await Brand.destroy({ where: { id } }).then(() => {
                            return res.json("Бренд удален");
                        })
                    } else {
                        return res.json("Этот бренд не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new BranController();
