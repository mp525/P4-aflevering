"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var geojson_utils_1 = __importDefault(require("geojson-utils"));
/*
For this to work with TypeScript, since this package does not have a @Types/geojson-utils description we have to write
- geojson-utils.d.ts (un-comment the declaration in the file)
- Add the relevant entries in tsconfig.json (already done)
*/
var distance = geojson_utils_1.default.pointDistance({ type: "Point", coordinates: [2, 3] }, { type: "Point", coordinates: [3, 4] });
console.log("Distance", distance);
console.log("-----------------------------------");
var result = geojson_utils_1.default.pointInPolygon({ type: "Point", coordinates: [3, 5] }, { type: "Polygon", coordinates: [[[0, 0], [6, 0], [6, 6], [0, 6]]] });
console.log("Was Point in polygon: " + result);
console.log("-----------------------------------");
var center = { type: "Point", coordinates: [3, 3] };
var points = [
    { type: "Point", coordinates: [2, 2] },
    { type: "Point", coordinates: [4, 2] },
    { type: "Point", coordinates: [4, 4] },
    { type: "Point", coordinates: [5, 5] }
];
console.log("## Searching for all points inside a radius of 200 km ##");
points.forEach(function (p) {
    if (geojson_utils_1.default.geometryWithinRadius(p, center, 200000)) {
        console.log("Found. Distance to center is " + geojson_utils_1.default.pointDistance(p, center));
    }
    else {
        console.log("Not Found. Distance to center is " + geojson_utils_1.default.pointDistance(p, center));
    }
});
//# sourceMappingURL=geoUtilsTester.js.map