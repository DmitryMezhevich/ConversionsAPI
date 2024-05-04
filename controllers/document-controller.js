const axios = require('axios')

const CAPIModel = require('../models/capiModel')

class DocumentController {
    // Загрузка исходной таблицы
    async downloadFile(req, res, next) {
        try {
            req.body.headers = req.headers;

            const info = new CAPIModel(req.body);

            console.log(info);

            res.status(200).json({status: 'Ok'})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new DocumentController();
