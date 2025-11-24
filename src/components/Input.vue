<script setup>

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    }
});

let inputValue = defineModel();
</script>
<template>
    <!-- From Uiverse.io by Smit-Prajapati -->
        <div class="container">
        <div class="search-container">
        <input class="input" :type="type" v-model="inputValue" :placeholder="placeholder" />
        <div class="search__icon" v-if="icon">
            <span :class="icon"></span>
        </div>
        </div>
        </div>
</template>

<style scoped>
/* From Uiverse.io by Smit-Prajapati */
.container {
    position: relative;
    border-radius: 1000px;
    padding: 5px;
    display: grid;
    place-content: center;
    z-index: 0;
    margin: unset;
}

.search-container {
    position: relative;
    width: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    padding: 5px;
    display: flex;
    align-items: center;
}

.search-container::after,
.search-container::before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: inherit;
    position: absolute;
}

.search-container::before {
    top: -1px;
    left: -1px;
    background: linear-gradient(0deg, rgb(218, 232, 247) 0%, rgb(255, 255, 255) 100%);
    z-index: -1;
}

.search-container::after {
    bottom: -1px;
    right: -1px;
    background: linear-gradient(0deg, rgb(163, 206, 255) 0%, rgb(211, 232, 255) 100%);
    box-shadow: rgba(79, 156, 232, 0.7019607843) 3px 3px 5px 0px, rgba(79, 156, 232, 0.7019607843) 5px 5px 20px 0px;
    z-index: -2;
}

.input {
    padding: 5px;
    width: 100%;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    border: none;
    color: rgb(0 107 179);
    font-size: 15px!important;
    font-weight: bold;
    border-radius: 50px;
    padding-left: 20px!important;
}

.input:focus {
    outline: none;
    background: linear-gradient(135deg, rgb(239, 247, 255) 0%, rgb(214, 229, 247) 100%);
}

.search__icon {
    border-radius: 50%;
    margin-right: 15px;
    font-size: 16px;
    color: rgb(0 107 179);
}

.search__icon path {
    fill: rgb(0 107 179);
}
</style>
