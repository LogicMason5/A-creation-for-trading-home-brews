"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const mongoose_1 = require("mongoose");
const OfferSchema = new mongoose_1.Schema({
    beerName: { type: String, required: true },
    description: { type: String, required: true },
    packageSize: { type: String },
    amount: { type: Number },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    recipeLink: { type: String },
    imageUrl: { type: String },
    updatedAt: { type: Date },
    active: { type: Boolean },
    id: { type: mongoose_1.Schema.Types.ObjectId },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });
OfferSchema.methods.toListJSON = function () {
    return {
        beerName: this.beerName,
        description: this.description,
        active: this.active,
        location: this.location,
        created: this.updatedAt.toString(),
        id: this._id.toString()
    };
};
OfferSchema.methods.toDisplayJSON = function () {
    return {
        beerName: this.beerName,
        description: this.description,
        packageSize: this.packageSize,
        active: this.active,
        amount: this.amount,
        location: this.location,
        recipeLink: this.recipeLink,
        imgUrl: this.imageUrl,
        created: this.updatedAt.toString(),
        id: this._id.toString(),
        owner: this.owner
    };
};
exports.Offer = mongoose_1.model('Offer', OfferSchema);
//# sourceMappingURL=offerModel.js.map