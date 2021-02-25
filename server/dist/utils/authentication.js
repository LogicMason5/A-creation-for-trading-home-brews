"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jwt = require('express-jwt');
const secrets_1 = require("./secrets");
function getTokenFromHeader(req) {
    const headerAuth = req.headers.authorization;
    if (headerAuth !== undefined && headerAuth !== null) {
        if (Array.isArray(headerAuth)) {
            return splitToken(headerAuth[0]);
        }
        else {
            return splitToken(headerAuth);
        }
    }
    else {
        return null;
    }
}
function splitToken(authString) {
    if (authString.split(' ')[0] === 'Token') {
        return authString.split(' ')[1];
    }
    else {
        return null;
    }
}
const auth = {
    required: jwt({
        credentialsRequired: true,
        secret: secrets_1.JWT_SECRET,
        getToken: getTokenFromHeader,
        userProperty: 'body.authUser',
        algorithms: ['HS256']
    }),
    optional: jwt({
        credentialsRequired: false,
        secret: secrets_1.JWT_SECRET,
        getToken: getTokenFromHeader,
        userProperty: 'body.authUser',
        algorithms: ['HS256']
    }),
};
exports.authentication = auth;
//# sourceMappingURL=authentication.js.map