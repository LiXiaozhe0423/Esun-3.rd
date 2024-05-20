<script setup lang="ts">


</script>

<template>
  <div class="container">
    <div class="content">
      <div class="left">
        <h2>Parking 動態停車查詢服務</h2>
        <p>查詢即時停車位，找車位很easy!</p>
        <RouterLink to="/showData">
          <button type="button" class="btn btn-primary">Get started</button>
        </RouterLink>
      </div>
      <div class="right">
        <img src="../assets/car.jpg" alt="">
      </div>
    </div>

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
