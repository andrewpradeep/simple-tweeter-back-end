require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/tasks");
const pushNotificationRouter = require("./routes/pushNotification");
const { WebSocketServer } = require("ws");

const app = express();

const PORT = process.env.PORT || "3300";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
        console.log("received: %s", data);
    });

    ws.send("something");
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(router);
app.use(pushNotificationRouter);

app.get("/name", (req, res, next) => {
    const paramName = req.query.name;
    res.status(200).json({ data: paramName });
});

app.post("/name", (req, res, next) => {
    const paramName = req.body;
    res.status(200).json(paramName);
});

app.listen(PORT, function (err) {
    err ? console.log(err) : console.log("server started at port", PORT);
});
