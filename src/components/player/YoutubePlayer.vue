/**
 * @file src/player/YoutubePlayer.vue
 * @description Componente de reprodução de vídeo via Iframe do YouTube. Gerencia a re-renderização dinâmica baseada no ID do vídeo e nas configurações de autoplay da store.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { computed } from 'vue'
import { useVideoStore } from '@/stores/video'

// Acesso à store global para monitoramento do vídeo ativo e configurações de reprodução
const store = useVideoStore()

/**
 * @description Constrói a URL do iframe baseada na preferência de autoplay do store.
 * Se store.isAutoplay for falso, o vídeo carregará parado para preservar a experiência do usuário.
 * @returns {string} URL formatada com parâmetros de incorporação do YouTube.
 */
const videoUrl = computed(() => {
  const autoplay = store.isAutoplay ? '1' : '0'
  return `https://www.youtube.com/embed/${store.currentId}?autoplay=${autoplay}&rel=0&modestbranding=1`
})
</script>

<template>
  <div class="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-50 shadow-2xl dark:bg-gray-900">
    <iframe
      :key="store.currentId + store.isAutoplay"
      class="h-full w-full"
      :src="videoUrl"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
    />
  </div>
</template>