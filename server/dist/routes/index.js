"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const userRoutes_1 = require("./userRoutes");
const offerRoutes_1 = require("./offerRoutes");
const router = express_1.Router();
router.use('/user', userRoutes_1.UserRoutes);
router.use('/offers', offerRoutes_1.OfferRoutes);
exports.MainRouter = router;
//# sourceMappingURL=index.js.map