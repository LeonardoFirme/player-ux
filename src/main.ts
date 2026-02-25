/**
 * @file src/main.ts
 * @description Ponto de entrada principal da aplicação. Gerencia a inicialização do Vue 3, persistência de estado com Pinia e a injeção do Tailwind CSS v4.
 * @author Leonardo Firme
 * @version v1.0.0
 */

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Inicialização da instância do App
const app = createApp(App)

/**
 * @description Configuração do Pinia para gerenciamento de estado global.
 * Utilizado para centralizar o controle dos vídeos e preferências do player.
 */
app.use(createPinia())

// Montagem da aplicação no elemento root do DOM
app.mount('#app')