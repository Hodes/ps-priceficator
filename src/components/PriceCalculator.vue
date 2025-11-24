<script setup type="ts">
import { onMounted, ref } from 'vue';
import { usePriceCalculator } from '../composables/usePriceCalculator';
import PSLogo from './PSLogo.vue';
import PSPlusLogo from './PSPlusLogo.vue';
import Checkbox from './checkbox.vue';
import Button from './Button.vue';
import Card from './Card.vue';
import Input from './Input.vue';
import * as htmlToImage from 'html-to-image';
import { useMessaging } from '../composables/useMessaging';

const nomeJogo = ref('');
const valorJogo = ref('');
const temPS4PS5 = ref(false);
const somenteOri1 = ref(false);
const resultado = ref([]);
const previewUrl = ref('');
const cardRef = ref(null);

const listaItensSalvos = ref([]);
const listasSalvasVisiveis = ref(false);

const { calcularCotas } = usePriceCalculator();

const { showMessage, confirmMessage } = useMessaging();

function gerar() {
  resultado.value = calcularCotas(Number(valorJogo.value), temPS4PS5.value, somenteOri1.value, resultado.value);
  salvar();
  // Simula scroll até o resultado
  setTimeout(() => {
      const resultadoElement = document.getElementById('resultado');
      if (resultadoElement) {
          resultadoElement.scrollIntoView({ behavior: 'smooth' });
      }
  }, 100);
}

function handlePaste(event) {
  const items = event.clipboardData.items;
  for (let item of items) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      const reader = new FileReader();
      reader.onload = e => previewUrl.value = e.target.result;
      reader.readAsDataURL(file);
      reader.onerror = e => {
          showMessage("Erro ao carregar a imagem.", "error");
      };
      
      break;
    }
  }
}

async function copiar() {
  try {
    const blob = await htmlToImage.toBlob(cardRef.value, {
          pixelRatio: 1,
        backgroundColor: 'rgb(36, 36, 36)',
          width: cardRef.value.offsetWidth + 20 * 2,
          height: cardRef.value.offsetHeight + 20 * 2,
        style: {
            overflow: 'visible',
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }
    });

    const item = new ClipboardItem({ "image/png": blob });

    await navigator.clipboard.write([item]);

    showMessage("Imagem copiada para a área de transferência!", "success");

  } catch (err) {
    console.error(err);
    showMessage("Erro ao copiar a imagem.", "error");
  }
}

function autopreenche(cota, event) {
    // Se preencheu o ocupante, marca como ocupado
    if( event.target.value.trim() !== '' ) {
        cota.ocupado = true;
    } else {
        cota.ocupado = false;
    }
}

function carregarItensSalvos() {
    const dadosSalvos = JSON.parse(localStorage.getItem('ps-priceficator-dados') || '[]');
    listaItensSalvos.value = dadosSalvos;
}

function salvar() {
    const dados = {
        nomeJogo: nomeJogo.value,
        valorJogo: valorJogo.value,
        temPS4PS5: temPS4PS5.value,
        somenteOri1: somenteOri1.value,
        resultado: resultado.value,
        previewUrl: previewUrl.value
    };

    const dadosJson = JSON.stringify(dados, null, 2);
    //Lista de precificação atualmente salva
    carregarItensSalvos();
    const dadosSalvos = listaItensSalvos.value;
    //Verifica se já existe um jogo com o mesmo nome
    const indexExistente = dadosSalvos.findIndex((d) => d.nomeJogo === nomeJogo.value);
    if(indexExistente !== -1) {
        //Atualiza o jogo existente
        dadosSalvos[indexExistente] = dados;
    } else {
        //Adiciona um novo jogo
        dadosSalvos.push(dados);
    }
    const dadosJsonSalvos = JSON.stringify(dadosSalvos, null, 2);
    
    //Salva no localStorage
    localStorage.setItem('ps-priceficator-dados', dadosJsonSalvos);

    showMessage("Dados salvos com sucesso!", "success");
}

function alternarListasSalvas() {
    listasSalvasVisiveis.value = !listasSalvasVisiveis.value;
}

function selecionarItemSalvo(dados) {
    nomeJogo.value = dados.nomeJogo;
    valorJogo.value = dados.valorJogo;
    temPS4PS5.value = dados.temPS4PS5;
    somenteOri1.value = dados.somenteOri1;
    resultado.value = dados.resultado;
    previewUrl.value = dados.previewUrl;
    listasSalvasVisiveis.value = false;
}

