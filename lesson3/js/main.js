const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

class ProductList {
  goods;
  allProducts;
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];

    this.getProducts().then((data) => {
      this.goods = data;
      this.render();
      console.log(this.goods)

    })
  }

  getProducts(){
    return  fetch(API+'catalogData.json').then(data => data.json())
  }

  render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);

      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const catalog = new ProductList();


