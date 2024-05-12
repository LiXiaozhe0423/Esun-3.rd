<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
const responseData = ref([]);

async function example() {
  console.log('AAAAAAAAAAAAAAAAAAAAA')
  try {
    const response = await axios.get('https://api.kcg.gov.tw/api/service/Get/897e552a-2887-4f6f-a6ee-709f7fbe0ee3');
    console.log(response.data);
    responseData.value = response.data;
  } catch (error) {
    console.error('出事了 阿北!!!!!!!!!!!!!!!!!', error);
  }
}
</script>

<template>
  <div>
    <button @click="example">戳我</button>
    <div>
      <ul>
        <li>顯示清單</li>
        <li v-for="item in responseData">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
