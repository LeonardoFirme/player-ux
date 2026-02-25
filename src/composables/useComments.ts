/**
 * @file src/composables/useComments.ts
 * @description Composable para gerenciamento de lógica de comentários. Trata persistência em LocalStorage, curtidas, respostas e remoção de dados com tipagem rigorosa.
 * @author Leonardo Firme
 * @version v1.0.0
 */

import { ref, watch } from 'vue'

/**
 * Interface que define a estrutura de uma resposta a um comentário.
 */
export interface Reply {
  id: number
  author: string
  avatar: string
  text: string
  time: string
}

/**
 * Interface principal para a estrutura de um comentário e sua thread de respostas.
 */
export interface Comment {
  id: number
  author: string
  avatar: string
  text: string
  likes: number
  isLiked: boolean
  time: string
  replies: Reply[]
}

const STORAGE_KEY = 'v0_video_comments_v2'

export function useComments() {
  // Estado reativo que armazena a lista global de comentários
  const comments = ref<Comment[]>([])

  /**
   * Inicializa o estado de comentários buscando do LocalStorage ou carregando dados mockados.
   */
  const initComments = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      comments.value = JSON.parse(saved)
    } else {
      comments.value = [
        {
          id: 1,
          author: 'Leonardo Firme',
          avatar: 'https://github.com/LeonardoFirme.png',
          text: 'A precisão deste layout com Tailwind v4 é incrível. O modo dark ficou impecável!',
          likes: 1200,
          isLiked: false,
          time: 'há 2 horas',
          replies: []
        }
      ]
    }
  }

  /**
   * Monitora alterações profundas no array de comentários para persistência automática.
   */
  watch(comments, (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
  }, { deep: true })

  /**
   * Adiciona um novo comentário ao topo da lista.
   * @param {string} text - Conteúdo textual do comentário.
   */
  const addComment = (text: string) => {
    const newEntry: Comment = {
      id: Date.now(),
      author: 'Leonardo Firme',
      avatar: 'https://github.com/LeonardoFirme.png',
      text,
      likes: 0,
      isLiked: false,
      time: 'agora',
      replies: []
    }
    comments.value.unshift(newEntry)
  }

  /**
   * Alterna o estado de curtida de um comentário e incrementa/decrementa o contador.
   * @param {number} id - ID do comentário alvo.
   */
  const toggleLike = (id: number) => {
    const comment = comments.value.find(c => c.id === id)
    if (comment) {
      if (comment.isLiked) {
        comment.likes--
        comment.isLiked = false
      } else {
        comment.likes++
        comment.isLiked = true
      }
    }
  }

  /**
   * Remove um comentário da lista principal.
   * @param {number} id - ID do comentário a ser deletado.
   */
  const deleteComment = (id: number) => {
    comments.value = comments.value.filter(c => c.id !== id)
  }

  /**
   * Adiciona uma resposta a um comentário existente.
   * @param {number} commentId - ID do comentário pai.
   * @param {string} text - Conteúdo textual da resposta.
   */
  const addReply = (commentId: number, text: string) => {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
      comment.replies.push({
        id: Date.now(),
        author: 'Leonardo Firme',
        avatar: 'https://github.com/LeonardoFirme.png',
        text,
        time: 'agora'
      })
    }
  }

  /**
   * Remove uma resposta específica de uma thread de comentário.
   * @param {number} commentId - ID do comentário pai.
   * @param {number} replyId - ID da resposta a ser removida.
   */
  const deleteReply = (commentId: number, replyId: number) => {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
      comment.replies = comment.replies.filter(r => r.id !== replyId)
    }
  }

  return {
    comments,
    initComments,
    addComment,
    toggleLike,
    deleteComment,
    addReply,
    deleteReply
  }
}