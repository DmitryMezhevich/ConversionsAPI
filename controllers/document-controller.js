const axios = require('axios')

const CAPIModel = require('../models/capiModel')

class DocumentController {
    // Загрузка исходной таблицы
    async downloadFile(req, res, next) {
        try {
            req.body.headers = req.headers;

            const info = new CAPIModel(req.body);

            const sendForCAPI = {
                data: [],
                test_event_code: 'TEST92150',
            };

            sendForCAPI.data.push(info);

            const PIXEL_TOKEN = 'EAAb9l8mZCJDYBOZCnWv6UrNEQIAjp9GH4tAiaIrG1ZAdXD0PWe8hGP3Y9xgUfFJZC57pzZCqWjoWxmHbJZCo6L1CRfMn8bcfIsOnSTYqC3ngElKveTZAuZAhmH956VGyBdZA8DoUKskVV4okpN4B2RBPCFcYoio0B1lWyYPY7m2p6xeHPHITZClRIz1I3jyx23ITrONgZDZD';
            const ID_PIXEL = '1096596584745009';
            const URL = `https://graph.facebook.com/v19.0/${ID_PIXEL}/events`;

            axios.post(URL, sendForCAPI, {
                params: {access_token: PIXEL_TOKEN},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                console.log('Успешный ответ от сервера');
                res.status(200).json({status: 'Ok'})
            })
            .catch((err) => {
                console.log('Ошибка запроса:', err.message);
                res.status(500).json({status: 'Err'})
            });

        } catch (error) {
            console.log(error.message)
            res.status(500).json({status: 'Err'})
        }
    }
}

module.exports = new DocumentController();
