Vue.component('cart', {
    props:['visibility', 'cart'],
    template:`<div class="cart" v-show="visibility" >
            <p v-if="cart.length === 0">Ваша корзина пуста</p>
            <cartItem  v-for="product of this.cart" :product="product" :key="product.product_name"></cartItem>
        </div>`
})
Vue.component('cartItem',{
    props:['product'],
    template: `<div class="cart-box" v-else>
                <div class="card mb-3" style="max-width: 540px;" >
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="http://placehold.it/50x100" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{product.product_name}}</h5>
                                <p class="card-text">{{product.quantity}} шт.</p>
                                <p class="card-text"><small class="text-muted">Цена:{{product.price * product.quantity}}</small></p>
                                <button type="button" class="btn btn-primary cart-btn" @click="$parent.$emit('remove', product)">X</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
})

Vue.component('filter-el',{
    data: function () {
        return {
        search:'',
        }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$emit('searcharr')">
                    <input type="text" class="search-field" v-model="search">
                    <button class="btn-search" type="submit">
                        найти
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
    }
)