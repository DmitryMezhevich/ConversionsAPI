const Router = require('express').Router;

const tarckController = require('../../controllers/track-controller');

const router = new Router();

router.post(
    '/pageViewEvent',
    tarckController.pageViewEvent
);
router.post(
    '/purchaseEvent',
    tarckController.purchaseEvent
);

module.exports = router;