function excluirItemSalvo(index) {
    confirmMessage("Tem certeza que deseja excluir este item?", () => {
        listaItensSalvos.value.splice(index, 1);
        //Atualiza o localStorage
        localStorage.setItem('ps-priceficator-dados', JSON.stringify(listaItensSalvos.value, null, 2));
    });
}


onMounted(() => {
    carregarItensSalvos();
});
</script>

<template>
  <div class="container">
    <h1 class="inline-title">
        <PSLogo />
        <span>PS Priceficator</span>
        <PSPlusLogo />
    </h1>

    <Button text="Listas Salvas" icon="fa-solid fa-folder-open" @click="alternarListasSalvas()"></Button>
    <div v-if="listasSalvasVisiveis">
        <table class="table">
            <thead>
                <tr>
                    <th>Nome do Jogo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dados, index) in listaItensSalvos" :key="index">
                    <td>{{ dados.nomeJogo }}</td>
                    <td class="flex-center">
                        <Button text="Carregar" icon="fa-solid fa-upload" @click="selecionarItemSalvo(dados)"></Button>
                        <Button text="Excluir" icon="fa-solid fa-trash" color="red" @click="excluirItemSalvo(index)"></Button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="game-image">
        <input type="text" placeholder="Cole a imagem do Jogo Aqui" @paste.prevent="handlePaste"></input>
        <img v-if="previewUrl" :src="previewUrl" alt="Preview" style="max-width: 100%; max-height: 100%; border-radius: 10px;"/>
    </div>

    <Input v-model="nomeJogo" placeholder="Nome do Jogo" icon="fa-solid fa-file-signature"/>

    <Input v-model="valorJogo" type="number" placeholder="Valor do Jogo (R$)" icon="mdi mdi-currency-brl"/>

    <Checkbox v-model="temPS4PS5" label="PS4/PS5 (5 cotas)"/>

    <Checkbox v-model="somenteOri1" label="Apenas ORI 1"/>

    <div class="flex-horizontal">
        <Button text="Gerar Cotas" icon="fa-solid fa-gears" @click="gerar"></Button>
        
    </div>

    <div v-if="resultado.length" style="width: 100%;">
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th>Cota</th>
                    <th>Ocupado</th>
                    <th>Ocupante</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(r, index) in resultado" :key="index">
                    <td>{{ r.nome }}</td>
                    <td><input type="checkbox" v-model="r.ocupado"/></td>
                    <td><input type="text" v-model="r.ocupante" @keyup="autopreenche(r, $event)"/></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div id="resultado" class="center" v-show="resultado.length">
        <div class="card-result-container">
            <div ref="cardRef" class="card-result">
                <Card :maxWidth="'300px'">
                    <div style="padding: 8px;">
                        <div class="inline-title">
                            <PSLogo />
                            <span class="game-title">{{nomeJogo}}</span>
                            <PSPlusLogo />
                        </div>
                        <div class="game-image-preview" v-if="previewUrl">
                            <img v-if="previewUrl" :src="previewUrl" alt="Preview"/>
                            <div class="fade-bottom"></div>
                        </div>
                        <table v-if="resultado.length > 0" cellpadding="6" class="table-values">
                            <tbody>
                                <tr v-for="(r, index) in resultado" :key="index">
                                    <td>{{ r.nome }}</td>
                                    <td>{{ r.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                                    <td>
                                        <div class="estado-ocupado" v-if="r.ocupado"> 
                                            <span class="fa-regular fa-circle-check" style="color: #4CAF50;"></span>
                                            {{ r.ocupante }}
                                        </div>
                                    </td>
                                </tr>
                          </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            <div class="flex-horizontal">
              <Button text="Copiar" icon="fa-solid fa-copy" @click="copiar"></Button>
              <Button text="Salvar" icon="fa-solid fa-floppy-disk" color="green" @click="salvar"></Button>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 550px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.game-title {
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
}
.game-image {
  width: 100%;
  height: 200px;
  border: 2px dashed #555;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
  font-size: 14px;
  position: relative;
}
.game-image input {
  width: 90%;
  height: 90%;
  position: absolute;
  cursor: pointer;
  background-color: none;
  background: transparent;
  border: none;
  font-size: 14px;
}
.game-image-preview {
  width: 105%;
  margin: 0 0 0 -2.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.game-image-preview img {
  max-width: 100%;
  max-height: 100%;
}
.game-image-preview .fade-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(to top, rgba(26, 26, 26, 1), rgba(26, 26, 26, 0));
}
.card-result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.card-result {
  background-color: rgb(36, 36, 36);
  margin: 20px;
  overflow: visible;
}
.estado-ocupado {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: lawngreen;
  gap: 6px;
}
.table-values {
  width: 100%;
  border-collapse: collapse;
}
</style>
