import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

window.getUUIDv4 = function () {
    return uuidv4();
};