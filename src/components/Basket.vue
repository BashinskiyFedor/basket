<template>
  <div class="container">
    <div class="dollar-rate">
      <label>Курс доллара</label>
      <input v-model="dollarExchangeRate" type="number" min="20.00" max="80.00" step="0.2" />
    </div>
    
    <div v-for="group in goods.items" :key="group.id" class="group">
      <div class="group-name">
        <p>{{ group.group.name }}</p>
      </div>
      <div class="group-values">
        <div v-for="value in group.values" class="group-value">
          <p>{{ value.name + ` (${value.P})`}}</p>
          <button class="add-item" v-if="!basket[value.P]" @click="addItem(value)">В корзину</button>
          <add @add="addItem(value)" @remove="remove(value)" :count="basket[value.P].count" v-else></add>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <table>
      <thead>
          <tr>
              <th class="name">Наименование товара и описание</th>
              <th class="amount">Колличество</th>
              <th class="price">Цена</th>
              <th class="action"></th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="product in basket" :class="product.color">
              <td>{{product.name}}</td>
              <td><input v-model="product.count" type="number" min="1"/></td>
              <td><price :dollar="dollarExchangeRate" :price="Number(product.C)"/> руб./шт.</td>
              <td><button class="delete" @click="deleteFromBasket(product)">Удалить</button></td>
          </tr>
      </tbody>
      <tfoot>
            <tr>
              <td colspan="4" class="total-cost">
                <div class="cost-wpap">Общая стоимость: <span class="cost">{{totalPriceRub}}</span></div>
              </td>
          </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import transform from './dataTransform'
import Add from './Add.vue'
import Price from './Price.vue'

const VITE_DATA_JSON_URL = import.meta.env.VITE_DATA_JSON_URL; // поменять хост на свой

let basket = reactive({});
let goods = reactive({ items: [] });
let dollarExchangeRate = ref(20);

const remove = function (item) {
  if (basket[item.P]) {
    basket[item.P].count = basket[item.P].count - 1
    if (basket[item.P].count === 0) {
      deleteFromBasket(item)
    }
  }
}

const addItem = function (item) {
  if (basket[item.P]) {
    basket[item.P].count++
  } else {
    basket[item.P] = { ...item, count: 1 }
  }
}

const deleteFromBasket = function (item) {
  delete basket[item.P]
}

const totalPriceRub = computed({
  get() {
    let result = 0;
    for (let key of Object.keys(basket)) {
      result = parseFloat(result + (Number(basket[key].count) * Number(basket[key].C) * Number(dollarExchangeRate.value)));
      result = parseFloat((result).toFixed(2), 10)
    }
    return result 
  }
});

const startTimer = () => {
  setInterval(() => {
    getGoods()
  }, 15 * 1000)
}

const getGoods = async () => {
    fetch(VITE_DATA_JSON_URL)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        goods.items = transform(response.Value.Goods)

        for (let key of Object.keys(basket)) {
          console.log(key);
          let good = response.Value.Goods.find((item) => item.P === Number(key));
          if (good) {
            basket[key] = { name: basket[key].name, count: basket[key].count, ...good, color: basket[key].C > good.C ? "green" : basket[key].C < good.C ? "red" : "" }
          }
        }
      })
}

const stopTimer = () => {
  clearTimeout(this.timer)
}

onMounted( async () => {
  getGoods()
  startTimer()
})

</script>

<style scoped>
.read-the-docs {
  color: #888;
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 100px;
}

.group-name {
  background-color: rgb(206, 215, 147);
  color: black;
  border-top: 1px solid rgb(27, 27, 27);
  border-right: 1px solid rgb(27, 27, 27);
  border-left: 1px solid rgb(27, 27, 27);
}

.group-values {
  background-color: rgb(104, 147, 138);
  color: black;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  width: 100%;
  outline: 1px solid black;
  outline-offset: -1px;
}

.group-value {
  width: calc(50% - 1px);
  border-right: 1px solid rgb(27, 27, 27);
  border-bottom: 1px solid rgb(27, 27, 27);
}

.group {
  margin-bottom: 20px;
  width: 700px;
}

p {
  padding: 5px;
}

table {
  background-color: rgb(104, 147, 138);
  border: 1px solid rgb(27, 27, 27);
}

table,
td {
    border: 1px solid #333;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
}

.delete {
  color: white;
  background-color: rgb(243, 74, 74);
}

.action, .price, .amount {
  width: 20%;
}


.name {
  width: 40%;
}

.add-item {
  color: white;
  background-color: rgb(66, 88, 86);
  padding: 4px;
}

.total-cost {
  
}
.cost-wpap {
  margin-right: auto;
  font-size: 20px;
  text-align: right;
}

.cost {
  font-size: 24px;
  color: rgb(243, 156, 74);
}

.green {
  background-color: #195123;
}


.red {
  background-color: #72251c;
}
</style>
