const express = require('express');
const cors = require('cors');
var useragent = require('express-useragent');

const mountRouter = require('./router/mountRouter');

const PORT = 3010;
const app = express();

app.use(useragent.express());
app.use(cors());
app.use(express.json());

mountRouter(app);

app.listen(PORT, () => console.log(`Server is running on ${PORT} port!`));
