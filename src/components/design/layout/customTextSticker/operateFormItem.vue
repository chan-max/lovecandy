<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2023-12-16 12:40:25
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2023-12-16 15:16:47
 * @FilePath: /1s/src/components/design/layout/customTextSticker/operateFormItem.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 1s, All Rights Reserved. 
-->
<template>
  <div class="operate-form-item">
    <div class="operate-form-item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="operate-form-item-title">
      <slot name="name"></slot>
    </div>
    <div style="flex: 1"></div>
    <div class="operate-form-item-content">
      <slot name="content"> </slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["name"]);
</script>
<style lang="less">
.operate-form-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.operate-form-item-icon {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  svg {
    width: 14px;
    height: 14px;
  }
}

.operate-form-item-title {
  padding: 0 10px;
  font-size: 12px;
  line-height: normal;
}
</style>
