"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
require('express-async-errors');
const userModel_1 = require("../models/userModel");
const passport_1 = __importDefault(require("passport"));
const authentication_1 = require("../utils/authentication");
const secrets_1 = require("../utils/secrets");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(secrets_1.SENDGRID_KEY);
const router = express_1.Router();
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.User();
    user.username = req.body.displayName;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    const savedUser = yield user.save();
    return res.json(savedUser.toAuthJSON());
}));
router.post('/login', (req, res, next) => {
    if (!req.body.email) {
        return res.status(422).json({ errors: { email: "Can't be blank" } });
    }
    if (!req.body.password) {
        return res.status(422).json({ errors: { password: "Can't be blank" } });
    }
    passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.json(user.toAuthJSON());
        }
        else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});
router.post('/message', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body;
    const user = yield userModel_1.User.findById(req.body.recipient);
    const msg = {
        to: user.email,
        from: 'noreply@homebrewswap.app',
        templateId: 'd-2eb440b5ecd34d3783575e69b2610256',
        dynamicTemplateData: {
            beerName: message.beerName,
            message: message.message,
            contactDetails: message.contactDetails,
            brewer: user.username
        },
    };
    const emailResponse = yield sgMail.send(msg);
    return res.json(emailResponse);
}));
router.post('/reqpwreset', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        return res.status(422).json({ errors: { email: "not found" } });
    }
    const user = yield userModel_1.User.findOne({ email: req.body.email });
    if (!user)
        return res.sendStatus(404).json({ errors: { user: "not found" } });
    const token = user.getResetToken();
    const msg = {
        to: user.email,
        from: 'noreply@homebrewswap.app',
        templateId: 'd-f181b99cf4cc48158830db768b550b15',
        dynamicTemplateData: {
            token: token.token,
            brewer: user.username
        },
    };
    const emailResponse = yield sgMail.send(msg);
    return res.json(emailResponse);
}));
router.post('/pwreset', authentication_1.authentication.required, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.authUser.id;
    const user = yield userModel_1.User.findOne({ _id: id });
    if (!user)
        return res.sendStatus(401);
    if (req.body.authUser.hash !== user.hash) {
        return res.status(401).json({ errors: { token: "invalid or expired" } });
    }
    user.setPassword(req.body.password);
    const updatedUser = yield userModel_1.User.findByIdAndUpdate(user._id, user, { new: true });
    const msg = {
        to: updatedUser.email,
        from: 'noreply@homebrewswap.app',
        templateId: 'd-11c10b8b0e3f4e5abf466ee978379d83',
        dynamicTemplateData: {
            brewer: updatedUser.username
        },
    };
    yield sgMail.send(msg);
    return res.json(user.toAuthJSON());
}));
exports.UserRoutes = router;
//# sourceMappingURL=userRoutes.js.map