let title = document.querySelector('.product__title');
let price = document.querySelector('.product__price');
let category = document.querySelector('.product__category-text');
let rating = document.querySelector('.product__rating-num');
let description = document.querySelector('.product__description');
let img = document.querySelector('.product__img');
let addCard = document.querySelector('.product__add-card');
let addFavorites = document.querySelector('.product__add-favorites');
let trendCards = document.querySelector('.trending__cards');

const getAllRelatedProducts=(productCategory, id)=>{
    fetch(`http://localhost:3000/products?category=${productCategory}&id_ne=${id}`)
        .then(response => response.json())
        .then(response => {
            trendCards.textContent = '';
            response.forEach(item => {
                trendCards.innerHTML += `
                <div class="trending__card">
                    <a href="../product/index.html?product=${item.id}">
                        <img class="trending__card-img" src="${item.image}" alt="${item.title}">
                    </a>
                    <h4 class="trending__card-title">${item.title}</h4>
                    <p class="trending__card-category">${item.category}</p>
                    <div class="trending__card-block">
                        <p class="trending__card-price">${item.price}$</p>
                        <p class="trending__card-purchased">${item.rating.count} people purchased</p>
                    </div>
                </div>
            `
            })
        })
}

const getOneProduct=()=>{
    fetch(`http://localhost:3000/products/${location.search.split('=')[1]}`)
        .then(response=>response.json())
        .then(response=>{
            console.log(response);
            title.textContent=response.title;
            price.textContent=`${response.price}$`;
            category.textContent=response.category;
            rating.textContent=response.rating.rate;
            description.textContent=response.description;
            img.setAttribute('src',response.image);
            addCard.dataset.id=response.id;
            addFavorites.dataset.id=response.id;

            getAllRelatedProducts(response.category, response.id)
        })
}
getOneProduct();