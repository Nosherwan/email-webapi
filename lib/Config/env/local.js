'use strict';

module.exports = {
  env: 'test',
  db: {
    name: 'test',
    user: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306
  },
  mailgun: {
    apikey: 'test',
    domain: 'test.domain'
  },
  sendgrid: {
    apikey: 'test',
    domain: 'test.domain'
  }
};
