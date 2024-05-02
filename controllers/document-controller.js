class DocumentController {
    // Загрузка исходной таблицы
    async downloadFile(req, res, next) {
        try {
            console.log(req)

            res.status(200).json({status: 'Ok'})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new DocumentController();
