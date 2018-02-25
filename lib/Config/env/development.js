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
    apikey: 'key-PLEASE-PUT-YOUR-OWN-KEY-HERE',
    domain: 'sandbox-PLEASE-PUT-YOUR-OWN-KEY.mailgun.org',
  },
  sendgrid: {
    apikey: 'SG.-PLEASE-PUT-YOUR-OWN-KEY--I',
    domain: 'https://api.sendgrid.com/v3/mail/send'
  }
};
