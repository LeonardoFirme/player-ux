/**
 * @file App.vue
 * @description Componente raiz da plataforma. Gerencia o layout principal, inicialização da playlist e estados de carregamento.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { onMounted } from 'vue'
import { useVideoStore } from '@/stores/video'
import HomeView from '@/views/HomeView.vue'
import PlaylistSidebar from '@/components/player/PlaylistSidebar.vue'
import NavigationSidebar from '@/components/layout/NavigationSidebar.vue'
import MainHeader from '@/components/layout/MainHeader.vue'
import MainFooter from '@/components/layout/MainFooter.vue'

// Inicialização da Store para gerenciamento de estado global dos vídeos
const store = useVideoStore()

// Ciclo de vida: Dispara a busca de metadados assim que o componente é montado
onMounted(() => store.initPlaylist())
</script>

<template>
  <div class="flex h-screen w-full flex-col bg-white transition-colors duration-300 dark:bg-gray-950">

    <NavigationSidebar />

    <MainHeader />

    <div class="scrollbar-none flex-1 overflow-y-auto px-5">
      <div class="mx-auto flex w-full max-w-screen-full flex-col lg:flex-row">

        <main class="flex-1 bg-white dark:bg-gray-950">
          <HomeView v-if="store.videos.length > 0" />

          <div v-else class="flex h-full w-full items-center justify-center py-20">
            <div class="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-gray-800 dark:border-gray-800 dark:border-t-gray-50" />
          </div>
        </main>

        <aside class="h-225 relative top-8 w-full shrink-0 overflow-auto rounded-2xl border-gray-200 bg-white lg:w-104 lg:border dark:border-gray-800 dark:bg-gray-950">
          <PlaylistSidebar />
        </aside>
      </div>

      <MainFooter />
    </div>
  </div>
</template>

<style scoped>
/* Reset de Scrollbar para manter o design minimalista e focado no conteúdo */
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>