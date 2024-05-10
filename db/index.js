const { Pool } = require('pg');

const connectionString =
    'postgres://wlybcroj:W6RI8dK-_2eBSPIf6VuWvHVNAkhGswTb@abul.db.elephantsql.com/wlybcroj';

const pool = new Pool({ connectionString });

module.exports = (text, params) => pool.query(text, params);
