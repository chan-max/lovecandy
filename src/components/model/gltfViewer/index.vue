<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2024-01-03 19:46:44
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2024-01-28 08:54:22
 * @FilePath: /1s/src/components/model/gltfViewer/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 1s, All Rights Reserved. 
-->
<template>
  <div
    @touchmove="touchmove"
    class="gltf-viewer"
    ref="gltfViewer"
    @touchstart="stopAnimate"
    @touchend="startAnimate"
  >
    <div class="gltf-viewer-loading" v-if="loading">...</div>
  </div>
</template>
<script setup>
import {
  defineProps,
  ref,
  onMounted,
  render,
  watch,
  nextTick,
  shallowRef,
  defineEmits,
  defineExpose,
} from "vue";
import { useViewer } from "./index.ts";

const gltfViewer = ref();

const props = defineProps({
  // 模型信息
  model: {},
  transparent: {
    default: false,
  },
});

const emits = defineEmits([
  "screenshot", // 触发截屏
  "loaded", // 模型完全加载完成 , 包括基础模型和贴纸
  "beforeLoad",// 开始加载前
  "dragStart"
]);

function touchmove(e) {
  e.preventDefault();
}

const {
  gltfViewerRef,
  loading,
  startAnimate,
  stopAnimate,
  controller,
  getScreenshot
} = useViewer(gltfViewer, props, emits);

defineExpose({
  controller,
  getScreenshot
});
</script>
<style lang="less">
.gltf-viewer {
  background: transparent;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gltf-viewer-loading {
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
}
</style>
