class ProductList {
    constructor(container = '.products') {
        this.goods = [
            { id: 1, title: 'Notebook', price: 99 },
            { id: 2, title: 'TV', price: 2399 }, { id: 3, title: 'Phone', price: 599 },
            { id: 4, title: 'Notebook', price: 300 },
        ]
        let box = [];
        this.summ = 0;
    }

    summGoods() {
        const summBlock = document.querySelector('.summ')

        for (const product of this.goods) {
            this.summ += product.price
        }

        summBlock.innerHTML = `Итог:${this.summ}`
    }

    render() {
        const block = document.querySelector('.products')
        for (const product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }



    }
}

class ProductItem {
    constructor(product, img = "http://placehold.it/350x350") {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `
        <div data-id="${this.id}">
        <img src="${this.img}">
        <h3>Категория: ${this.title}</h3>
        <h3>Цена: ${this.price}</h3>
        </div>
      `
    }
}
let list = new ProductList;
list.render()
list.summGoods()