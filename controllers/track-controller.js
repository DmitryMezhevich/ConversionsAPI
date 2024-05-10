const sqlRequest = require('../db/requestSQL-helper');
const trackHelper = require('../helpers/track-helper');

class TarckController {
    async pageViewEvent(req, res, next) {
        try {
            const accessToken = await sqlRequest.getAccessToken(
                req.body.fbPixelID
            );

            const eventRequest = trackHelper.createFBEvent(
                req.headers,
                req.body,
                accessToken,
                req.body.fbPixelID,
                'TEST88530'
            );

            await eventRequest.execute();

            res.status(200).json({ status: 'Ok' });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ err: err.message });
        }
    }

    async purchaseEvent(req, res, next) {
        try {
            const accessToken = await sqlRequest.getAccessToken(
                req.body.fbPixelID
            );

            const eventRequest = trackHelper.createFBEvent(
                req.headers,
                req.body,
                accessToken,
                req.body.fbPixelID,
                'TEST88530'
            );

            await eventRequest.execute();

            res.status(200).json({ status: 'Ok' });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ err: err.message });
        }
    }
}

module.exports = new TarckController();
