"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalogData = 'catalogData.json';
const getBasket = 'getBasket.json';


class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts(catalogData)
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render();
            });
    }

    _getProducts(catalogData){
        return fetch(`${API}/${catalogData}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}


class BasketItem {
    constructor(product) {
        this.name = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="basket-item" data-id="${this.id}">
                    <div class="basket-info">
                        <h3>${this.name}</h3>
                        <p>${this.price} $</p>
                        <p>${this.quantity} шт.</p>
                        ____________________
                    </div>
                </div>`;
    }
}


class Basket {
    constructor(container='.basket') {
        this.container = container;
        this.goods = [];
        this._getBasket(getBasket)
            .then(data => {
                this.goods = [...data['contents']];
                this.viewBasket();
                this.render();
                this.deleteBasket();
                // this.addBasket();
            });
    }

    _getBasket (getBasket) {
        return fetch(`${API}/${getBasket}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    viewBasket () {
        let clear = document.querySelector('.clear');
        let viewBasket = document.querySelector('.basket');
        viewBasket.setAttribute('hidden', '');

        let basket = document.querySelector('.btn-cart');
        
        basket.addEventListener('click', (event) => {
            // new Basket();
            event.srcElement.disabled = true;
            viewBasket.removeAttribute('hidden');
            if (viewBasket.innerHTML) {
                clear.removeAttribute('hidden');
            } else {
                alert('Корзина пуста');
                basket.removeAttribute('disabled');
            }
        });
                

        let active_cart = document.querySelector('.active_cart');
        active_cart.addEventListener('click', () => {
            basket.removeAttribute('disabled');
            viewBasket.setAttribute('hidden', '');
            clear.setAttribute('hidden', '');
        });
    }

    deleteBasket () {
        let basket = document.querySelector('.basket');
        let clear = document.querySelector('.clear');

        clear.addEventListener('click', () => {
            document.querySelector('.btn-cart').removeAttribute('disabled');
            basket.innerHTML = '';
            clear.setAttribute('hidden', '');
            this.goods = [];
        });
    }
    
    // addBasket () {
    //     let buy = document.querySelectorAll('.buy-btn');
    //     let products = document.querySelectorAll('.basket-item');
    //     let basket = document.querySelector('.basket')

    //     buy.forEach(element => {
    //        element.addEventListener('click', (event) => {
    //            console.log(products);
    //        })
    //     });
    // }

    render() {
        const span = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new BasketItem(product);
            span.insertAdjacentHTML('beforeend', productObj.render());
            }   
        }
    }


let list = new ProductsList();
let basket = new Basket();
