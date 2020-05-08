require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/user/user.router");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.APP_PORT}`);
});

