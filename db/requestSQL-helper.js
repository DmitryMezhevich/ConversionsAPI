const dbRequest = require('./index');

class RequestSQLHelper {
    async getAccessTokenFB(pixelID) {
        try {
            return await this.#getData('access_token_fb', pixelID);
        } catch {
            return null;
        }
    }

    async addAccessTokenFB(pixelID, accessToken) {
        try {
            return await this.#setData('access_token_fb', pixelID, accessToken);
        } catch {
            return null;
        }
    }

    async getAccessTokenTT(pixelID) {
        try {
            return await this.#getData('access_token_tt', pixelID);
        } catch {
            return null;
        }
    }

    async addAccessTokenTT(pixelID, accessToken) {
        try {
            return await this.#setData('access_token_tt', pixelID, accessToken);
        } catch {
            return null;
        }
    }

    async #getData(nameTable, pixelID) {
        const { rows } = await dbRequest(
            `SELECT COALESCE(access_token, NULL) FROM ${nameTable} WHERE pixel_id = $1 LIMIT 1;`,
            [pixelID]
        );

        return rows[0].coalesce;
    }

    async #setData(nameTable, pixelID, accessToken) {
        const { rows } = await dbRequest(
            `INSERT INTO ${nameTable} (pixel_id, access_token) VALUES ($1, $2) RETURNING access_token;`,
            [pixelID, accessToken]
        );

        return rows[0].access_token;
    }
}

module.exports = new RequestSQLHelper();
