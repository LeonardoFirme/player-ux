/**
 * @file src/views/HomeView.vue
 * @description View principal que integra o player de vídeo, controles de interação (like, subscribe) e componentes de suporte.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVideoStore } from '@/stores/video'
import YoutubePlayer from '@/components/player/YoutubePlayer.vue'
import ShareModal from '@/components/player/ShareModal.vue'
import VideoComments from '@/components/player/VideoComments.vue'
import { Share2, ThumbsUp, MoreHorizontal, Check, Zap, UserCheck } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

// Acesso ao estado global de vídeos
const store = useVideoStore()

// Estados reativos para controle de UI
const isSubscribed = ref(false)
const isShareModalOpen = ref(false)

// URL computada para compartilhamento baseada no vídeo ativo
const currentVideoUrl = computed(() => `https://youtu.be/${store.currentId}`)

/**
 * @description Gerencia a ação de like disparando efeitos visuais de confetti.
 */
const handleLike = () => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff', '#00ff88', '#ff0088']
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors,
    ticks: 300,
    gravity: 1,
    shapes: ['circle', 'square']
  })
}

/**
 * @description Gerencia a inscrição do usuário com feedback visual.
 */
const handleSubscribe = () => {
  if (isSubscribed.value) return
  isSubscribed.value = true
  confetti({
    particleCount: 200,
    startVelocity: 45,
    spread: 360,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    gravity: 0.5,
    scalar: 1.2,
    shapes: ['circle'],
    ticks: 200
  })
}
</script>

<template>
  <div class="flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-1000 easing-out">
    <div class="p-4 lg:p-6 lg:pr-6 lg:pl-0 xl:pt-8 xl:pl-0">

      <div class="group relative w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-700">
        <YoutubePlayer />
        <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-10 bg-linear-to-tr from-white via-transparent to-transparent" />
      </div>

      <div class="mt-8 px-2">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div class="flex flex-1 flex-col gap-4">
            <h1 class="text-lg font-black tracking-tight text-gray-800 dark:text-gray-50 uppercase leading-tight cursor-default">
              {{ store.activeVideo.title }}
            </h1>

            <div class="flex items-center gap-6">
              <div class="group flex items-center gap-3 cursor-pointer">
                <div class="relative h-12 w-12 rounded-full bg-linear-to-br from-gray-800 to-gray-400 dark:from-gray-50 dark:to-gray-400 p-0.5 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110">
                  <div class="h-full w-full rounded-full border-2 border-white bg-gray-100 dark:border-gray-950 dark:bg-gray-800">
                    <img src="https://github.com/LeonardoFirme.png" class="h-full w-full object-cover rounded-full" />
                  </div>
                </div>
                <div>
                  <h3 class="flex items-center gap-1 text-sm font-black text-gray-800 dark:text-gray-50 uppercase tracking-tighter">
                    Leonardo Firme <Check :size="12" class="text-blue-500 animate-bounce" />
                  </h3>
                  <p class="text-[10px] font-bold text-gray-400 uppercase">2.4M seguidores</p>
                </div>
              </div>

              <button
                @click="handleSubscribe"
                :disabled="isSubscribed"
                :class="[
                  'relative overflow-hidden rounded-full px-8 py-3 text-[11px] font-black uppercase tracking-widest transition-all active:scale-90 cursor-pointer group',
                  isSubscribed
                    ? 'bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800'
                    : 'bg-gray-800 text-white hover:bg-gray-950 dark:bg-gray-50 dark:text-gray-950 dark:hover:bg-gray-200'
                ]"
              >
                <div class="relative z-10 flex items-center gap-2">
                  <UserCheck v-if="isSubscribed" :size="14" />
                  <span>{{ isSubscribed ? 'Inscrito' : 'Inscrever-se' }}</span>
                </div>
                <div v-if="!isSubscribed" class="absolute inset-0 z-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex items-center rounded-full bg-gray-100 p-1 dark:bg-gray-900/50 backdrop-blur-md">
              <button @click="handleLike" class="group flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-gray-800 dark:text-gray-50 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all active:scale-90 cursor-pointer">
                <ThumbsUp :size="16" class="transition-transform group-hover:-translate-y-1 group-hover:text-blue-500" />
                <span class="tabular-nums">128K</span>
              </button>
              <div class="h-4 w-px bg-gray-200 dark:bg-gray-800" />
              <button class="group px-5 py-2.5 text-xs font-bold text-gray-800 dark:text-gray-50 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all active:scale-90 cursor-pointer text-center">
                <span class="group-hover:rotate-12 inline-block transition-transform">Dislike</span>
              </button>
            </div>

            <button
              @click="isShareModalOpen = true"
              class="group flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-xs font-bold text-gray-800 dark:bg-gray-900/50 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
            >
              <Share2 :size="16" class="group-hover:scale-110 transition-transform" />
              Compartilhar
            </button>

            <button class="rounded-full bg-gray-100 p-3.5 text-gray-800 dark:bg-gray-900/50 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all active:rotate-90 cursor-pointer">
              <MoreHorizontal :size="18" />
            </button>
          </div>
        </div>

        <div class="mt-8 rounded-4xl bg-gray-50 p-7 dark:bg-gray-900/30 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 shadow-xs transition-all duration-500">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 dark:bg-gray-800 shadow-xs">
               <Zap :size="12" class="text-yellow-500 fill-yellow-500" />
               <span class="text-[10px] font-black text-gray-800 dark:text-gray-50">Destaque</span>
            </div>
            <span class="text-xs font-black text-gray-400 uppercase tracking-tighter">1.2M visualizações • há 2 horas</span>
          </div>
          <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-200 font-medium max-w-4xl line-clamp-2 hover:line-clamp-none transition-all duration-700 cursor-pointer">
            {{ store.activeVideo.description }}
          </p>
        </div>

        <VideoComments />
      </div>
    </div>

    <ShareModal
      :is-open="isShareModalOpen"
      :video-url="currentVideoUrl"
      @close="isShareModalOpen = false"
    />
  </div>
</template>