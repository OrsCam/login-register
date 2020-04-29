const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const cors = function (res, req) {
    res.setHeader('Access-Control-Allow-Origin', '*')
};

const httpHandler = function (req, res) {
    console.log(req.method + ': ' + req.url)
    if (req.url === '/' && req.method === "POST") {
        res.setHeader('Access-Control-Allow-Origin', '*')
        getIndex(req, res);
    }
};

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Node server." });
});

require("./app/routes/user.routes.js")(app);

// set port, listen for requests
app.listen(8001, () => {
    console.log("Server is running on port 8001.");
});