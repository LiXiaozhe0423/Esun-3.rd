<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
const responseData = ref([]);

//資料發查邏輯
async function example() {
  try {
    const response = await axios.get('https://api.kcg.gov.tw/api/service/Get/897e552a-2887-4f6f-a6ee-709f7fbe0ee3');
    const parkingData: parking[] = response.data.data.map((item: any) => ({
      seq: item.seq,
      area: item['行政區'],
      name: item['臨時停車處所'],
      count: item['可提供小型車停車位'],
      address: item['地址']
    }));
    if (selectedDistrict.value != '') {
      const filterdate: parking[] = filterData(parkingData);
      console.log(filterdate);
    }
  } catch (error) {
    console.error('出事了 阿北!!!!!!!!!!!!!!!!!', error);
  }
}

//清單呈現邏輯
const selectedDistrict = ref('');
const districts = ref([
  "前金", "新興", "鹽埕", "左營", "楠梓", "鼓山", "旗津", "苓雅", "三民", "前鎮",
  "小港", "鳳山", "鳥松", "大社", "仁武", "大樹", "岡山", "燕巢", "梓官", "永安",
  "彌陀", "橋頭", "田寮", "茄萣", "阿蓮", "路竹", "湖內", "那瑪夏", "桃源", "茂林",
  "六龜", "美濃", "旗山", "甲仙", "內門", "杉林", "林園", "大寮"
]);


function filterData(parkingData: parking[]) {
  return parkingData.filter(item =>
    item.area.includes(selectedDistrict.value)
  );

}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">高雄市公有停車資訊</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <select class="form-select" v-model="selectedDistrict">
              <option value="" disabled selected>請選擇區域</option>
              <option v-for="(district, index) in districts" :key="index" :value="district">{{ district }}</option>
            </select>
          </li>
        </ul>
        <div>
          <input class="form-control me-2" placeholder="Search">
        </div>
        <div>
          <button class="btn btn-outline-success" @click="example()">Search</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>