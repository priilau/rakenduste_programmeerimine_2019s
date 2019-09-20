import homepage from "./homepage.js"
import productpage from "./productpage.js"

console.log("i am index");

(function() {
    homepage.Setup();
    productpage.Setup();
    console.log("page fully loaded");
})();