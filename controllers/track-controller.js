const moment = require('moment-timezone');
const bizSdk = require('facebook-nodejs-business-sdk');
const cyrillicToTranslit = require('cyrillic-to-translit-js');

const EventRequest = bizSdk.EventRequest;
const CustomData = bizSdk.CustomData;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

class TarckController {
    
    async pageViewEvent(req, res, next) {
        try {

            const access_token = 'EAAb9l8mZCJDYBOZCnWv6UrNEQIAjp9GH4tAiaIrG1ZAdXD0PWe8hGP3Y9xgUfFJZC57pzZCqWjoWxmHbJZCo6L1CRfMn8bcfIsOnSTYqC3ngElKveTZAuZAhmH956VGyBdZA8DoUKskVV4okpN4B2RBPCFcYoio0B1lWyYPY7m2p6xeHPHITZClRIz1I3jyx23ITrONgZDZD';
            const pixel_id = '1096596584745009';
            bizSdk.FacebookAdsApi.init(access_token);
            
            let current_timestamp = moment().tz('Etc/GMT+3').unix();

            const userData = (new UserData())
                .setClientIpAddress(req.headers['x-forwarded-for']?.split(',')[0].trim())
                .setClientUserAgent(req.headers['user-agent'])
                .setFbp(req.body.fbp)
                .setFbc(req.body.fbc);

            const serverEvent = (new ServerEvent())
                            .setEventName('PageView')
                            .setEventId(req.body.event_id)
                            .setEventTime(current_timestamp)
                            .setUserData(userData)
                            .setEventSourceUrl(req.body.event_source_url)
                            .setActionSource('website');

            const eventsData = [serverEvent];
            const eventRequest = (new EventRequest(access_token, pixel_id))
                            .setEvents(eventsData)
                            .setTestEventCode('TEST65706');

            eventRequest.execute().then(
            response => {
                console.log(response);
                res.status(200).json({status: 'Ok'})
            },
            err => {
                console.error('Error: ', err);
                res.status(500).json({status: 'Err'})
            }
            );

        } catch (error) {
            console.log(error.message)
            res.status(500).json({status: 'Err'})
        }
    }

    async purchaseEvent(req, res, next) {
        try {

            function formatPhoneNumber(phoneNumber) {
                phoneNumber = phoneNumber.replace(/\D/g, '');
            
                if (phoneNumber.length >= 9) {
                    let firstChars = phoneNumber.slice(0, -7);
                    const lastSevnChars = phoneNumber.slice(-7);
                            
                    if (firstChars.includes('25')) {
                        firstChars = '37525';
                    }if (firstChars.includes('33')) {
                        firstChars = '37533';
                    } else if (firstChars.includes('44')) {
                        firstChars = '37544';
                    } else firstChars = '37529';
                    
                    return `${firstChars}${lastSevnChars}`;
                } else {
                    return null;
                }
            }

            const access_token = 'EAAb9l8mZCJDYBOZCnWv6UrNEQIAjp9GH4tAiaIrG1ZAdXD0PWe8hGP3Y9xgUfFJZC57pzZCqWjoWxmHbJZCo6L1CRfMn8bcfIsOnSTYqC3ngElKveTZAuZAhmH956VGyBdZA8DoUKskVV4okpN4B2RBPCFcYoio0B1lWyYPY7m2p6xeHPHITZClRIz1I3jyx23ITrONgZDZD';
            const pixel_id = '1096596584745009';
            bizSdk.FacebookAdsApi.init(access_token);
            
            let current_timestamp = moment().tz('Etc/GMT+3').unix();

            const userData = (new UserData())
                .setClientIpAddress(req.headers['x-forwarded-for']?.split(',')[0].trim())
                .setClientUserAgent(req.headers['user-agent'])
                .setFbp(req.body.fbp)
                .setFbc(req.body.fbc);

            if (formatPhoneNumber(req.body.phone) !== null) {
                userData.setPhone(formatPhoneNumber(req.body.phone));
            }

            if (req.body.name.length > 0) {
                userData.setFirstName(cyrillicToTranslit().transform(req.body.name));
            }
                
            const customData = (new CustomData())
                .setCurrency('usd')
                .setValue(0.00);

            const serverEvent = (new ServerEvent())
                            .setEventName('Purchase')
                            .setEventId(req.body.event_id)
                            .setEventTime(current_timestamp)
                            .setUserData(userData)
                            .setCustomData(customData)
                            .setEventSourceUrl(req.body.event_source_url)
                            .setActionSource('website');

            const eventsData = [serverEvent];
            const eventRequest = (new EventRequest(access_token, pixel_id))
                            .setEvents(eventsData)
                            .setTestEventCode('TEST65706');

            eventRequest.execute().then(
            response => {
                console.log(response);
                res.status(200).json({status: 'Ok'})
            },
            err => {
                console.error('Error: ', err);
                res.status(500).json({status: 'Err'})
            }
            );

        } catch (error) {
            console.log(error.message)
            res.status(500).json({status: 'Err'})
        }
    }
}

module.exports = new TarckController();
