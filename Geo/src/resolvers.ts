import gju from "geojson-utils"


//const {gameArea, players} = require("./gameData")
import { gameArea, players } from "./gameData"

const nicelyFormattedGameArea = {
  coordinates: gameArea.coordinates[0].map(p => {
    return { longitude: p[0], latitude: p[1] }
  })
}

export const resolvers = {
  Query: {
    gameArea: () => {
      return nicelyFormattedGameArea
    },
    gameArea_VersionPelle: () => {
      return gameArea
    },
    isUserInArea: (_: any, { longitude, latitude }: { latitude: number, longitude: number }) => {
      const point = { type: "Point", coordinates: [longitude, latitude] }
      const isInside = gju.pointInPolygon(point, gameArea)
      let result: any = {};
      result.status = isInside;
      result.msg = isInside ? "Point was inside the GameArea" : "Point was NOT inside the GameArea";
      return result
    },
    findNearbyPlayers: (_: any, { longitude, latitude, distance }: { longitude: number, latitude: number, distance: number }) => {
      const point = { "type": "Point", "coordinates": [longitude, latitude] }
      let foundPlayers: any = [];
      players.map((p)=>{
        if(gju.geometryWithinRadius(p.geometry, point, distance)){
          let tmp = {
            name:p.properties.name,
            point:p.geometry
          }
          foundPlayers.push(tmp);
        }
      })

      return foundPlayers;
    },
    distanceToUser: async (_: any, { longitude, latitude, userName }: { longitude: number, latitude: number, userName: string }) => {
      const point = { "type": "Point", "coordinates": [longitude, latitude] }
      let exist = {"distance":0, "to":""}
      players.map((p)=>{
        if(p.properties.name == userName){
          const distance = gju.pointDistance(point, p.geometry);
          exist = {distance, to:userName}
        }
      });

      if(exist.distance === 0 || exist.to === ""){
        return null;
      }

      return exist;

    }
  },
};