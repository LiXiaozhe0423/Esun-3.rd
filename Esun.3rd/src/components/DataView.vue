<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import {Parking, ParkingDto} from '../assets/type';

//data
const selectedDistrict = ref<string|undefined>('');
//存放資料
const parkings = ref<Parking[]|undefined>();
//computed 已被篩選過的資料，如果沒篩選就顯示出所有即時資料
const filterParkingData = computed<Parking[]>(()=>{
  if (parkings.value) {
    return selectedDistrict.value
      ? parkings.value.filter(parking => parking.area.includes(selectedDistrict.value!))
      : parkings.value;
  } else {
    return [];
  } 
});
// 下拉選單內的值
const districts = [
  "前金", "新興", "鹽埕", "左營", "楠梓", "鼓山", "旗津", "苓雅", "三民", "前鎮",
  "小港", "鳳山", "鳥松", "大社", "仁武", "大樹", "岡山", "燕巢", "梓官", "永安",
  "彌陀", "橋頭", "田寮", "茄萣", "阿蓮", "路竹", "湖內", "那瑪夏", "桃源", "茂林",
  "六龜", "美濃", "旗山", "甲仙", "內門", "杉林", "林園", "大寮"
];
//資料發查
async function fetchParkingData() {
  try {
    const response = await axios.get('https://api.kcg.gov.tw/api/service/Get/897e552a-2887-4f6f-a6ee-709f7fbe0ee3');
    parkings.value = response.data.data.map((item: ParkingDto) => ({
      seq: item.seq,
      area: item.行政區,
      name: item.臨時停車處所,
      count: item.可提供小型車停車位,
      address: item.地址
    }));

  } catch (error) {
    console.error('出事了 阿北!!!!!!!!!!!!!!!!!', error);
  }
}

onMounted(async ()=>{await fetchParkingData()});
  

</script>

<template>
  <div>
    <!-- 下拉選單 -->
    <div class="selection">
      <p>請選擇區域</p>
      <select v-model="selectedDistrict">
        <option :value="undefined">全部區域</option>
        <option v-for="district in districts" :key="district" :value="district" >{{ district }}</option>
      </select>
    </div>
    <div :key="parking.seq" v-for="parking in filterParkingData" >
      <p>行政區：{{ parking.area }}</p>
      <p>臨時停車處所：{{ parking.name }}</p>
      <p>可提供小型車停車位：{{ parking.count }}</p>
      <p>地址：{{ parking.address }}</p>
    </div>
  </div>
</template>

<style scoped>
.selection {
  display: flex;
  flex-direction: row;
  justify-content: center;


}
</style>