const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

class List {

  constructor(container, url) {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this.url = url;
  }

  getProducts(url) {
    return  fetch(API + url).then(data => data.json() )
  };

  render(container, templateName){
    const block = document.querySelector(container)
    for (let item of this.goods) {
      let newItem = new templateName(item)
      block.insertAdjacentHTML('beforeend', newItem.render())
    }
  };

  getPrice(){
    return this.goods.reduce((allsum, price) => allsum + item.price, 0)
  }

}

class Catalog extends List{
  constructor(container = '.products', url = 'catalogData.json') {
    super(container, url);

    this.getProducts(url).then((data) => {
      this.goods = data
      this.render(container, templateCatalog)
    })

  }



}

class templateCatalog {
  constructor(item, img = "https://via.placeholder.com/200x150") {
    this.img = img
    this.title = item.product_name
    this.price = item.price
    this.id_product = item.id_product
  }
  render(){
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.title}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
  }
}

class templateBasket{
  render(){
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity * this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
  }
}

const catalog = new Catalog();