let productsCards = document.querySelector('.products__cards');
let productsPagination = document.querySelector('.products__pagination');
let productsSearch = document.querySelector('.products__search');
let productsFrom = document.querySelector('.products__from');
let productsSelect = document.querySelector('.products__select');
let productsTitle = document.querySelector('.products__title')

let page = 1;

getCategoryActive=()=>{
   let categoryItem = document.querySelectorAll('.aside__top-link');
   Array.from(categoryItem).forEach(item=>{
      
      if(location.search === item.getAttribute('href')){
         item.classList.add('active');
         productsTitle.textContent=item.textContent;
      }
   })
}
getCategoryActive()

getAllProducts = (title='', from=0, option='') => {
   let select=option.length ? `&_sort=price&_order=${option}` : ''
   let category = location.search.includes('all') ? '' : `category_like=${location.search.split('=')[1]}`

   //2.получаем отфильтрованный товар на странице №page в кол-ве 5 штук
   fetch(`http://localhost:3000/products?${category}&_page=${page}&_limit=5&title_like=${title}&price_gte=${from}${select}`)
      .then(response => response.json())
      .then(response => {
         productsCards.textContent = '';
         
         response.forEach(item => {
            productsCards.innerHTML += `
               <div class="products__card">
                  <div class="products__card-image">
                     <a href="../product/index.html?product=${item.id}">
                        <img class="products__card-img" src="${item.image}" alt="snikers">
                     </a>
                  </div>
                  <h4 class="products__card-title">${item.title}</h4>
                  <p class="products__card-category">${item.category}</p>
                  <div class="products__card-block">
                     <p class="products__card-price">${item.price}$</p>
                     <p class="products__card-purchased">${item.rating.count} people purchased</p>
                  </div>
               </div>
            `
         })
      })
}
getAllProducts();

getAllProductsCount = (title='', from=0, option='') => {
   let select=option.length ? `&_sort=price&_order=${option}` : ''
   let category = location.search.includes('all') ? '' : `category_like=${location.search.split('=')[1]}`

   //1.получаем отфильтрованный товар для расчета количества страниц:
   fetch(`http://localhost:3000/products?${category}&title_like=${title}&price_gte=${from}${select}`)
      .then(response => response.json())
      .then(response => {
         productsPagination.innerHTML = '';

         //отрисовываем кнопки пагинации:
         for (let i = 1; i <= Math.ceil(response.length / 5); i++) {
            productsPagination.innerHTML += `
            <button data-id="${i}" style="background: ${page === i ? 'rgb(131, 38, 219)' : 'rgb(40, 40, 40)'}" 
            class="products__pagination-btn btn-blue">${i}</button>
            `
         }

         let paginationBtns=document.querySelectorAll('.products__pagination-btn');

         Array.from(paginationBtns).forEach(item=>{
            item.addEventListener('click', ()=>{
               page = +item.dataset.id;

               Array.from(paginationBtns).forEach(el=>{
                  if(page === +el.dataset.id){
                     el.style.background='rgb(131, 38, 219)';
                  }else{
                     el.style.background='rgb(40, 40, 40)';
                  }
               })
               
               getAllProducts(productsSearch.value, productsFrom.value, productsSelect.value);
            })
         })
      })
}
getAllProductsCount();

//передаем значение фильтра в функции:
productsSearch.addEventListener('input',()=>{
   getAllProducts(productsSearch.value, productsFrom.value, productsSelect.value);
   getAllProductsCount(productsSearch.value, productsFrom.value, productsSelect.value);
})
productsFrom.addEventListener('input', ()=>{
   getAllProducts(productsSearch.value, productsFrom.value, productsSelect.value);
   getAllProductsCount(productsSearch.value, productsFrom.value, productsSelect.value);
})
productsSelect.addEventListener('change', ()=>{
   getAllProducts(productsSearch.value, productsFrom.value, productsSelect.value);
   getAllProductsCount(productsSearch.value, productsFrom.value, productsSelect.value);
})