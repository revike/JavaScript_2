const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);

// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. 
// Продумайте, какие методы понадобятся для работы с этими сущностями.


// класс корзины
class Card {
    constructor() {
        
    }

    // добавление товара в козину
    cardAddItem() {

    }

    // подсчет суммы корзины
    cardTotal() {

    }    

    // изменение количества товаров в корзине
    cardEdit() {

    }

    // удаление товаров из корзины
    cardDelete() {

    }    

}


class CardItem {
    constructor() {
        
    }

    // создание html страницы корзины
    cardRender() {

    }
    
}



// 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.

class GoodsList {
    constructor(products) {
        this.products  = products;
    }

    totalGoods() {
        let result = 0;
        this.products.forEach(element => {
            result += element.price;
        });
        return result;
    }
}


res = new GoodsList(products).totalGoods();
console.log(`result - ${res}`);



// 3* Некая сеть фастфуда предлагает несколько видов гамбургеров:

// Маленький (50 рублей, 20 калорий).
// Большой (100 рублей, 40 калорий).
// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// С сыром (+10 рублей, +20 калорий).
// С салатом (+20 рублей, +5 калорий).
// С картофелем (+15 рублей, +10 калорий).
// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий)
//  и полить майонезом (+20 рублей, +5 калорий). 
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.



class Hamburger {
    constructor(size, topping) {
        this.size = size;
        this.topping = topping;

        this.hamburger = {
            'size': this.size,
            'topping': this.topping,
            'price': 0,
            'calories': 0
        }
    }

    addTopping(topping=[]) {
        // Добавить добавку
        if (topping) {
            topping.forEach(element => {
                this.hamburger.topping.push(element);
            });
            return this.hamburger;
        }
        return this.hamburger;
    }

    removeTopping(topping) {
        // Убрать добавку
        let toppings = this.hamburger.topping;
         topping.forEach(element => {
            let indexElement = toppings.indexOf(element);
            toppings.splice(indexElement, 1);
         });
         return this.hamburger;
        }

    getToppings() {
        // Получить список добавок
        return this.hamburger.topping;
        }

    getSize() {
        // Узнать размер гамбургера
        return this.hamburger.size;
    }

    editSize() {
        // Изменить размер бургера
        if (this.hamburger.size == 'small') {
            return this.hamburger.size = 'big';
        }
        return this.hamburger.size = 'small';
    }

    calculatePrice() {
        // Узнать цену
        let prices = {
            'small': 50,
            'big': 100,
            'cheese': 10,
            'salad': 20,
            'potatoes': 15,
            'seasoning': 15,
            'mayonnaise': 20
        }

        this.hamburger.price = 0;

        if (this.hamburger.size == 'big') {
            this.hamburger.price += prices.big;
        } else if (this.hamburger.size == 'small') {
            this.hamburger.price += prices.small;
        }

        this.hamburger.topping.forEach(element => {
            if (element == Object.keys(prices)[Object.keys(prices).indexOf(element)]) {
                this.hamburger.price += prices[element];
            } 
        });
        return this.hamburger.price;
    }

    calculateCalories() {
        // Узнать калорийность
        let calories_item = {
            'small': 20,
            'big': 40,
            'cheese': 20,
            'salad': 5,
            'potatoes': 10,
            'seasoning': 0,
            'mayonnaise': 5
        }

        this.hamburger.calories = 0;

        if (this.hamburger.size == 'big') {
            this.hamburger.calories += calories_item.big;
        } else if (this.hamburger.size == 'small') {
            this.hamburger.calories += calories_item.small;
        }

        this.hamburger.topping.forEach(element => {
            if (element == Object.keys(calories_item)[Object.keys(calories_item).indexOf(element)]) {
                this.hamburger.calories += calories_item[element];
            } 
        });
        return this.hamburger.calories;
    }

  }




let toppings = ['cheese', 'salad', 'potatoes', 'seasoning', 'mayonnaise'];
let size = ['big', 'small'];

// заказываем маленький бургер с сыром
let burger = new Hamburger('small', ['cheese']);

// добавляем майонез и приправу
burger.addTopping(['seasoning', 'mayonnaise']);

// удаляем майонез
burger.removeTopping(['mayonnaise'])

// получаем список добавок в бургере
console.log(`список добавок: ${burger.getToppings().join(', ')}`)

// получаем размер бургера
console.log(`Размер бургера: ${burger.getSize()}`)

// узнаем цену бургера
console.log(`Цена бургера: ${burger.calculatePrice()} руб`)

// узнаем калорийность бургера
console.log(`Калорий в бургере: ${burger.calculateCalories()}`)

//меняем размер бургера
burger.editSize()
console.log(`Поменяли размер на ${burger.getSize()}`)

// узнаем цену бургера
console.log(`Цена бургера: ${burger.calculatePrice()} руб`)

// узнаем калорийность бургера
console.log(`Калорий в бургере: ${burger.calculateCalories()}`)


// получаем размер бургера
console.log(`Размер бургера: ${burger.getSize()}`)

//меняем размер бургера
burger.editSize()
console.log(`Поменяли размер на ${burger.getSize()}`)

// узнаем калорийность бургера
console.log(`Калорий в бургере: ${burger.calculateCalories()}`)

// узнаем цену бургера
console.log(`Цена бургера: ${burger.calculatePrice()} руб`)

// добавляем майонез и приправу
burger.addTopping(['seasoning', 'mayonnaise', 'salad']);

// получаем список добавок в бургере
console.log(`список добавок: ${burger.getToppings().join(', ')}`)

// узнаем калорийность бургера
console.log(`Калорий в бургере: ${burger.calculateCalories()}`)

// узнаем цену бургера
console.log(`Цена бургера: ${burger.calculatePrice()} руб`)

//меняем размер бургера
burger.editSize()
console.log(`Поменяли размер на ${burger.getSize()}`)

// узнаем цену бургера
console.log(`Цена бургера: ${burger.calculatePrice()} руб`)