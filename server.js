const express = require('express');

const configureApp = require('./config/express');
const port = process.env.PORT; // eslint-disable-line no-undef

const app = express();

configureApp(app);

app.listen(port, () => {
    console.log(`App running on port ${port}`); // eslint-disable-line no-console
});
