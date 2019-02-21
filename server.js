const express = require('express');

const registerRoutes = require('./routes/');

const app = express();
const port = process.env.PORT; // eslint-disable-line no-undef

const router = express.Router();
registerRoutes(router);

app.use(router);

app.listen(port, () => {
    console.log(`App running on port ${port}`); // eslint-disable-line no-console
});
