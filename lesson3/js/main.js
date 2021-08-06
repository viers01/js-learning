const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

class List {
  constructor(container, url) {
    this.container = container;
    this.goods = [];
    this.renderProducts = [];
    this.url = url;
  }

  getJson(url) {
    return  fetch(API + url).then(data => data.json() )
  };

  render(container, templateName){
    const block = document.querySelector(container)
    for (let item of this.goods) {
      let newItem = new templateName(item)
      this.renderProducts.push(newItem)
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
    this.getJson(url).then((data) => {
      this.goods = data
      this.render(container, templateCatalog)
    })

    this.handleBtn()
  }

  handleBtn(){
    document.querySelector(this.container).addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-btn')){
           basket.changeItem(e.target)
        }
    })
  }
}

class Basket extends List{
  constructor(container = '.basket', url = 'getBasket.json') {
    super(container, url);

    this.getJson(url).then((data)=> {
      this.goods = data.contents
      this.render(container, templateBasket)
    })

    this.handleBtn()
  }

  changeItem(catalogItem){
      if (this.getJson('addToBasket.json').then(data => data.result === 1)){
        let findItem = this.renderProducts.find(item => item.id_product === +catalogItem.dataset.id)
          if (findItem) {
            findItem.quantity++
            this.updateItemInBasket(findItem)
          } else {
            let newItem = {
              id_product: +catalogItem.dataset['id'],
              price: +catalogItem.dataset['price'],
              product_name: catalogItem.dataset['name'],
              quantity: 1
            }
            this.goods = [newItem]
            this.render('.basket', templateBasket)

        }
      }
    }

    deleteItem(id){
      if (this.getJson('deleteFromBasket.json').then(data => data.result === 1)){
        let findItem = this.renderProducts.find(item => item.id_product === id)
        if (findItem.quantity>1){
          findItem.quantity--
          this.updateItemInBasket(findItem)
        }
        else {
          this.renderProducts.splice(this.renderProducts.indexOf(findItem),1)
          document.querySelector(`.cart-item[data-id="${findItem.id_product}"]`).remove()
        }
      }
    }

    updateItemInBasket(item){
      let updateItem = document.querySelector(`.cart-item[data-id="${item.id_product}"]`)
      updateItem.querySelector('.product-price').textContent = `${item.price}₽`
      updateItem.querySelector('.product-quantity').textContent = `Количество: ${item.quantity}`
      updateItem.querySelector('.product-price').textContent = `Стоимость: ${item.quantity*item.price}₽`
    }

    handleBtn(){
      document.querySelector(this.container).addEventListener('click', (e) => {
        if (e.target.classList.contains('del-btn')){
          basket.deleteItem(+e.target.dataset.id)
        }
      })

      document.querySelector('.btn-cart').addEventListener('click', (e) => {
        document.querySelector(this.container).classList.toggle('invisible')
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
  constructor(item, img = 'https://via.placeholder.com/50x50') {
    this.img = img
    this.title = item.product_name
    this.price = item.price
    this.id_product = item.id_product
    this.quantity = item.quantity
  }
  render(){
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.title}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">Стоимость: ${this.quantity * this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
  }
}

const catalog = new Catalog();
const basket = new Basket();