"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_tools_1 = require("graphql-tools");
var resolvers_1 = require("./resolvers");
var typeDefs = "\n\ntype Coordinate {\n  latitude: Float!\n  longitude:Float!\n}\n\ntype Coordinates {\n  coordinates: [Coordinate]\n}\n\ntype Query {\n\n  \"\"\"Returns a GeoJson Polygon representing the legal gameArea\"\"\"\n  gameArea : Coordinates   \n\n}\n";
var schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers_1.resolvers });
exports.schema = schema;
