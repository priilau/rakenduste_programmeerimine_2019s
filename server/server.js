const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const Item = require("./item.model.js");
const database = require("./database.js");
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rp2019-10owc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(itemRouter);
app.use(userRouter);

if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("/items/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static("dist"));

function listen() {
    app.listen(PORT, () => {
        console.log("Server started", PORT);
        console.log(`http://localhost:${PORT}`);
    });
}

mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB Access success");
        migrate();
        //deleteAllItems();
        listen();
    })
    .catch(err => {
        console.log("DB Access error: ", err);
});


function migrate() {
    Item.count({}, (err, count) => {
        if(err) {
            throw err;
        }
        if(count > 0) {
            console.log("Items already exist!");
            return;
        }
        saveAllItems(); 
    });
}
/*
function deleteAllItems() {
    Item.deleteMany({}, (err, doc) => {
        console.log("err: ", err, "doc: ", doc);
    });
}
*/
function saveAllItems() {
    const items = database.getItems();
    items.forEach(item => {
        const document = new Item(item);
        document.save((err) => {
            if(err) {
                throw new Error("Something went wrong while saving!");
            }
            console.log("Save success!");
        });
    });
}