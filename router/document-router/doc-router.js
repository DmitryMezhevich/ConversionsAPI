const Router = require('express').Router;

const documentController = require('../../controllers/document-controller');

const router = new Router();

router.post(
    '/start',
    documentController.downloadFile
);

module.exports = router;
