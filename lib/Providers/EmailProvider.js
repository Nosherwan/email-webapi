/* global module, exports:true */
const config = require('../Config/config');
const _ = require('lodash');
const axios = require('axios');

'use strict';

class EmailProvider {

	constructor() {
	}

	prepareMailgunMessage(emails, message) {
		const mgMessage = {
			from: 'admin@example.com',
			text: message,
			subject: 'Test Mailgun message'
		};
		emails.forEach(email => {
			switch (email.type.toLowerCase()) {
				case 'to':
					mgMessage.to = email.email;
					break;
				case 'cc':
					mgMessage.cc = email.email;
					break;
				case 'bcc':
					mgMessage.bcc = email.email;
					break;
			}
		});

		return mgMessage;
	}

	async sendMailgunEmail(emails, message, count) {
		const totalCount = 3;
		const currentCount = count;
		try {
			const mgMessage = this.prepareMailgunMessage(emails, message);
			const response = await axios({
				method: 'post',
				url: `https://api:${config.mailgun.apikey}@api.mailgun.net/v3/${config.mailgun.domain}/messages`,
				params: mgMessage
			});
			if ((response.status !== 200 && response.status !== 202) && currentCount < totalCount) {
				return this.sendMailgunEmail(emails, message, currentCount + 1)
			} else {
				return response;
			}
		} catch (error) {
			if (currentCount < totalCount) {
				return this.sendMailgunEmail(emails, message, currentCount + 1)
			} else {
				if (error && error.response) {
					return error.response;
				} else {
					return error;
				}
			}
		}
	}

	prepareSendGridMessage(emails, message) {
		const to = [];
		const cc = [];
		const bcc = [];
		const sgMessage = {
			"personalizations":
				[{
					// "to":
					// 	[{ "email": "nosherwan@gmail.com" }],
					// "cc": [{
					// 	"email": "nosherwan@gmail.com"
					// }],
					// "bcc": [{
					// 	"email": "nosherwan@gmail.com"
					// }],
				}],
			"from": { "email": "admin@example.com" },
			"subject": "Testing Sendgrid message",
			"content": [{ "type": "text/plain", "value": message }]
		}

		emails.forEach(email => {
			switch (email.type.toLowerCase()) {
				case 'to':
					to.push({ "email": email.email })
					break;
				case 'cc':
					cc.push({ "email": email.email })
					break;
				case 'bcc':
					bcc.push({ "email": email.email })
					break;
			}
		});

		if (to.length > 0) {
			sgMessage.personalizations[0]['to'] = to;
		}

		if (cc.length > 0) {
			sgMessage.personalizations[0]['cc'] = cc;
		}
		if (bcc.length > 0) {
			sgMessage.personalizations[0]['bcc'] = bcc;
		}
		return sgMessage;
	}

	async sendSendGridEmail(emails, message, count) {
		const totalCount = 3;
		const currentCount = count;
		try {
			const sgMessage = this.prepareSendGridMessage(emails, message);
			const response = await axios.post(`${config.sendgrid.domain}`,
				sgMessage
				, {
					headers: { 'Authorization': 'bearer ' + config.sendgrid.apikey }
				});
			if (((response.status !== 200) && (response.status !== 202)) && currentCount < totalCount) {
				return this.sendSendGridEmail(emails, message, currentCount + 1)
			} else {
				return response;
			}
		} catch (error) {
			if (currentCount < totalCount) {
				return this.sendSendGridEmail(emails, message, currentCount + 1)
			} else {
				if (error && error.response) {
					return error.response;
				} else {
					return error;
				}
			}
		}
	}

	async sendEmails(emails, message) {
		const mailgunResponse = await this.sendMailgunEmail(emails, message, 0);
		if (mailgunResponse && mailgunResponse.status && mailgunResponse.status === 200) {
			return mailgunResponse;
		} else {
			const sendGridResult = await this.sendSendGridEmail(emails, message, 0);
			return sendGridResult;
		}
	}

}

exports = module.exports = EmailProvider;
