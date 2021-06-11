var app1 = new Vue({
    el: '#app',
    data: {
        goods: [
            {
                id_product: 1,
                product_name: "Ноутбук",
                price: 45600,
                quantity: 1,
            },
            {
                id_product: 2,
                product_name: "Клавиатура",
                price: 4442,
                quantity: 1,
            },
            {
                id_product: 3,
                product_name: "Кресло",
                price: 2224,
                quantity: 1,
            },
            {
                id_product: 4,
                product_name: "Телефон",
                price: 1000,
                quantity: 1,
            },
            {
                id_product: 5,
                product_name: "Мышка",
                price: 1123,
                quantity: 1,
            }
        ],
        filtered:[],
        cart:[],
        show:true,
        searchTitle:'',

    },
    methods:{
        addProduct(idProduct){
            for (let product of this.filtered) {
                if (idProduct === product.id_product) {
                    if (this.find(idProduct)){
                        console.log('я нашел такой товар и увеличил кол-во')
                        product.quantity++

                    } else {
                        console.log('я не нашел, но добавил его')
                        this.cart.push(product)
                    }
                }
            }
        },
        find(id){
            return this.cart.find((product)=> product.id_product === id)
        },
        searchArr() {
            let regExp = new RegExp(this.searchTitle, 'i')
            this.filtered = this.goods.filter(product => regExp.test(product.product_name))

        }
    },
    created() {
        this.searchArr()
    }
})