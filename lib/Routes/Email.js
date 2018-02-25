const express = require('express');
const EmailCtrl = require('../Controllers/EmailController');
const authenticate = require('../Auth').validateJWT;

exports = module.exports = function () {
  "use strict";
  const EmailRouter = express.Router();

  EmailRouter.route('/email')
    .all(authenticate)
    .get(EmailCtrl.index)
    .put(EmailCtrl.update)
    .post(EmailCtrl.create);

  return EmailRouter;
};
