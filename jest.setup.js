const dotenv = require('dotenv'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

dotenv.config({
    path: path.resolve(process.cwd(), '.env.dist'),
});
