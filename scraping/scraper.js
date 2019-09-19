/*
const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313.TR12.TRC2.A0.H0.Xlaptops.TRS0&_nkw=laptops&_sacat=0";

axios.get(url)
.then(response => {
    //console.log(response.data);
        const $ = cheerio.load(response.data);
        //const urlElements = $("li.sresult.lvresult.clearfix.li.shic");
        const urlElements = $("a.img.imgWr2");

        for (let i = 0; i < urlElements.length; i++) {
            const imgSrc = $(urlElements[i]).find("img.img")[0];

            if(imgSrc) {
                const imgText = $(imgSrc.imgurl)//.html();
                console.log(imgText);
            }
        }
    })
    .catch(error => {
        console.log(error);
    })
*/ // üritasin kasutada axios'e ja cheerio teeke, ei saanud käima, selle asemel m6tlesin midagi sellist v2lja

{
    const searchItems = document.querySelectorAll("li.sresult.lvresult");
    const array = [];

    for (let i = 0; i < searchItems.length; i++) {
        let obj = searchItems[i];
        let imgContainer = obj.querySelector("img.img");
        let img = imgContainer.src;
        let title = imgContainer.alt;
        let price = obj.querySelector(".bold").innerText;
        
        if(img !== undefined || title !== undefined || price !== undefined){
            array.push({
                imgSrc : img,
                title : title,
                price : price,
                category : "laptops",
                //category : "phones",
            });
        }
    }
    console.log(array);
    console.log(array.length);
}
