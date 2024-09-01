const { subscribeController, getSubscribersController, unSubscribersController, deleteController, blockController, statusController } = require('../Controllers/subscribe.controller');
const { unSubscribeService, blockService } = require('../Services/subscribe.service');
const router = require('express').Router();

router.post('/subscribe', subscribeController);
router.get('/get-subscribers', getSubscribersController)
router.post('/unsubscribe',unSubscribersController)
router.post('/delete',deleteController)
router.post('/block-unblock',blockController)
router.post('/status',statusController)




module.exports = router;
