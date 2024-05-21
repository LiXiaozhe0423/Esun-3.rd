<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import type { Parking, ParkingDto } from '../assets/type';

//data
const selectedDistrict = ref<string>('');
const searchQuery = ref<string>('');
//存放資料
const parkings = ref<Parking[]>();
//computed 已被篩選過的資料，如果選定特定行政區就顯示出該行政區即時資料
const filterParkingData = computed<Parking[]>(() => {
  if (parkings.value) {
    let filteredData = parkings.value;

    if (selectedDistrict.value) {
      filteredData = filteredData.filter(element =>
        element.area.includes(selectedDistrict.value)
      );
    }

    if (searchQuery.value.trim) {
      filteredData = filteredData.filter(element =>
        element.area.includes(searchQuery.value)||
        element.name.includes(searchQuery.value) ||
        element.address.includes(searchQuery.value)
      );
    }
    return filteredData;
  } 
  else {
    return [];
  }
});
// 下拉選單selection內的值，各行政區列表
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
    console.log(response.data)
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

onMounted(async () => {
  await fetchParkingData()
});

</script>

<template>
  <div class="container">
    <div class="topic">
      <h2>高雄市即時停車位查詢</h2>
    </div>
    <!-- 下拉選單 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="selection">
          <select v-model="selectedDistrict" class="custom-select">
            <option :value="''">全部區域</option>
            <option v-for="district in districts" :key="district" :value="district">{{ district }}
            </option>
          </select>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <div>
            <input v-model.trim="searchQuery" class="form-control me-2" placeholder="Search">
          </div>
          <div>
            <button class="btn btn-outline-success" @click="fetchParkingData">Search</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col-sm-6" v-if="filterParkingData.length > 0" :key="parking.seq" v-for="parking in filterParkingData">
      <div class="card mb-3">
        <div class="card-body data">
          <h5 class="card-title">行政區：{{ parking.area }}</h5>
          <p class="card-text">臨時停車處所：{{ parking.name }}</p>
          <p class="card-text">可提供小型車停車位：{{ parking.count }}</p>
          <p class="card-text">地址：{{ parking.address }}</p>
        </div>
      </div>
    </div>
    <div v-else class="card-body text-center">
      <h5>該區域目前沒有停車位喔！</h5>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.topic {
  padding: 10px;
}

.custom-select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  text-align: center;
}

.data {
  background-color: #8CBDB9;
}

</style>