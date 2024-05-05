const axios = require('axios')
const moment = require('moment-timezone');
const bizSdk = require('facebook-nodejs-business-sdk');

const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

class DocumentController {
    
    async downloadFile(req, res, next) {
        try {

            const access_token = 'EAAb9l8mZCJDYBOZCnWv6UrNEQIAjp9GH4tAiaIrG1ZAdXD0PWe8hGP3Y9xgUfFJZC57pzZCqWjoWxmHbJZCo6L1CRfMn8bcfIsOnSTYqC3ngElKveTZAuZAhmH956VGyBdZA8DoUKskVV4okpN4B2RBPCFcYoio0B1lWyYPY7m2p6xeHPHITZClRIz1I3jyx23ITrONgZDZD';
            const pixel_id = '1096596584745009';
            const api = bizSdk.FacebookAdsApi.init(access_token);
            
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
                            .setTestEventCode('TEST65126');

            eventRequest.execute().then(
            response => {
                console.log(eventRequest);
                console.log(eventRequest._events[0]._user_data);
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

module.exports = new DocumentController();
