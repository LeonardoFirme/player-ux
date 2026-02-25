/**
 * @file src/components/player/PlaylistSidebar.vue
 * @description Componente de barra lateral da playlist. Gerencia a listagem de vídeos, seleção de conteúdo e controle de autoplay global.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { useVideoStore } from '@/stores/video'
import { VideoIcon } from 'lucide-vue-next'

// Acesso ao estado global da store de vídeos
const store = useVideoStore()

/**
 * @description Alterna o estado de autoplay global no store.
 */
const toggleAutoplay = (): void => {
  store.isAutoplay = !store.isAutoplay
}
</script>

<template>
  <div class="flex w-full flex-col p-0 bg-white dark:bg-gray-950 overflow-hidden">

    <div class="mb-4 p-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <VideoIcon :size="18" class="text-gray-800 dark:text-gray-50" />
        <h2 class="text-xs font-black uppercase tracking-[0.2em] text-gray-800 dark:text-gray-50">Você pode gostar</h2>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-[10px] font-black uppercase tracking-tighter text-gray-500 dark:text-gray-400">Autoplay</span>
        <button
          @click="toggleAutoplay"
          :class="[
            'relative h-5 w-10 cursor-pointer rounded-full outline-hidden transition-all duration-300 active:scale-95',
            store.isAutoplay ? 'bg-gray-800 dark:bg-gray-50' : 'bg-gray-200 dark:bg-gray-800'
          ]"
        >
          <div
            :class="[
              'absolute top-1 h-3 w-3 rounded-full transition-all duration-300 ease-in-out',
              store.isAutoplay
                ? 'left-6 bg-white dark:bg-gray-950 shadow-xs'
                : 'left-1 bg-white dark:bg-gray-400'
            ]"
          />
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-0">
      <button
        v-for="(video, index) in store.videos"
        :key="video.id"
        @click="store.setCurrentVideo(video.id)"
        :class="[
          'group flex w-full cursor-pointer flex-row gap-4 text-left outline-hidden transition-all duration-500 px-2 py-1',
          store.currentId === video.id ? 'bg-red-100 scale-[0.98] opacity-100' : 'opacity-60 hover:opacity-100 hover:translate-x-1'
        ]"
      >
        <div :class="[
          'relative aspect-video w-25 h-15 shrink-0 overflow-hidden rounded bg-gray-100 transition-all duration-500 group-hover:shadow-xl dark:bg-gray-800',
          store.currentId === video.id ? 'shadow-lg' : ''
        ]">
          <img
            :src="video.thumbnail"
            class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />

          <div class="absolute right-1 bottom-1 rounded bg-black/90 px-1.5 py-0.5 text-[8px] font-black text-white shadow-lg">
            {{ video.duration }}
          </div>

          <div v-if="store.currentId === video.id" class="absolute inset-0 flex items-center justify-center bg-gray-950/20 backdrop-blur-[1px]">
             <div class="flex items-center gap-1">
                <div class="h-3 w-0.5 animate-[bounce_1s_infinite_0ms] bg-white dark:bg-gray-50" />
                <div class="h-5 w-0.5 animate-[bounce_1s_infinite_200ms] bg-white dark:bg-gray-50" />
                <div class="h-3 w-0.5 animate-[bounce_1s_infinite_400ms] bg-white dark:bg-gray-50" />
             </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col justify-start py-0.5">
          <span :class="[
            'line-clamp-2 text-sm font-black leading-snug transition-colors',
            store.currentId === video.id ? 'text-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-50'
          ]">
            {{ video.title }}
          </span>

          <div class="mt-1 flex flex-col gap-0.5">
            <span class="text-[13px] font-medium tracking-widest text-gray-800">
              Player UX
            </span>
          </div>
        </div>

        <span class="hidden xl:block text-[10px] font-black italic text-gray-400 transition-colors group-hover:text-gray-500 dark:text-gray-900">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
      </button>
    </div>
  </div>
</template>