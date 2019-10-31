const express = require("express");
const router = express.Router();
const User = require("./user.model.js");

router.get("/users", (req, res) => {
    User.find({}, function(err, docs) {
        if(err) {
            return handleError(err, res);
        }
        res.status(200).json(docs);
    });
});

router.delete("/users", (req, res) => {
    User.deleteMany({}, (err, docs) => {
        if(err) {
            return handleError(err, res);
        }
        console.log(docs);
        console.log("Users deleted!");
        res.status(204);
    });
});

function handleError(err, res) {
    console.log(err);
    res.send(500);
}

module.exports = router; 