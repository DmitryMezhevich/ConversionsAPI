const moment = require('moment-timezone');
const sha256 = require('js-sha256');

module.exports = class ttModel {
    event_source = 'web';
    event_source_id;
    data;

    constructor(module) {
        this.event_source_id = module.ttPixelID;
        this.data = [
            {
                event: module.eventName,
                event_time: moment().tz('Etc/GMT+3').unix(),
                event_id: module.eventID,
                user: {
                    ttclid: module.ttclid,
                    external_id: module.eventID,
                    ttp: module.ttp,
                    ip: module.headers['x-forwarded-for']?.split(',')[0].trim(),
                    user_agent: module.headers['user-agent'],
                },
                page: {
                    url: module.eventSourceUrl,
                    referrer: module.eventSourceUrl,
                },
            },
        ];

        if (module.phone) {
            this.data[0].user.phone = sha256(module.phone);
        }
        if (module.testEventCode) {
            this.test_event_code = module.testEventCode;
        }
    }
};
