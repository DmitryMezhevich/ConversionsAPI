const axios = require('axios');
const fs = require('fs').promises;

const sqlRequest = require('../db/requestSQL-helper');
const trackHelper = require('../helpers/track-helper');
const TTModel = require('../models/ttModel');

class TarckController {
    async eventFB(req, res, next) {
        try {
            const accessToken = await sqlRequest.getAccessTokenFB(
                req.body.fbPixelID
            );

            const eventRequest = trackHelper.createFBEvent(
                req.headers,
                req.body,
                accessToken
            );

            await eventRequest.execute();

            res.status(200).json({ status: 'Ok' });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ err: err.message });
        }
    }

    async eventTT(req, res, next) {
        try {
            const accessToken = await sqlRequest.getAccessTokenTT(
                req.body.ttPixelID
            );

            const model = req.body;
            model.headers = req.headers;

            const ttModel = new TTModel(model);

            await axios
                .post('https://business-api.tiktok.com/open_api/v1.3/event/track/', ttModel, {
                    headers: {
                        'Access-Token': accessToken,
                        'Content-Type': 'application/json',
                    },
                })

            res.status(200).json({ status: 'Ok' });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ err: err.message });
        }
    }

    // TO-DO Может когда-нибудь доделаю загрузку скриптов с сервера на клиент
    // Идея в следующем: в папке resource разместить несколько файлов js,
    // которые надо брать из файла resource.html в этой же папке.
    // Клиент отправляет запрос, сервер собирает все файлы js в папке воедино
    // и отправляет ответ одним файлом клиенту
    async resource(req, res, next) {
        try {
            const content = await fs.readFile(`${__dirname}/../resource/eventJS.js`, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(content, 'utf-8');
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ err: err.message });
        }
    }
}

module.exports = new TarckController();
