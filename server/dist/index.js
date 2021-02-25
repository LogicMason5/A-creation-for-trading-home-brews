"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const port = process.env.PORT || 3001;
app_1.default
    .listen(port, () => {
    logger_1.default.info(`server running on port : ${port}`);
    console.log(`server running on port : ${port}`);
})
    .on('error', (e) => logger_1.default.error(e));
//# sourceMappingURL=index.js.map