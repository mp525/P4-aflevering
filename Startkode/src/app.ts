import express from "express";
import {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config()
import path from "path"
import friendRoutesAuth from "./routes/friendRoutesAuth";
import { ApiError } from "./errors/apiError";
const app = express()
const debug = require("debug")("app");
const Cors = require("cors");

//More complicated logger with log files (choose one or other preferably)
import logger, { stream } from "./middlewares/logger";
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"
app.use(require("morgan")(morganFormat, { stream }));
app.set("logger", logger);
logger.log("info", "Server started");

app.use(Cors());
app.use(express.json())
//Simple logger
app.use((req,res,next)=>{
  debug('Time:', new Date().toLocaleDateString(), req.method, req.originalUrl, req.ip);
  next();
});

app.use(express.static(path.join(process.cwd(), "public")))

//just demo
app.use("/api/friends", friendRoutesAuth);

app.get("/demo", (req, res) => {
  let msg = "Demo reached";
  console.log(msg);
  res.send("Server is really up");
})

import authMiddleware from "./middlewares/basic-auth"
//app.use("/graphql", authMiddleware)

app.use("/graphql", (req, res, next) => {
  const body = req.body;
  if (body && body.query && body.query.includes("createFriend")) {
    console.log("Create")
    return next();
  }
  //Indkommenter for auth på graphql
  /* if (body && body.operationName && body.query.includes("IntrospectionQuery")) {
    return next();
  }
  if (body.query && (body.mutation || body.query)) {
    return authMiddleware(req, res, next)
  } */
  next()
})


import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema';

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));



//404 handlers for api-requests
app.use("/api", (req,res,next)=>{
  res.status(404).json({"message": "not found", "errorCode":404});
});

app.use((err:any, req:Request, res:Response, next:Function)=>{
  if(err instanceof ApiError){
    const errorCode = err.errorCode ? err.errorCode : 500;
    res.status(errorCode).json({"message": "not found", "errorCode":errorCode});
  }
  else{
    next(err);
  }
});



export default app;

