<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import DataView from '../components/DataView.vue'

</script>

<template>
  <div class="container">
    <Navbar />
    <div class="content">
      <div class="left">
        <h2>Parking 動態停車查詢服務</h2>
        <p>查詢即時停車位，找車位很easy!</p>
        <button type="button" class="btn btn-primary">Get started</button>
      </div>
      <div class="right">
        <img src="../assets/car.jpg" alt="">
      </div>
    </div>
    <!-- 先做出下方下拉選單渲染 TODO 想要把這邊變成點擊按鈕後可以跳轉到dataview頁面但還沒成功-->
    <DataView/>
  </div>
</template>

<style>
.container {
  padding-top: 30px;
  max-width: 1100px;
  background-color: white;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.left {
  padding-right: 20px;
}

.right img {
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: 10px;
}
</style>
