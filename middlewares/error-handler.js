const { boomify } = require('boom');
const log = require('../utils/log-factory')('error-handler');

const STATUSSES_WITH_DATA = [400];

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next();
    }

    // Boom cannot handle non error errors
    const error = err instanceof Error ? err : new Error(err);

    const boomifiedError = boomify(error);

    // every error that has no statuscode set will be seen as a 500 error so log these
    if (boomifiedError.output.statusCode >= 500) {
        log.error({ err, req, req_id: req.id });
    }

    const payload = { ...boomifiedError.output.payload };

    // @ts-ignore
    if (STATUSSES_WITH_DATA.indexOf(boomifiedError.output.statusCode) > -1 && error.data) {
        // @ts-ignore
        payload.data = error.data;
    }

    return res
        .set(boomifiedError.output.headers)
        .status(boomifiedError.output.statusCode)
        .json(payload);
};