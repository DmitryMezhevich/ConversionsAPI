const axios = require('axios');
const fs = require('fs').promises;
const logger = require('../logger');

const sqlRequest = require('../db/requestSQL-helper');
const trackHelper = require('../helpers/track-helper');
const TTModel = require('../models/ttModel');
const PageViewModel = require('../models/pageViewModel');


const TOKEN = '7103187943:AAHnjOz6PXNLDTVXZhmwcoTS-hWdaSLvUK8';
const CHAT_ID = '-1002076177922';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

class TarckController {

    // Отправляем события просмотра в телеграм
    async event(req, res, next) {
        try {
            const body = req.body;
            body.req = req;
            const pageViewModel = new PageViewModel(body);
            await pageViewModel.sendPageViewEvent(URI_API, CHAT_ID);

            logger.info(`OK: event(). Send to telegram PageView. ID: ${req.body.eventID.slice(-7)}`);
            res.status(200).json({ status: 'Ok' });
        } catch (err) {
            logger.error(`Error: event(). Send to telegram PageView. ID: ${req.body.eventID.slice(-7)} Message: ${err.message}`);
            res.status(500).json({ err: err.message });
        }
    }

    // Отправляем события в CAPI Facebook и в телеграм(событие просмотра)
    async eventFB(req, res, next) {
        try {
            const accessToken = await sqlRequest.getAccessTokenFB(
                req.body.pixelID
            );

            const eventRequest = trackHelper.createFBEvent(
                req.headers,
                req.body,
                accessToken
            );

            await eventRequest.execute();

            logger.info(`OK: eventFB(). Event: ${req.body.eventName}. ID: ${req.body.eventID.slice(-7)}`);
            res.status(200).json({ status: "ok"});
        } catch (err) {
            logger.error(`Error: eventFB(). Event: ${req.body.eventName}. ID: ${req.body.eventID.slice(-7)}. Message: ${err.message}`);
            res.status(500).json({ err: err.message });
        } finally {
            try {
                if (req.body.eventName === 'PageView') {
                    const body = req.body;
                    body.req = req;
                    const pageViewModel = new PageViewModel(body);
                    await pageViewModel.sendPageViewEvent(URI_API, CHAT_ID);
                    logger.info(`OK: eventFB(). Send to telegram PageView. ID: ${req.body.eventID.slice(-7)}`);
                }

                next();
            } catch (err) {
                logger.error(`Error: eventFB(). Send to telegram PageView. ID: ${req.body.eventID.slice(-7)}. Message: ${err.message}`);
            }
        }
    }

    // Отправляем события в CAPI TikTok и в телеграм(событие просмотра)
    async eventTT(req, res, next) {
        try {
            const accessToken = await sqlRequest.getAccessTokenTT(
                req.body.pixelID
            );

            const model = req.body;
            model.headers = req.headers;

            const ttModel = new TTModel(model);


            await axios.post(
                'https://business-api.tiktok.com/open_api/v1.3/event/track/',
                ttModel,
                {
                    headers: {
                        'Access-Token': accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            );

            logger.info(`OK: eventTT(). Event: ${req.body.eventName}. ID: ${req.body.eventID.slice(-7)}`);
            res.status(200).json({ status: "ok"});
        } catch (err) {
            logger.error(`Error: eventTT(). Event: ${req.body.eventName}. ID: ${req.body.eventID.slice(-7)}. Message: ${err.message}`);
            res.status(500).json({ err: err.message });
        } finally {
            try {
                if (req.body.eventName === 'Pageview') {
                    const body = req.body;
                    body.req = req;
                    const pageViewModel = new PageViewModel(body);
                    await pageViewModel.sendPageViewEvent(URI_API, CHAT_ID);
                    logger.info(`OK: eventTT(). Send to telegram PageView. ID: ${req.body.eventID.slice(-7)}`);
                }

                next();
            } catch (err) {
                logger.error(`Error: eventTT(). Send to telegram PageView. ID: ${req.body.eventID.slice(-7)}. Message: ${err.message}`);
            }
        }
    }

    // Записываем в SQL данные о Pixel
    async addDataPixel(req, res, next) {
        try {
            if (req.body.typePixel === 'Facebook') {
                await sqlRequest.addAccessTokenFB(
                    req.body.pixelID,
                    req.body.accessToken
                );
            } else if (req.body.typePixel === 'TikTok') {
                await sqlRequest.addAccessTokenTT(
                    req.body.pixelID,
                    req.body.accessToken
                );
            }

            res.status(200).json({ status: 'Ok' });
        } catch (err) {
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
            const content = await fs.readFile(
                `${__dirname}/../resource/eventJS.js`,
                'utf-8'
            );
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(content, 'utf-8');
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    }

    async myTestGood(req, res, next) {
        try {
            setTimeout(() => {
                res.status(200).json({ status: "ok" });
            }, 1000);
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    }

    async myTestErr(req, res, next) {
        try {
            setTimeout(() => {
                res.status(500).json({ status: "err" });
            }, 1000);
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    }
}

module.exports = new TarckController();
