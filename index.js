const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mountRouter = require('./router/mountRouter');

const PORT = 3010;
const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mountRouter(app);

app.listen(PORT, () => console.log(`Server is running on ${PORT} port!`));
