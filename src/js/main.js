let trendCards = document.querySelector('.trending__cards');
let trendBtn = document.querySelector('.trending__btn');
let lessCards = document.querySelector('.less__cards');
let lessBtn = document.querySelector('.less__btn');


// запрос 5 продуктов с самым большим рентингом:
// http://localhost:3000/products?_sort=rating.rate&_order=desc&_limit=5
// _sort=rating.rate - сотировка по ретингу
// _order=desc - от большего к меньшему
// _limit=5 - количество продуктов, выводимых на экран
const getAllTrends = (limit = 5) => {
    fetch(`http://localhost:3000/products?_sort=rating.rate&_order=desc&_limit=${limit}`)
        .then(response => response.json())
        .then(response => {
            trendCards.textContent = '';
            response.forEach(item => {
                trendCards.innerHTML += `
                <div class="trending__card">
                    <a href="./pages/product/index.html?product=${item.id}">
                        <img class="trending__card-img" src="${item.image}" alt="snikers">
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
getAllTrends();

trendBtn.addEventListener('click', () => {
    if (trendBtn.textContent === 'See more') {
        getAllTrends(10);
        trendBtn.textContent = 'Hide'
    } else {
        getAllTrends();
        trendBtn.textContent = 'See more'
    }

})

// запрос 5 продуктов по цене не больше 100$:
const getAllLess = (limit = 5) => {
    fetch(`http://localhost:3000/products?price_lte=100&_limit=${limit}`)
        .then(response => response.json())
        .then(response => {
            lessCards.textContent = '';
            response.forEach(item => {
                lessCards.innerHTML += `
                <div class="trending__card">
                    <a href="./pages/product/index.html?product=${item.id}">
                        <img class="trending__card-img" src="${item.image}" alt="snikers">
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
getAllLess();

lessBtn.addEventListener('click', () => {
    if (lessBtn.textContent === 'See more') {
        getAllLess(10);
        lessBtn.textContent = 'Hide'
    } else {
        getAllLess();
        lessBtn.textContent = 'See more'
    }

})