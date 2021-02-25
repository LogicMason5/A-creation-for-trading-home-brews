"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const userModel_1 = require("../models/userModel");
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    userModel_1.User
        .findOne({ email })
        .then((user) => {
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    })
        .catch(done);
}));
//# sourceMappingURL=passport.js.map