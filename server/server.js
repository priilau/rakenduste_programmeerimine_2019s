const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const database = require("./database.js");

app.get("/api/items/:itemId", (req, res)=>{
    res.send(database.getItem(req.params.itemId));
});

app.get("/api/items", (req, res)=>{
    res.json(database.getItems());
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("/items/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static("dist"));

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});