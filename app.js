import express from 'express';
import cors from "cors";
import "dotenv/config";

import LoginRoutes from './Login/routes';
import SignupRoutes from './Signup/routes';

const app = express()
app.use(cors());
app.use(express.json());

LoginRoutes(app)
SignupRoutes(app)

app.listen(process.env.PORT || 4000);