
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
var app1 = new Vue({
    el: '#app',
    data: {
        getjson (url) {
            return fetch(API+url).then(data => data.json())
        },
        goods: [],
        filtered: [],
        cart:[],
        show:true,
        searchTitle:'',
    },
    methods:{
        addProduct(Product){
            let find = this.cart.find(el => el.id_product === Product.id_product);
                if (find){
                    find.quantity++
                } else {
                    let newItem = Object.assign({quantity:1}, Product);
                    this.cart.push(newItem)
                }
        },
        removeProduct(cartInItem){
            if (cartInItem.quantity>1){
                cartInItem.quantity--
            } else {
                this.cart.splice(this.cart.indexOf(cartInItem),1)
            }
        },
        searchArr() {
            let regExp = new RegExp(this.searchTitle, 'i')
            this.filtered = this.goods.filter(el => regExp.test(el.product_name));
        }
    },
    mounted(){
        this.getjson('getBasket.json')
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            });
        this.getjson('catalogData.json').then(data => this.goods = data).then(this.searchArr)
    },
    created() {

    }
})