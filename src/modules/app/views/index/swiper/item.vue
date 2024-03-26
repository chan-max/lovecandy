<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2024-01-18 19:22:11
 * @LastEditors: chan-max 2651308363@qq.com
 * @LastEditTime: 2024-02-13 23:40:48
 * @FilePath: /yishe/src/modules/app/views/index/swiper/item.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 1s, All Rights Reserved. 
-->
<template>
  <div class="item">
    {{ data }}
    <div v-if="loading" class="progress">
      <ion-progress-bar type="indeterminate"></ion-progress-bar>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, onMounted, watch, onUnmounted } from "vue";

const props = defineProps(["data","index"]);

const loading = ref(true);

</script>
<style>
/* 用于设置固定高度的评论弹层 */
ion-modal {
  --height: auto;
}
</style>
<style lang="less" scoped>
.item {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.image {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}

::v-deep {
  .image img {
    width: 100%;
    height: 100%;
  }
}

.viewer {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: #333;
}

.viewer-background {
  background: radial-gradient(circle, rgba(233, 233, 233, 1) 50%, rgba(255, 255, 255, 1) 100%);
}

.viewer-background-dark {
  background: radial-gradient(circle, rgba(20, 20, 20, 1) 50%, rgba(0, 0, 0, 1) 100%);
}

.menu-bottom {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  z-index: 2;
  align-items: center;
  padding: 4px;
}

.progress {
  position: absolute;
  bottom: 0;
  z-index: 13;
  width: 100%;
}

ion-progress-bar {
  --background: rgba(0, 0, 0, 0);
  --progress-background: #ff3351;
}

.menu-right {
  width: 60px;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  justify-content: space-between;
  padding: 20px 0;
  z-index: 2;
}

.menu-item {
  color: #fff;
}

.icon {
  width: 30px;
  height: 30px;
  transition: all 0.3s;
  /* 为图标增加阴影效果 */
  filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.2));

  &:active {
    transform: scale(0.8);
  }
}

.text {
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
}

.menu-top {
  position: absolute;
  width: 100%;
  height: auto;
  top: 0;
  text-align: left;
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 10px;
  z-index: 3;
}

.avatar-border {
  border-radius: 50%;
  position: relative;
  background-clip: padding-box;
  /*important*/
}

.avatar-border::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
  margin: 1px;
  /* 为负值时可显示边框 */
  border-radius: inherit;
  /*important*/
  background: linear-gradient(to right, #ff3351, purple);
}

.follow-button {
  font-size: 14px;
  font-weight: bold;
  background: transparent;
  padding: 10px;
  border-radius: 6px;
}
</style>