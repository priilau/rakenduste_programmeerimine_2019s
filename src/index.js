const homepage = require("./homepage.js");
const productpage = require("./productpage.js");

console.log("i am index");

(function() {
    homepage.Setup();
    productpage.Setup();
    console.log("page fully loaded");
})();