const products = [
    { id: 1, title: 'Notebook', price: 1000 },
    { id: 2, title: 'Mouse', price: 100 },
    { id: 3, title: 'Keyboard', price: 250 },
    { id: 4, title: 'Gamepad', price: 150 },
];
const renderProduct = ({ title, price }) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <img src="https://fakeimg.pl/250x250/">
                <button class="by-btn">Добавить</button>
              </div>`;
}
const renderProducts = (arr) => {
    let productList = ''
    arr.forEach(item => {
        productList += renderProduct(item);
    });
    document.querySelector('.products').innerHTML = productList;
}

renderProducts(products);