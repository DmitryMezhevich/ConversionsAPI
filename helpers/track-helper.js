const moment = require('moment-timezone');
const bizSdk = require('facebook-nodejs-business-sdk');
const cyrillicToTranslit = require('cyrillic-to-translit-js');

const EventRequest = bizSdk.EventRequest;
const CustomData = bizSdk.CustomData;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

class TrackHelper {
    createFBEvent(headers, model, accessToken, pixelID, testCode = null) {
        bizSdk.FacebookAdsApi.init(accessToken);
        let currentTimestamp = moment().tz('Etc/GMT+3').unix();

        const userData = new UserData()
            .setClientIpAddress(
                headers['x-forwarded-for']?.split(',')[0].trim()
            )
            .setClientUserAgent(headers['user-agent'])
            .setFbp(model.fbp)
            .setFbc(model.fbc);

        const serverEvent = new ServerEvent()
            .setEventName(model.eventName)
            .setEventId(model.eventID)
            .setEventTime(currentTimestamp)
            .setUserData(userData)
            .setEventSourceUrl(model.eventSourceUrl)
            .setActionSource('website');

        if (model.eventName === 'Purchase') {
            const customData = new CustomData()
                .setCurrency('usd')
                .setValue(0.0);

            serverEvent.setCustomData(customData);

            if (
                model.phone !== null &&
                this.formatPhoneNumber(model.phone) !== null
            ) {
                userData.setPhone(this.formatPhoneNumber(model.phone));
            }

            if (model.name !== null && model.name.length > 0) {
                userData.setFirstName(
                    cyrillicToTranslit().transform(model.name)
                );
            }
        }

        const eventsData = [serverEvent];
        const eventRequest = new EventRequest(accessToken, pixelID).setEvents(
            eventsData
        );

        if (testCode) {
            eventRequest.setTestEventCode(testCode);
        }

        return eventRequest;
    }

    formatPhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.replace(/\D/g, '');

        if (phoneNumber.length >= 9) {
            let firstChars = phoneNumber.slice(0, -7);
            const lastSevnChars = phoneNumber.slice(-7);

            if (firstChars.includes('25')) {
                firstChars = '37525';
            }
            if (firstChars.includes('33')) {
                firstChars = '37533';
            } else if (firstChars.includes('44')) {
                firstChars = '37544';
            } else firstChars = '37529';

            return `${firstChars}${lastSevnChars}`;
        } else {
            return null;
        }
    }
}

module.exports = new TrackHelper();
