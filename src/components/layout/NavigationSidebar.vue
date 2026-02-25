/**
 * @file src/components/layout/NavigationSidebar.vue
 * @description Sidebar de navegação lateral com sistema de drawer (gaveta). Gerencia links principais, biblioteca e estados de visibilidade.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { ref } from 'vue'
import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  History,
  Film,
  Menu,
  X
} from 'lucide-vue-next'

// Interface para garantir a tipagem rigorosa dos itens de menu
interface NavItem {
  name: string
  icon: any
  active?: boolean
}

// Controle de estado para abertura/fechamento da sidebar
const isOpen = ref(false)

/**
 * Alterna a visibilidade da barra lateral.
 */
const toggleSidebar = (): void => {
  isOpen.value = !isOpen.value
}

// Definição dos itens de navegação principal
const menuItems: NavItem[] = [
  { name: 'Início', icon: Home, active: true },
  { name: 'Shorts', icon: Film, active: false },
  { name: 'Inscrições', icon: PlaySquare, active: false },
  { name: 'Explorar', icon: Compass, active: false },
]

// Itens da seção de biblioteca do usuário
const libraryItems: NavItem[] = [
  { name: 'Histórico', icon: History },
  { name: 'Assistir mais tarde', icon: Clock },
  { name: 'Vídeos marcados com gostei', icon: ThumbsUp },
]

// Exposição do método para componentes pais (como o Header ou App.vue)
defineExpose({ toggleSidebar })
</script>

<template>
  <button
    @click="toggleSidebar"
    class="fixed top-2.5 left-3 z-40 flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm border border-gray-200 text-gray-800 transition-all active:scale-90 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-50 cursor-pointer"
  >
    <Menu :size="20" />
  </button>

  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      @click="toggleSidebar"
      class="fixed inset-0 z-40 bg-gray-950/40 backdrop-blur-xs"
    />
  </Transition>

  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-full w-72 bg-white p-6 shadow-2xl transition-transform duration-500 ease-in-out dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="mb-8 flex items-center justify-between px-2">
      <div class="flex items-center gap-2">
        <div class="group relative flex items-center justify-center">
          <img src="../../assets/logo.svg" class="h-6 w-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" alt="Logo">
        </div>
        <span class="text-sm font-black text-gray-800 dark:text-gray-50 uppercase tracking-tighter">Player UX</span>
      </div>
      <button @click="toggleSidebar" class="text-gray-400 hover:text-gray-800 dark:hover:text-gray-50 cursor-pointer">
        <X :size="20" />
      </button>
    </div>

    <nav class="flex flex-col gap-8">
      <div class="flex flex-col gap-1">
        <button
          v-for="item in menuItems"
          :key="item.name"
          :class="[
            'group flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-all cursor-pointer justify-start',
            item.active ? 'bg-gray-100 dark:bg-gray-900' : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'
          ]"
        >
          <component
            :is="item.icon"
            :size="20"
            :class="item.active ? 'text-gray-800 dark:text-gray-50' : 'text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-50'"
          />
          <span :class="['text-xs font-black uppercase tracking-tight text-left', item.active ? 'text-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400']">
            {{ item.name }}
          </span>
        </button>
      </div>

      <div class="h-px w-full bg-gray-100 dark:bg-gray-800" />

      <div class="flex flex-col gap-1">
        <h4 class="mb-2 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Biblioteca</h4>
        <button
          v-for="item in libraryItems"
          :key="item.name"
          class="group flex w-full items-center gap-4 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all cursor-pointer justify-start"
        >
          <component
            :is="item.icon"
            :size="20"
            class="shrink-0 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-50"
          />
          <span class="text-xs font-black text-gray-500 uppercase tracking-tight text-left dark:text-gray-400">
            {{ item.name }}
          </span>
        </button>
      </div>
    </nav>
  </aside>
</template>