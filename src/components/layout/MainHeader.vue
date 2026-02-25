/**
 * @file src/components/layout/MainHeader.vue
 * @description Header principal da plataforma. Contém o sistema de busca com histórico, comandos de voz e ações de perfil.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Search, Mic, Video, Bell, User, Clock } from 'lucide-vue-next'

// Estados reativos para gerenciamento da busca e interface
const searchQuery = ref('')
const isHistoryOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

// Histórico de pesquisa para amostragem (Simulação de persistência)
const searchHistory = ref([
  'Como criar um ERP com Laravel',
  'Tailwind CSS v4 tutorial',
  'Vue 3 Composition API',
  'NextJS 16 Proxy setup',
  'Design de interfaces minimalistas'
])

/**
 * Processa a submissão da busca e fecha o dropdown de histórico.
 */
const handleSearch = (): void => {
  if (!searchQuery.value.trim()) return
  isHistoryOpen.value = false
  // Lógica de busca será integrada aqui
}

/**
 * Seleciona um item do histórico, preenche o input e executa a busca.
 * @param item Termo de pesquisa selecionado.
 */
const selectHistoryItem = (item: string): void => {
  searchQuery.value = item
  isHistoryOpen.value = false
  handleSearch()
}

/**
 * Fecha o histórico de busca ao detectar clique fora do container de pesquisa.
 */
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isHistoryOpen.value = false
  }
}

// Hooks de ciclo de vida para gerenciamento de listeners globais
onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
  <header class="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 lg:px-8">

    <div class="flex items-center gap-4 lg:w-64">
      <div class="ml-14 flex items-center gap-2">
        <div class="group relative flex items-center justify-center">
          <img src="../../assets/logo.svg" class="h-6 w-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" alt="Logo">
          <div class="absolute inset-0 -z-10 animate-pulse rounded-full bg-gray-800/10 blur-xl dark:bg-gray-50/10" />
        </div>
        <span class="text-sm font-black uppercase tracking-tighter text-gray-800 dark:text-gray-50">Player UX</span>
      </div>
    </div>

    <div ref="containerRef" class="relative flex max-w-2xl flex-1 items-center gap-2 px-4">
      <div class="relative w-full">
        <form
          @submit.prevent="handleSearch"
          :class="[
            'flex h-10 w-full items-center border transition-all duration-200',
            isHistoryOpen
              ? 'rounded-t-2xl border-gray-200 bg-white shadow-2xl dark:border-gray-50 dark:bg-gray-950'
              : 'rounded-full border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900'
          ]"
        >
          <div class="flex flex-1 items-center px-4">
            <Search :size="18" class="text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              @focus="isHistoryOpen = true"
              placeholder="Pesquisar conteúdo..."
              class="h-full w-full bg-transparent px-3 text-sm font-medium text-gray-800 outline-hidden placeholder:text-gray-400 dark:text-gray-50"
            />
          </div>
          <button
            type="submit"
            class="flex h-full w-16 items-center justify-center border-l border-gray-200 bg-gray-100 transition-colors hover:bg-gray-200 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-gray-800 rounded-r-full cursor-pointer"
            :class="{ 'rounded-tr-2xl rounded-br-none': isHistoryOpen }"
          >
            <Search :size="18" class="text-gray-800 dark:text-gray-50" />
          </button>
        </form>

        <div
          v-if="isHistoryOpen && searchHistory.length > 0"
          class="absolute top-10 left-0 w-full overflow-hidden rounded-b-2xl border border-t-0 border-gray-200 bg-white py-2 shadow-2xl dark:border-gray-50 dark:bg-gray-950"
        >
          <button
            v-for="item in searchHistory"
            :key="item"
            @click="selectHistoryItem(item)"
            class="group flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
          >
            <div class="flex items-center gap-3">
              <Clock :size="16" class="text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-50" />
              <span class="text-sm font-bold text-gray-500 transition-colors group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-100">
                {{ item }}
              </span>
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
              Remover
            </span>
          </button>
        </div>
      </div>

      <button type="button" class="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-800 transition-all hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-800">
        <Mic :size="18" />
      </button>
    </div>

    <div class="flex items-center justify-end gap-3 lg:w-64">
      <button class="rounded-full p-2.5 text-gray-800 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-900 cursor-pointer">
        <Video :size="20" />
      </button>
      <button class="relative rounded-full p-2.5 text-gray-800 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-900 cursor-pointer">
        <Bell :size="20" />
        <span class="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-[10px] font-black text-white dark:bg-gray-50 dark:text-gray-950">3</span>
      </button>
      <div class="ml-2 h-9 w-9 overflow-hidden rounded-full border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900 cursor-pointer">
        <div class="flex h-full w-full items-center justify-center text-gray-400">
          <User :size="20" />
        </div>
      </div>
    </div>
  </header>
</template>