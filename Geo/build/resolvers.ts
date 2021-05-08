"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var geojson_utils_1 = __importDefault(require("geojson-utils"));
var a = geojson_utils_1.default.pointDistance({ type: "Point", coordinates: [2, 3] }, { type: "Point", coordinates: [3, 4] });
console.log("Distance", a);
var b = geojson_utils_1.default.pointInPolygon({ type: "Point", coordinates: [3, 5] }, { type: "Polygon", coordinates: [[[0, 0], [6, 0], [6, 6], [0, 6]]] });
var center = { type: "Point", coordinates: [3, 3] };
var points = [
    { type: "Point", coordinates: [2, 2] },
    { type: "Point", coordinates: [2, 4] },
    { type: "Point", coordinates: [4, 4] },
    { type: "Point", coordinates: [5, 5] }
];
points.forEach(function (p) {
    console.log(typeof p);
    // if (gju.geometryWithinRadius(p, center, 3)) { }
});
exports.resolvers = {
    Query: {},
};
