import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_load: {
      executor: 'constant-vus', // Tipo de cenário: Carga constante
      vus: 10, // Número de VUs
      duration: '30s', // Duração total do cenário
    },
    ramping_load: {
      executor: 'ramping-vus', // Tipo de cenário: Aumento de carga gradual
      startVUs: 0, // Começa com 0 VUs
      stages: [
        { duration: '10s', target: 10 }, // Sobe para 10 VUs em 10 segundos
        { duration: '20s', target: 20 }, // Sobe para 20 VUs nos próximos 20 segundos
        { duration: '10s', target: 0 }, // Reduz a 0 VUs nos próximos 10 segundos
      ],
    },
    per_iteration_load: {
      executor: 'per-vu-iterations', // Tipo de cenário: Execução de iterações
      vus: 5, // Número de VUs
      iterations: 10, // Cada VU executa 10 iterações
      maxDuration: '1m', // Tempo máximo de execução
    },
  },
};

export default function () {
  http.get('https://test-api.k6.io'); // Requisição HTTP simulada
  sleep(1); // Pausa de 1 segundo entre as requisições
}
