const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("./item.model.js");

router.post("/items", (req, res) => {
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

router.get("/items", (req, res) => {
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

router.get("/items/:itemId", (req, res) => {
    Item.findById(req.params.itemId, function(err, item) {
        if(err) {
            console.log("Error: ", err);
            res.status(500).send(err);
            return;
        }
        res.send(item);
    });
});

router.delete("/items/:itemId", (req, res) => {
    Item.deleteOne({"_id" : mongoose.Types.ObjectId(req.params.itemId)}, function(err) {
        if(err) {
            console.log("Error: ", err);
            return res.send(500);
        }
        console.log("Delete success!");
        return res.send(204);
    });
});

module.exports = router; 