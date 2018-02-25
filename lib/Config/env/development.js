'use strict';

module.exports = {
  env: 'development',
  db: {
    name: 'test',
    user: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306
  },
  mailgun: {
    apikey: 'key-981ccd5d29131f22377e40fce0f99692',
    domain: 'sandbox383ece68cd174c1ba269c07966f75b34.mailgun.org',
  },
  sendgrid: {
    apikey: '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',
    domain: 'https://api.sendgrid.com/v3/mail/send'
  }
};
