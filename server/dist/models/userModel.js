"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const jwt = __importStar(require("jsonwebtoken"));
const crypto = __importStar(require("crypto"));
const secrets_1 = require("../utils/secrets");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        required: [true, "can't be blank"],
        match: /^[a-zA-Z0-9]+$/,
        index: true
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: /\S+@\S+\.\S+/,
        index: true
    },
    offers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Offer'
        }
    ],
    hash: {
        type: mongoose_1.Schema.Types.String
    },
    salt: {
        type: mongoose_1.Schema.Types.String
    },
}, { timestamps: true });
UserSchema.plugin(mongooseUniqueValidator, { message: 'is already taken.' });
UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: exp.getTime() / 1000,
    }, secrets_1.JWT_SECRET);
};
UserSchema.methods.generateResetJWT = function () {
    return jwt.sign({
        id: this._id,
        hash: this.hash,
        exp: Math.floor(Date.now() / 1000) + (60 * 15),
    }, secrets_1.JWT_SECRET);
};
UserSchema.methods.toAuthJSON = function () {
    return {
        displayName: this.username,
        token: this.generateJWT(),
        id: this._id
    };
};
UserSchema.methods.getResetToken = function () {
    return {
        token: this.generateResetJWT(),
    };
};
exports.User = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=userModel.js.map