<script setup>
const props = defineProps({
    text: {
        type: String,
        default: ''
  },
    icon: {
        type: String,
        default: 'fa-solid fa-circle-right'
  },
  color: {
    type: String,
    default: 'rgb(0 107 179)'
  }
});
</script>

<template>
    <!-- From Uiverse.io by satyamchaudharydev -->
<button class="button" :class="{'icon-only': props.icon && !props.text}" :style="{ backgroundColor: props.color }">
    {{ props.text }}
    <div v-if="props.icon" class="icon">
        <span :class="props.icon"></span>
    </div>
</button>

</template>

<style scoped>
/* From Uiverse.io by satyamchaudharydev */
.button {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(0 107 179);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
  font-size: 24px;
  transition: all 0.3s ease-in-out;
}

.icon-only {
  padding-inline: 0.75rem;
}
.icon-only .icon {
  margin-left: -5px;
}

.button:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.button:hover .icon {
  transform: translate(4px);
}
.button:hover.icon-only .icon {
  transform: none;
}

.button:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.button::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}
</style>
