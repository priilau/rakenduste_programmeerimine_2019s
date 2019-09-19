function Setup() {
    console.log("setup productpage");
    const params = new URLSearchParams(window.location.search);
    const imgSrc = params.get("imgSrc");
    const name = params.get("name");
    const price = params.get("price");

    let product = document.querySelector("#product-description");
    if(!product){
        return;
    }
    let title = document.querySelector("#title");
    title.innerText = name;

    let productImg = document.createElement("div");
    productImg.id = "product-img";
    let img = document.createElement("img");
    img.src = imgSrc;
    img.alt = name;
    productImg.appendChild(img);
    let productName = document.createElement("div");
    productName.id = "product-name";
    productName.innerText = name;
    let productPrice = document.createElement("div");
    productPrice.id = "product-price";
    productPrice.innerText = "Price: " + price;

    product.appendChild(productImg);
    product.appendChild(productName);
    product.appendChild(productPrice);

    //alert(name + ", " + price + ", " + imgSrc);
}

module.exports = {
    Setup
}