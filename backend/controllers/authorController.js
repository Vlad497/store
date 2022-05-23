const { Author } = require('../models/models');

class BranController {
    async create(req, res) {
        const { name } = req.body;

        const author = await Author.create({ name });
        return res.json(author);
    }

    async getAll(req, res) {
        const types = await Author.findAll();
        return res.json(types);
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Author.findOne({ where: { id } })
                .then(async data => {
                    if (data) {
                        await Author.destroy({ where: { id } }).then(() => {
                            return res.json("Автор удален");
                        })
                    } else {
                        return res.json("Этот автор не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new BranController();
