"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api = express_1.default.Router();
api.get('/', function (req, res) {
    res.send('in the api route');
    var title = req.query.title ? req.query.title : null;
    var titleNumber = title && parseInt(title);
    console.log(titleNumber);
    console.log(req.query.name);
});
exports.default = api;
/*


  const title = req.query.title ? req.query.title : null;
  const test22 = title && parseInt(title as string); //type of parsedQs
  res.send('hello from api ' + req.query.title + ' ' + req.query.name);
  console.log(req.query.name);
  console.log(test22);
  console.log(typeof test22);*/
