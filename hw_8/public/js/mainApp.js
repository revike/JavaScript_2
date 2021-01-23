(()=>{"use strict";Vue.component("cart",{data:()=>({cartUrl:"/getBasket.json",cartItems:[],showCart:!1}),mounted(){this.$parent.getJson("/api/cart").then((t=>{for(let e of t.contents)e.img=`img/${e.id_product}.jpg`,this.$data.cartItems.push(e)}))},methods:{addProduct(t){let e=this.cartItems.find((e=>e.id_product===t.id_product));if(e)this.$parent.putJson(`/api/cart/${e.id_product}`,{quantity:1}).then((t=>{1===t.result&&e.quantity++}));else{const e=Object.assign({quantity:1},t);this.$parent.postJson("/api/cart",e).then((t=>{1===t.result&&this.cartItems.push(e)}))}},remove(t){this.$parent.getJson("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json").then((e=>{1===e.result&&(t.quantity>1?t.quantity--:this.cartItems.splice(this.cartItems.indexOf(t),1))}))}},template:'<div>\n<button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>\n        <div class="cart-block" v-show="showCart">\n            <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img" :cart-item="item" @remove="remove">\n            </cart-item>\n        </div>\n        </div>\n    '}),Vue.component("cart-item",{props:["img","cartItem"],template:'\n    <div class="cart-item">\n                    <div class="product-bio">\n                        <img :src="img" alt="Some img">\n                        <div class="product-desc">\n                            <div class="product-title">{{ cartItem.product_name }}</div>\n                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>\n                            <div class="product-single-price">$ {{ cartItem.price }} each</div>\n                        </div>\n                    </div>\n                    <div class="right-block">\n                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>\n                        <button class="del-btn" @click="$emit(\'remove\', cartItem)">&times;</button>\n                    </div>\n                </div>\n    '}),Vue.component("products",{data:()=>({catalogUrl:"/catalogData.json",filtered:[],products:[]}),mounted(){this.$parent.getJson("/api/products").then((t=>{for(let e of t)e.img=`img/${e.id_product}.jpg`,this.$data.products.push(e),this.$data.filtered.push(e)}))},methods:{filter(t){let e=new RegExp(t,"i");this.filtered=this.products.filter((t=>e.test(t.product_name)))}},template:'<div class="products">\n                <product v-for="item of filtered" \n                :key="item.id_product" \n                :img="item.img"\n                :product="item"\n                @add-product="$parent.$refs.cart.addProduct"></product>\n               </div>'}),Vue.component("product",{props:["product","img"],template:'\n            <div class="product-item">\n                <img :src="img" alt="Some img">\n                <div class="desc">\n                    <h3>{{product.product_name}}</h3>\n                    <p>{{product.price}}</p>\n                    <button class="buy-btn" @click="$emit(\'add-product\', product)">Купить</button>\n                </div>\n            </div>\n    '}),Vue.component("filter-el",{data:()=>({userSearch:""}),template:'<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">\n                <input type="text" class="search-field" v-model="userSearch">\n                <button type="submit" class="btn-search">\n                    <i class="fas fa-search"></i>\n                </button>\n            </form>'}),Vue.component("error",{data:()=>({text:""}),computed:{isVisible(){return""!==this.text}},template:'\n    <div class="error-block" v-if="isVisible">\n        <p class="error-msg">\n        <button class="close-btn" @click="text=\'\'">&times;</button>\n        {{ text }}\n</p>\n</div>\n    '});const t=new Vue({el:"#app",data:{userSearch:""},methods:{getJson(t){return fetch(t).then((t=>t.json())).catch((t=>{this.$refs.error.text=t}))},postJson(t,e){return fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((t=>t.json())).catch((t=>{this.$refs.error.text=t}))},putJson(t,e){return fetch(t,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((t=>t.json())).catch((t=>{this.$refs.error.text=t}))}},mounted(){}});new Vue(t)})();