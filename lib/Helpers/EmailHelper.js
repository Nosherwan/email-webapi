/* global module, exports:true */

'use strict';
const _ = require('lodash');

class EmailHelper {

  constructor() {
  }

  validateTask(emails, message) {
    
    let mainRecepientExists = false;
    let allEmailsValid = true;
    if (emails && Array.isArray(emails) && emails.length > 0) {
      emails.forEach(email => {
        if (email.type.toLowerCase() === 'to') {
          mainRecepientExists = true;
        }
        if (!EmailHelper.validateEmail(email.email)) {
          allEmailsValid = false;
        }
      })
    } else {
      return false;
    }
    return (mainRecepientExists && allEmailsValid && message);
  }

  static validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

exports = module.exports = EmailHelper;
