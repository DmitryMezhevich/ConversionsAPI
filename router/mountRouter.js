const docRouter = require('./document-router/doc-router')

module.exports = (app) => {
    app.use('/api', docRouter)
}
