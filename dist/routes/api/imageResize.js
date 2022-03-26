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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var fs_2 = require("fs");
var imageProcessing_1 = __importDefault(require("../../helpers/imageProcessing"));
var imageResize = express_1.default.Router();
imageResize.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, width, height, fullPathFileName, resizePathFileName, dataThumbImg, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                fileName = req.query.filename;
                width = req.query.width
                    ? parseInt(req.query.width)
                    : null;
                height = req.query.height
                    ? parseInt(req.query.height)
                    : null;
                //check url is correct
                if (!fileName || !width || !height) {
                    res
                        .status(404)
                        .send('you must write correct url /resize?filename=fjord&width=200&height=200');
                    return [2 /*return*/];
                }
                fullPathFileName = path_1.default.join(__dirname, '../', '../', 'images', "".concat(fileName, ".jpg"));
                resizePathFileName = path_1.default.join(__dirname, '../', '../', 'images', 'thumbnails', "".concat(fileName, "_").concat(width, "_").concat(height, ".jpg"));
                if (!fs_1.default.existsSync(fullPathFileName)) return [3 /*break*/, 6];
                if (!(fs_1.default.existsSync(path_1.default.join(__dirname, '../', '../', 'images', 'thumbnails')) &&
                    fs_1.default.existsSync(resizePathFileName))) return [3 /*break*/, 2];
                return [4 /*yield*/, fs_2.promises.readFile(resizePathFileName)];
            case 1:
                dataThumbImg = _a.sent();
                res.writeHead(200, { 'Content-Type': 'image/jpg' });
                res.end(dataThumbImg);
                return [3 /*break*/, 5];
            case 2:
                if (!!fs_1.default.existsSync(path_1.default.join(__dirname, '../', '../', 'images', 'thumbnails'))) return [3 /*break*/, 4];
                return [4 /*yield*/, fs_2.promises.mkdir(path_1.default.join(__dirname, '../', '../', 'images', 'thumbnails'))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                (0, imageProcessing_1.default)({
                    width: width,
                    height: height,
                    fullPathFileName: fullPathFileName,
                    resizePathFileName: resizePathFileName,
                }).then(function (resizeImg) {
                    res.status(200).contentType('jpg').send(resizeImg);
                });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(404).send('Image Does Not Exist!');
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _a.sent();
                res.status(404).send('error processing image');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
exports.default = imageResize;
