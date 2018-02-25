/* global module, exports:true */

'use strict';

const util = require('util');
const Helper = require('../Helpers/EmailHelper');
const Provider = require('../Providers/EmailProvider');
const _ = require('lodash');

exports.index = async function (req, res) {
  res.status(500).send({ message: 'endpoint not implemented' });
}

exports.get = async function (req, res) {
  res.status(500).send({ message: 'endpoint not implmented' });
};

exports.create = async function (req, res, next) {
  try {
    const { validateTask } = new Helper();
    const provider = new Provider();
    const {
      emails,
      message,
    } = req.body;

    if (validateTask(emails, message)
    ) {
      const result = await provider.sendEmails(emails, message);
      if (result && result.status && (result.status === 200 || result.status === 202)) {
        res.status(200).send({ message: 'successfully created.' });
      } else {
        res.status(500).send({ message: 'We were unable to deliver the emails' });
      }
    } else {
      res.status(422).send({ message: 'Please provide all mandatory fields' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

exports.update = function (req, res, next) {
  res.status(500).end();
};

exports.destroy = function (req, res, next) {
  res.status(500).end();
};
