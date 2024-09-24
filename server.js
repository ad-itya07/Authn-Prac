import express from "express";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
// Adding session and passport
import session from "express-session";
import passport from "./config/passportconfig.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(bodyParser.urlencoded( { extended : true}));
app.use(express.json());

// adding the authentication 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(port , () => {
    console.log(`server running on port ${port}`);
});