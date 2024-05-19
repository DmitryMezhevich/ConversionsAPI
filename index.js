const express = require('express');
const useragent = require('express-useragent');
const cors = require('cors');

const mountRouter = require('./router/mountRouter');

const PORT = 3010;
const app = express();

app.use(cors());
app.use(express.json());
app.use(useragent.express());
app.set('trust proxy', true);

mountRouter(app);

app.listen(PORT, () => console.log(`Server is running on ${PORT} port!`));
