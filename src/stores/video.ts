/**
 * @file src/stores/video.ts
 * @description Gerenciamento de estado global para a playlist de vídeos e lógica do player.
 * @author Leonardo Firme
 * @version v1.0.0
 */

import { reactive, computed, toRefs } from 'vue'
import { defineStore } from 'pinia'

/**
 * Interface rigorosa para os metadados do vídeo.
 */
export interface VideoMetadata {
  id: string
  title: string
  duration: string
  thumbnail: string
  description: string
}

/**
 * Interface do estado interno da store.
 */
interface VideoState {
  currentId: string
  videos: VideoMetadata[]
  loading: boolean
  isAutoplay: boolean
}

export const useVideoStore = defineStore('video', () => {
  // Estado reativo inicial com tipagem explícita
  const state = reactive<VideoState>({
    currentId: 'wAaNxk8VMhE',
    videos: [] as VideoMetadata[],
    loading: false,
    isAutoplay: true
  })

  // Lista de IDs da playlist para inicialização
  const playlistIds: string[] = [
    'wAaNxk8VMhE', 'frwH3PzZDCI', '8gLBW3yZTKo', 'bI_LcFslJS8', 'qlEXIkySeY',
    'VIRKBxB1EL8', 'lvPSfBTdqwI', '8_2JnDR2j1M', 'Dm5BkD3vXDw', 'oHy3Z8zL25o'
  ]

  /**
   * Computed que retorna o vídeo ativo com fallback para estado de carregamento.
   */
  const activeVideo = computed((): VideoMetadata => {
    return state.videos.find((v: VideoMetadata) => v.id === state.currentId) || {
      id: state.currentId,
      title: 'Processando...',
      duration: '00:00',
      thumbnail: '',
      description: 'Carregando detalhes do conteúdo...'
    }
  })

  /**
   * Inicializa a playlist consumindo metadados via oEmbed.
   * Nota: O oEmbed não fornece descrição detalhada, sendo necessário Data API v3 para tal.
   */
  async function initPlaylist(): Promise<void> {
    if (state.loading) return
    state.loading = true

    try {
      const results = await Promise.all(
        playlistIds.map(async (id: string): Promise<VideoMetadata | null> => {
          try {
            // Fetch de metadados públicos via YouTube oEmbed
            const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)

            if (!res.ok) return null
            const data = await res.json()

            // Retorno estruturado seguindo o contrato VideoMetadata
            return {
              id,
              title: data.title,
              thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
              duration: '12:00', // Mock inicial para consistência de UI
              description: `${data.title}` // Atribuição de título na descrição devido a limitações de oEmbed
            }
          } catch (error) {
            console.error(`Erro ao carregar vídeo ${id}:`, error)
            return null
          }
        })
      )
      // Filtro rigoroso para garantir integridade da tipagem removendo possíveis nulos
      state.videos = results.filter((v): v is VideoMetadata => v !== null)
    } finally {
      state.loading = false
    }
  }

  /**
   * Atualiza o ID do vídeo em reprodução.
   * @param id ID do vídeo do YouTube.
   */
  function setCurrentVideo(id: string): void {
    state.currentId = id
  }

  /**
   * Alterna o estado de reprodução automática.
   */
  function toggleAutoplay(): void {
    state.isAutoplay = !state.isAutoplay
  }

  return {
    ...toRefs(state),
    activeVideo,
    initPlaylist,
    setCurrentVideo,
    toggleAutoplay
  }
})