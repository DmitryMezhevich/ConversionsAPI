const moment = require('moment-timezone');

module.exports = class ttModel {
    event_source; // Источник: 'web' - вебсайт
    event_source_id; // ID Pixel: 'COU94SBC77U8DR5JQBHG'
    data = [
        {
            event: 'PlaceAnOrder', // Имя события string
            event_time, // Время события integer
            event_id, // ID события для дедупликации string
            user: {
                // Информация о клиенте
                ttclid, // ID клика, вытасквается из куки ttclid string
                phone, // Номер клиента string SHA256 Normalized to E.164 format: "+12133734253"
                external_id, // Внешний ID клиента string SHA256, надо почитать и понять откуда его стоит брать
                ttp, // Cookie ID, вытасквается из куки _ttp string, это куки домена сайта
                ip, // IP клиента
                user_agent, // Агент клиента
            },
            properties: {
                // Информация о товаре, заказе и дополнительная информация
                currency, // Валюта 'USD'
                value, // Стоимость заказа или проданных товаров
            },
            page: {
                // Информация о веб-странице
                url, // location.href
                referrer, // document.referrer
            },
        },
    ];

    constructor(module) {}
};
