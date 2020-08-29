'use scrict';

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};

const person = new Cashier('Mary', products);

function Cashier(name, productDatabase) {
  this.name = name,
    this.productDatabase = productDatabase,
    this.customerMoney = 0,
    this.setCustomerMoney = function (value) {
      this.customerMoney = value;
    };

  this.countTotalPrice = function (order) {
    const keys = Object.keys(order);
    let totalPrice = 0;
    for (let key of keys) {
      totalPrice += order[key] * productDatabase[key];
    }
    return totalPrice;
  };

  this.countChange = function (totalPrice) {
    if (this.customerMoney >= totalPrice) {
      return this.customerMoney - totalPrice;
    } else {
      return ;
    }
  };

  this.onSuccess = function (change) {
    console.log(`Спасибо за покупку, ваша сдача ${change}!`);
  };

  this.onError = function () {
    console.log("Очень жаль, вам не хватает денег на покупки");
  };

  this.reset = function () {
    this.customerMoney = 0;
  };
}

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1
};

// Проверяем исходные значения полей
console.log(person.name); // Mary
console.log(person.productDatabase); // ссылка на базу данных продуктов (объект products)
console.log(person.customerMoney); // 0

// Вызываем метод countTotalPrice для подсчета общей суммы
// передавая order - список покупок пользователя
const totalPrice = person.countTotalPrice(order);

// Проверям что посчитали
console.log(totalPrice); // 110

// Вызываем setCustomerMoney для запроса денег покупателя
person.setCustomerMoney(300);

// Проверяем что в поле с деньгами пользователя
console.log(person.customerMoney); // 300

// Вызываем countChange для подсчета сдачи
const change = person.countChange(totalPrice);

// Проверяем что нам вернул countChange
console.log(change); // 190

// Проверяем результат подсчета денег
if (change !== null) {
  // При успешном обслуживании вызываем метод onSuccess
  person.onSuccess(change); // Спасибо за покупку, ваша сдача 190
} else {
  // При неудачном обслуживании вызываем метод onError
  person.onError(); // Очень жаль, вам не хватает денег на покупки
}

// Вызываем reset при любом исходе обслуживания
person.reset();

// Проверяем значения после reset
console.log(person.customerMoney); // 0
