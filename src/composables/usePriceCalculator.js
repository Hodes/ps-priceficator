// src/composables/usePriceCalculator.js
export function usePriceCalculator() {

    function calcularCotas(valor, temPS4PS5 = false, somenteOri1 = false, estados = []) {
        if (!valor || valor <= 0) return [];
        let resultado = [];
        if (temPS4PS5) {
            // 5 partes
            resultado = [
                { nome: "ORI1 PS5", percent: 22.5, valor: valor * 0.225 },
                { nome: "ORI1 PS5", percent: 22.5, valor: valor * 0.225 },
                { nome: "ORI1 PS4", percent: 22.5, valor: valor * 0.225 },
                { nome: "ORI1 PS4", percent: 22.5, valor: valor * 0.225 },
                { nome: "ORI2", percent: 10, valor: valor * 0.10 },
            ];
        } else {
            resultado = [
                { nome: "ORI1", percent: 40, valor: valor * 0.40 },
                { nome: "ORI1", percent: 40, valor: valor * 0.40 },
                { nome: "ORI2", percent: 20, valor: valor * 0.20 },
            ];
        }

        if (somenteOri1) {
            let oris1 = resultado.filter(cota => cota.nome.startsWith("ORI1"))
            let oris1Count = oris1.length;
            oris1.forEach(cota => {
                cota.percent = 100 / oris1Count;
                cota.valor = valor * (cota.percent / 100);
            });
            resultado = oris1;
        }

        // Ajustar valores para estados específicos
        resultado = resultado.map(cota => {
            if (!('ocupado' in cota)) {
                cota.ocupado = false;
            }
            if (!('ocupante' in cota)) {
                cota.ocupante = null;
            }
            return cota;
        });
        estados.forEach(estado => {
            let resultadoEncontrado = resultado.find(cota => cota.nome === estado.nome);
            if (resultadoEncontrado) {
                resultadoEncontrado.ocupado = estado.ocupado;
                resultadoEncontrado.ocupante = estado.ocupante;
            }
        });

        return resultado;
    }

    return { calcularCotas };
}
