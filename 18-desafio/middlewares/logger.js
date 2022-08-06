import logger from '../utils/logger.js';

const loggerMiddleware = (req, res, next) => {
    logger.info(`${req.method} at ${req.path}`);
    next();
}

export default loggerMiddleware;