const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const database = require("./database.js");

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

//Heroku portide jaoks
app.listen(PORT, () => {
    console.log("Server started", PORT);
});S

app.get("/api/items", (req, res)=>{
    res.json(database.GetItems());
});

app.get("/items/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("/api/items/:itemId", (req, res)=>{
    res.send(database.GetItem(req.params.itemId));
});

app.use(express.static("dist"));

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});