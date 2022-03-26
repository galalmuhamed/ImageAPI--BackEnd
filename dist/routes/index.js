"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageResize_1 = __importDefault(require("./api/imageResize"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('welcome to Image Processing Api');
});
routes.use('/resize', imageResize_1.default);
exports.default = routes;
