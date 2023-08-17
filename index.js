const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/tasks");
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
app.use(router);

app.get("/getMyName", (req, res, next) => {
    const paramName = req.query.name;
    res.status(200).json({ data: paramName });
});

app.post("/getMyName", (req, res, next) => {
    const paramName = req.body;
    res.status(200).json(paramName);
});

app.listen(PORT, function (err) {
    err ? console.log(err) : console.log("server started");
});
