const Router = require('express').Router;

const tarckController = require('../../controllers/track-controller');

const router = new Router();

router.post('/fb/event', tarckController.eventFB);
router.post('/tt/event', tarckController.eventTT);
router.get('/resource', tarckController.resource);

module.exports = router;
