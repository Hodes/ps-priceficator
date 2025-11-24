<script setup>
const props = defineProps({
    maxWidth: {
        type: String,
        default: '400px'
    },
});
</script>

<template>
  <div class="card" :style="{ maxWidth: props.maxWidth }">
    <div class="card2">
        <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* From Uiverse.io by Tiagoadag */ 
.card {
 background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
 border-radius: 20px;
 box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
 padding: 2px;
}

.card2 {
 width: 100%;
 height: 100%;
 background-color: #1a1a1a;
 border-radius: 20px;
}

</style>