const products = [
    { id: 1, name: "귀여운 아보카도 키링", price: "8,000원", category: ["best"], color: "1", images: ["./../img/product_felt_avocado.webp"] },
    { id: 2, name: "귀여운 브로콜리 키링", price: "8,000원", category: ["best"], color: "1", images: ["./../img/product_felt_broccoli.webp"] },
    { id: 3, name: "귀여운 버섯 키링", price: "8,000원", category: ["new", "best"], color: "1", images: ["./../img/product_felt_mushroom.webp"] },
    { id: 4, name: "귀여운 복숭아 키링", price: "8,000원", category: ["new", "best"], color: "1", images: ["./../img/product_felt_peach1.webp", "./../img/product_felt_peach2.webp"] },
    { id: 5, name: "귀여운 호박 키링 (할로윈 한정)", price: "8,000원", category: ["new"], color: "1", images: ["./../img/product_felt_pumpkin.webp"] },
    { id: 6, name: "[노인복지사업] 헤어 스크런치", price: "3,000원", category: ["best"], color: "3", images: ["./../img/product_hair_scrunchie1.webp", "./../img/product_hair_scrunchie2.webp"] },
    { id: 7, name: "친환경 대나무 행주 (3p)", price: "12,000원", category: [], color: "1", images: ["./../img/product_hankie1.webp", "./../img/product_hankie2.webp"] },
    { id: 8, name: "[노인복지사업] 호보백", price: "22,000원", category: ["best"], color: "3", images: ["./../img/product_hobo_bag1.webp", "./../img/product_hobo_bag2.webp"] },
    { id: 9, name: "대단한 고양이 키링", price: "9,000원", category: ["new"], color: "4", images: ["./../img/product_keyring_cat1.webp", "./../img/product_keyring_cat2.webp"] },
    { id: 10, name: "대단한 오리 키링", price: "9,000원", category: [], color: "7", images: ["./../img/product_keyring_duck1.webp", "./../img/product_keyring_duck2.webp"] },
    { id: 11, name: "대단한 개구리 키링", price: "9,000원", category: [], color: "3", images: ["./../img/product_keyring_prog1.webp", "./../img/product_keyring_prog2.webp"] },
    { id: 12, name: "건강한 재사용 파우치", price: "7,000원", category: ["new", "best"], color: "3", images: ["./../img/product_pouch1.webp", "./../img/product_pouch2.webp"] },
    { id: 13, name: "분리형 실리콘 빨대", price: "18,000원", category: ["new"], color: "2", images: ["./../img/product_strow1.webp", "./../img/product_strow2.webp"] },
    { id: 14, name: "친환경 고체치약", price: "15,000원", category: ["best"], color: "1", images: ["./../img/product_tooth_tablet1.webp"] },

];

const grid = document.querySelector('.product_grid');
const tabs = document.querySelectorAll('.tab_btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const pageNumbers = document.querySelector('.page_numbers');

let currentCategory = 'new';
let currentPage = 1;
const itemsPerPage = 6;

function renderProducts(list) {
    grid.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageList = list.slice(start, end);

    pageList.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product_card';
        card.innerHTML = `
            <div class="product_images">
                ${p.images.map(src => `<img src="${src}" alt="${p.name}">`).join('')}
            </div>
            <div class="product_info">
                <div class="product_name">${p.name}</div>
                <div class="product_price">${p.price}</div>
                <div class="product_category">
                    ${p.category.map(c => `<span class="cat_${c}">${c==='new'?'신제품':'베스트'}</span>`).join('')}
                </div>
                <div class="product_color">색상: ${p.color}</div>
            </div>
        `;
        grid.appendChild(card);
    });

    renderPagination(list.length);
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        if (i === currentPage) span.classList.add('active');
        span.addEventListener('click', () => {
            currentPage = i;
            filterAndRender();
        });
        pageNumbers.appendChild(span);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        filterAndRender();
    }
});
nextBtn.addEventListener('click', () => {
    const filtered = getFilteredProducts();
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        filterAndRender();
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        currentCategory = tab.dataset.category;
        currentPage = 1;
        filterAndRender();
    });
});

function getFilteredProducts() {
    if (currentCategory === 'all') return products;
    return products.filter(p => p.category.includes(currentCategory));
}

function filterAndRender() {
    const filtered = getFilteredProducts();
    renderProducts(filtered);
}

filterAndRender();