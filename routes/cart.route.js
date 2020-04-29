var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart.controller');

var sessionMiddleware = require('../middlewares/session.middleware');
var cookieMiddleware = require('../middlewares/cookies.middleware');

router.get('/', controller.index);

router.get('/add/:productId',
  cookieMiddleware.requireCookieId,
  sessionMiddleware.requireSession,
  controller.addToCart
);

module.exports = router;