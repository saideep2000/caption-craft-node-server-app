import express from 'express';
import cors from "cors";
import "dotenv/config";
import UserRoutes from "./users/routes.js";
import mongoose from 'mongoose';
import session from "express-session";
import LoginRoutes from './Login/routes.js';
import SignupRoutes from './Signup/routes.js';

mongoose.connect("mongodb+srv://caption-craft:R7MOIUbb43y7TJkv@cluster-craft.conjprb.mongodb.net/caption-craft");

const app = express()
app.use(
    cors({
    credentials: true,
    // origin: "http://localhost:3000",
    origin: process.env.FRONTEND_URL,
  })
 );

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
app.use(session(sessionOptions));
app.use(express.json());


LoginRoutes(app)
SignupRoutes(app)
UserRoutes(app)

app.listen(process.env.PORT || 4000);