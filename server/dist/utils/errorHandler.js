"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadErrorHandlers = void 0;
const secrets_1 = require("./secrets");
const logger_1 = __importDefault(require("./logger"));
function loadErrorHandlers(app) {
    // catch 404 errors and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use((err, req, res, next) => {
        if (err.name === 'ValidationError') {
            return res.status(422).json({
                errors: Object.keys(err.errors).reduce(function (errors, key) {
                    errors[key] = err.errors[key].message;
                    return errors;
                }, {})
            });
        }
        logger_1.default.error(err);
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: !secrets_1.IS_PRODUCTION ? err : {}
            }
        });
    });
}
exports.loadErrorHandlers = loadErrorHandlers;
//# sourceMappingURL=errorHandler.js.map