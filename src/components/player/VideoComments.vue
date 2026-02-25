/**
 * @file src/player/VideoComments.vue
 * @description Componente de gerenciamento de comentários. Implementa lógica de criação, exclusão, curtidas e sistema de respostas (threads) utilizando composables.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useComments } from '@/composables/useComments'
import { MessageSquare, ThumbsUp, Trash2, SendHorizontal } from 'lucide-vue-next'

// Desestruturação das ações e estados do composable de comentários
const {
  comments,
  initComments,
  addComment,
  toggleLike,
  deleteComment,
  addReply,
  deleteReply
} = useComments()

// Estados reativos para controle de inputs e interface de resposta
const newCommentText = ref('')
const replyText = ref('')
const activeReplyId = ref<number | null>(null)

// Inicialização dos dados ao montar o componente
onMounted(() => initComments())

/**
 * @description Processa a adição de um novo comentário principal.
 */
const handleAddComment = () => {
  if (!newCommentText.value.trim()) return
  addComment(newCommentText.value)
  newCommentText.value = ''
}

/**
 * @description Processa a adição de uma resposta a um comentário específico.
 * @param {number} commentId - ID do comentário pai.
 */
const handleAddReply = (commentId: number) => {
  if (!replyText.value.trim()) return
  addReply(commentId, replyText.value)
  replyText.value = ''
  activeReplyId.value = null
}
</script>

<template>
  <div class="mt-12 flex flex-col gap-8 px-2 pb-20">
    <div class="flex items-center gap-3">
      <MessageSquare :size="20" class="text-gray-800 dark:text-gray-50" />
      <h2 class="text-sm font-black uppercase tracking-[0.2em] text-gray-800 dark:text-gray-50">
        {{ comments.length }} Comentários
      </h2>
    </div>

    <div class="flex gap-4">
      <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
        <img src="https://github.com/LeonardoFirme.png" class="h-full w-full object-cover" />
      </div>
      <form @submit.prevent="handleAddComment" class="relative flex-1">
        <input
          v-model="newCommentText"
          type="text"
          placeholder="Adicione um comentário..."
          class="w-full border-b border-gray-200 bg-transparent py-2 text-sm font-medium text-gray-800 outline-hidden transition-colors focus:border-gray-800 dark:border-gray-800 dark:text-gray-50 dark:focus:border-gray-50"
        />
        <button type="submit" class="absolute right-0 bottom-2 text-gray-400 hover:text-gray-800 dark:hover:text-gray-50 cursor-pointer">
          <SendHorizontal :size="18" />
        </button>
      </form>
    </div>

    <div class="flex flex-col gap-10">
      <div v-for="comment in comments" :key="comment.id" class="group flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <img :src="comment.avatar" class="h-full w-full object-cover" />
          </div>

          <div class="flex flex-1 flex-col gap-1">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-[11px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-50">
                  {{ comment.author }}
                </span>
                <span class="text-[10px] font-bold text-gray-400 uppercase">
                  {{ comment.time }}
                </span>
              </div>
              <button @click="deleteComment(comment.id)" class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                <Trash2 :size="14" />
              </button>
            </div>

            <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-200">
              {{ comment.text }}
            </p>

            <div class="mt-2 flex items-center gap-4">
              <button
                @click="toggleLike(comment.id)"
                :class="[
                  'flex items-center gap-1.5 text-[10px] font-black uppercase transition-all cursor-pointer active:scale-95',
                  comment.isLiked ? 'text-blue-500' : 'text-gray-400 hover:text-gray-800 dark:hover:text-gray-50'
                ]"
              >
                <ThumbsUp :size="14" :class="{ 'fill-blue-500': comment.isLiked }" />
                <span class="tabular-nums">{{ comment.likes.toLocaleString() }}</span>
              </button>

              <button
                @click="activeReplyId = activeReplyId === comment.id ? null : comment.id"
                class="text-[10px] font-black text-gray-400 uppercase hover:text-gray-800 dark:hover:text-gray-50 cursor-pointer"
              >
                Responder
              </button>
            </div>

            <div v-if="activeReplyId === comment.id" class="mt-4 flex gap-3 animate-in fade-in slide-in-from-top-2">
              <input
                v-model="replyText"
                type="text"
                placeholder="Escreva sua resposta..."
                class="flex-1 border-b border-gray-200 bg-transparent py-1 text-xs font-medium text-gray-800 outline-hidden dark:border-gray-800 dark:text-gray-50"
                @keyup.enter="handleAddReply(comment.id)"
              />
              <button @click="handleAddReply(comment.id)" class="text-gray-800 dark:text-gray-50 cursor-pointer">
                <SendHorizontal :size="14" />
              </button>
            </div>

            <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 flex flex-col gap-4 border-l-2 border-gray-100 pl-6 dark:border-gray-900">
              <div v-for="reply in comment.replies" :key="reply.id" class="group/reply flex gap-3">
                <div class="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                  <img :src="reply.avatar" class="h-full w-full object-cover" />
                </div>
                <div class="flex flex-1 flex-col">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-black uppercase text-gray-800 dark:text-gray-50">
                      {{ reply.author }}
                    </span>
                    <button
                      @click="deleteReply(comment.id, reply.id)"
                      class="opacity-0 group-hover/reply:opacity-100 text-gray-400 hover:text-red-500 cursor-pointer transition-all"
                    >
                      <Trash2 :size="12" />
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-200">
                    {{ reply.text }}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>