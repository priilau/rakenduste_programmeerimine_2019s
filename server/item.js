const express = require("express");
const router = express.Router();
const database = require("./database.js");
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

router.post("/api/items", (req, res) => {
    const props = {
        imgSrc: "google.com",
        title: "phone red",
        price: 399,
        category: "phones"
    };
    const item1 = new Item(props);
    item1.save(err => {
        if(err) {
            console.log("Error", err);
            res.sendStatus(500);
            return;
        }
        console.log("Success createItem");
        res.sendStatus(201);
    });
});

/*
* Returns all items
* */

router.get("/api/items", (req, res) => {
    Item.find({}, function(err, items) {
        if(err) {
            console.log("Error: ", err);
            res.status(500).send(err);
            return;
        }
        res.send(items);
    });
});

/*
* Returns an item
* */

router.get("/api/items/:itemId", (req, res) => {
    Item.findById(req.params.itemId, function(err, item) {
        if(err) {
            console.log("Error: ", err);
            res.status(500).send(err);
            return;
        }
        res.send(item);
    });
});

module.exports = router; 