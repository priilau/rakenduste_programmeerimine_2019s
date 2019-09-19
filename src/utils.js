const productsContainer = document.querySelector("#products");

function CreateProduct(img, title, price) {
    let product = document.createElement("a");
    product.id = "product";
    product.href = "product.html?imgSrc=" + img + "&name=" + title + "&price=" + price;

    let productImg = document.createElement("div");
    productImg.id = "product-img";

    let image = document.createElement("img");
    image.src = img;
    image.alt = title;
    productImg.appendChild(image);

    let productName = document.createElement("div");
    productName.id = "product-name";
    productName.innerText = title;

    let productPrice = document.createElement("div");
    productPrice.id = "product-price";
    productPrice.innerText = price;

    product.appendChild(productImg);
    product.appendChild(productName);
    product.appendChild(productPrice);
    productsContainer.appendChild(product);
}

module.exports = {
    CreateProduct,
}