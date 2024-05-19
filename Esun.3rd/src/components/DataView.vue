<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import {Parking, ParkingDto} from '../assets/type';

//data
const selectedDistrict = ref<string>('');
//存放資料
const parkings = ref<Parking[]>();
//computed 已被篩選過的資料，如果選定特定行政區就顯示出該行政區即時資料
const filterParkingData = computed<Parking[]>(()=>{
  if (parkings.value) {
    return selectedDistrict.value
      ? parkings.value.filter(element => 
      element.area.includes(selectedDistrict.value))
      : parkings.value;
  } else {
    return [];
  } 
});
// 下拉選單selection內的值，個行政區列表
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

onMounted(async ()=>{
  await fetchParkingData()
});
  

</script>

<template>
  <div class="container">
    <div class="topic">
      <h1>高雄市即時停車位查詢</h1>
    </div>
    <!-- 下拉選單 -->
    <div class="selection">
      <p>請選擇行政區</p>
      <select v-model="selectedDistrict">
        <option :value="''">全部區域</option>
        <option v-for="district in districts" :key="district" :value="district" >{{ district }}</option>
      </select>
    </div>
    <div v-if="filterParkingData.length>0"  :key="parking.seq" v-for="parking in filterParkingData" class="info">
      <p>行政區：{{ parking.area }}</p>
      <p>臨時停車處所：{{ parking.name }}</p>
      <p>可提供小型車停車位：{{ parking.count }}</p>
      <p>地址：{{ parking.address }}</p>
    </div>
    <div v-else>
      <p>該區域目前沒有停車位</p>
    </div>
  </div>
</template>

<style scoped>
.topic{
  background-color:#F2CB05 ;
  text-align: center;
}
.selection {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color:#BF9004 ;
}
.info {
  background-color: #F2B705;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
}
</style>