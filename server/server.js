const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const database = require("./database.js");
const mongoose = require("mongoose");
const itemRouter = require("./item.js");
require("dotenv").config();
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rp2019-10owc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(itemRouter);
/*
app.get("/api/items/:itemId", (req, res)=>{
    res.send(database.getItem(req.params.itemId));
});

app.get("/api/items", (req, res)=>{
    res.json(database.getItems());
});
*/
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("/items/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static("dist"));
/*
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
*/

function listen() {
    app.listen(PORT, () => {
        console.log("Server started", PORT);
        console.log(`http://localhost:${PORT}`);
    });
}

mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB Access success");
        listen();
    })
    .catch(err => {
        console.log("DB Access error: ", err);
    });