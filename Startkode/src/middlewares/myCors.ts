import express from "express";
const app = express();
//const Cors = require("cors");

//app.use(Cors());

app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


export default app;