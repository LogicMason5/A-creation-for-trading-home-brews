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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferRoutes = void 0;
const express_1 = require("express");
const authentication_1 = require("../utils/authentication");
require('express-async-errors');
const offerModel_1 = require("../models/offerModel");
const userModel_1 = require("../models/userModel");
const router = express_1.Router();
//get all offers (public info)
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield offerModel_1.Offer.find({});
    res.json(offers.map((offers) => offers.toListJSON())); //change this to some to publicJSON or so
}));
//post new offer
router.post('/', authentication_1.authentication.required, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findById(req.body.authUser.id);
    if (!user)
        return res.sendStatus(401);
    const newOffer = new offerModel_1.Offer(Object.assign(Object.assign({}, req.body), { owner: req.body.authUser.id }));
    const savedOffer = yield newOffer.save();
    if (savedOffer)
        return res.json(savedOffer.toListJSON());
}));
// delete Offer
router.delete('/:id', authentication_1.authentication.required, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.authUser)
        return res.sendStatus(401);
    const offer = yield offerModel_1.Offer.findById(req.params.id);
    if (!offer)
        return res.sendStatus(404);
    if (req.body.authUser.id.toString() === offer.owner.toString()) {
        yield offerModel_1.Offer.findByIdAndDelete(req.params.id);
        return res.sendStatus(204);
    }
    return res.sendStatus(403);
}));
//get logged in users own offers
router.get('/my-offers', authentication_1.authentication.required, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.authUser)
        return res.sendStatus(401);
    const myOffers = yield offerModel_1.Offer.find({ owner: req.body.authUser.id });
    res.json(myOffers.map((o) => o.toDisplayJSON()));
}));
//get detailed public info
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield offerModel_1.Offer.findById(req.params.id).populate('owner', { username: 1 });
    res.json(offer.toDisplayJSON());
}));
//update offer by id
router.put('/:id', authentication_1.authentication.required, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.authUser)
        return res.sendStatus(401);
    const offer = yield offerModel_1.Offer.findById(req.params.id);
    if (!offer)
        return res.sendStatus(404);
    if (req.body.authUser.id.toString() === offer.owner.toString()) {
        const _a = req.body, { authUser } = _a, offerData = __rest(_a, ["authUser"]);
        const updatedOffer = yield offerModel_1.Offer.findByIdAndUpdate(req.body.id, offerData, { new: true });
        res.json(updatedOffer.toJSON());
    }
}));
exports.OfferRoutes = router;
//# sourceMappingURL=offerRoutes.js.map