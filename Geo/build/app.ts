"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var express_graphql_1 = require("express-graphql");
var schema_1 = require("./schema");
app.get('/', function (req, res) { return res.send('Geo Demo!'); });
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.schema,
    graphiql: true,
}));
var PORT = 4567;
app.listen(4567, function () { return console.log('Example app listening on ' + PORT); });
