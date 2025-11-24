<script setup lang="ts">
import PSPlusLogo from './PSPlusLogo.vue';
const props = defineProps({
  total: {
    type: Number,
    required: true
  }
});

</script>

<template>
    <div class="total-banner-container">
    <div class="total-banner-content">
      <span class="amount">{{ props.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
    </div>
    <div class="deco-left">
      <PSPlusLogo width="32"/>
    </div>
    <div class="deco-right">$</div>
  </div>
</template>

<style scoped>

.total-banner-container {
    position: relative;
    margin-top: -25px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* O fundo escuro e a moldura dourada */
.total-banner-content {
    /* Fundo desfoque */
    /* background: rgba(20, 20, 20, 0.6); */
    backdrop-filter: blur(8px);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 9999px;

    /* Usamos bordas sólidas + sombras internas (inset) para dar profundidade 3D */
    border-top: 2px solid #b88a44;
    border-bottom: 2px solid #b88a44;
    box-shadow:
        inset 0 5px 8px -3px rgba(255, 223, 93, 0.5), /* Brilho interno superior */
        inset 0 -5px 8px -3px rgba(255, 223, 93, 0.5),/* Brilho interno inferior */
        0 10px 15px -5px rgba(0,0,0,0.8); /* Sombra externa para destacar do fundo */
    z-index: 2; /* Garante que fica acima dos elementos decorativos */
}

.total-banner-content .label {
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    color: #e6c88a; /* Cor base dourada fosca */
    letter-spacing: 1px;
}

.total-banner-content .amount {
    font-size: 22px;
    font-weight: 700;
    color: #f0c25f; /* Cor base dourada mais vibrante */

    /* O TRUQUE DO TEXTO BRILHANTE: */
    text-shadow:
        0 0 5px rgba(250, 87, 87, 0.8), /* Brilho intenso central */
        0 0 15px rgba(255, 0, 0, 0.6), /* Brilho difuso ao redor */
        2px 2px 2px rgba(0,0,0,0.8); /* Sombra dura para definição 3D */
}


/* --- Elementos Decorativos Laterais (Opcionais) --- */
/* Simulam os ícones de '+' e '$' nas pontas */
.deco-left, .deco-right {
    position: absolute;
    font-size: 2rem;
    font-weight: bold;
    color: #FED623;
    text-shadow: 0 0 10px rgba(240, 194, 95, 0.7);
    z-index: 3;
}

.deco-left {
    left: 10px;
    margin-top: 8px;
}
.deco-right {
    right: 10px;
}
</style>
