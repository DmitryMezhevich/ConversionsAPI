module.exports = class CAPIModel {
    event_name;
    event_time;
    action_source;
    event_source_url;
    event_id;
    user_data;

    constructor(module) {
        this.event_name = module.event_name
        this.event_time = new Date().getTime();
        this.action_source = module.action_source;
        this.event_source_url = module.event_source_url;
        this.event_id = module.event_id;

        const ip = module.headers['x-forwarded-for']?.split(',')[0].trim();
        const userAgent = module.headers['user-agent'];

        this.user_data = {
            client_ip_address: ip,
            client_user_agent: userAgent,
            fbc: module.fbc,
            fbp: module.fbp,
        }
        
    }
};