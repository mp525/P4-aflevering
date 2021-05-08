const gameArea = {
  type: "Polygon",
  coordinates: [
    [
      [12.549219131469727, 55.7918243094437],
      [12.553167343139648, 55.77942102307777],
      [12.58277893066406, 55.78077254556532],
      [12.581748962402342, 55.79592569474521],
      [12.563638687133789, 55.80152218251418],
      [12.549219131469727, 55.7918243094437],
    ],
  ],
};

const players = [
  {
    type: "Feature",
    properties: {
      name: "p2-outside",
    },
    geometry: {
      type: "Point",
      coordinates: [12.548704147338865, 55.79558794992224],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "p1-outside",
    },
    geometry: {
      type: "Point",
      coordinates: [12.547416687011719, 55.784344200781206],
    },
  },
  {
    type: "Feature",
    properties: { name: "p3-inside" },
    geometry: {
      type: "Point",
      coordinates: [12.567071914672852, 55.79230684777876],
    },
  },
  {
    type: "Feature",
    properties: { name: "p4-inside" },
    geometry: {
      type: "Point",
      coordinates: [12.574882507324219, 55.7841994103155],
    },
  },
];

//module.exports = { gameArea, players };

export {gameArea, players}