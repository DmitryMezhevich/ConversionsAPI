const dbRequest = require('./index');

class RequestSQLHelper {
    async getAccessToken(pixelID) {
        try {
            const { rows } = await dbRequest(
                'SELECT COALESCE(access_token, NULL) FROM access_token WHERE pixel_id = $1 LIMIT 1;',
                [pixelID]
            );

            return rows[0].coalesce;
        } catch {
            return null;
        }
    }

    async addPixel(pixelID, accessToken) {
        const { rows } = await dbRequest(
            'INSERT INTO users (pixel_id, access_token) VALUES ($1, $2) RETURNING access_token;',
            [pixelID, accessToken]
        );

        return rows[0].access_token;
    }
}

module.exports = new RequestSQLHelper();
