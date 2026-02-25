/**
 * @file src/player/SharedModal.vue
 * @description Componente de modal para compartilhamento de conteúdo. Oferece integração visual com redes sociais e funcionalidade de cópia de URL para a área de transferência.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { ref } from 'vue'
import { X, Copy, Facebook, Twitter, Mail, MessageCircle, Send } from 'lucide-vue-next'

// Definição das propriedades para controle de visibilidade e fonte do link
defineProps<{
  isOpen: boolean
  videoUrl: string
}>()

// Emissão de eventos para fechamento do modal
const emit = defineEmits(['close'])

// Estado reativo para feedback visual de cópia bem-sucedida
const copied = ref(false)

/**
 * @description Copia a URL do vídeo para a área de transferência do navegador e ativa o feedback temporário.
 * @param {string} url - Link a ser copiado.
 */
const copyLink = async (url: string) => {
  await navigator.clipboard.writeText(url)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

// Configuração das plataformas de compartilhamento com suas respectivas cores e ícones
const platforms = [
  { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { name: 'X', icon: Twitter, color: 'text-gray-800 dark:text-gray-100', bg: 'bg-gray-800/10 dark:bg-gray-100/10' },
  { name: 'E-mail', icon: Mail, color: 'text-gray-500', bg: 'bg-gray-500/10' },
  { name: 'Telegram', icon: Send, color: 'text-sky-500', bg: 'bg-sky-500/10' }
]
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-xs">
        <div
          @click.stop
          class="relative w-full max-w-md animate-in zoom-in-95 duration-300 rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
        >
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-base font-black text-gray-800 dark:text-gray-50 uppercase tracking-tight">Compartilhar</h3>
            <button @click="emit('close')" class="rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer">
              <X :size="20" />
            </button>
          </div>

          <div class="mb-8 grid grid-cols-4 gap-4">
            <button
              v-for="app in platforms"
              :key="app.name"
              class="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <div :class="['flex h-12 w-12 items-center justify-center rounded-full transition-transform group-active:scale-90', app.bg]">
                <component :is="app.icon" :class="['h-6 w-6', app.color]" />
              </div>
              <span class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">{{ app.name }}</span>
            </button>
          </div>

          <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
            <input
              type="text"
              readonly
              :value="videoUrl"
              class="flex-1 bg-transparent text-xs font-medium text-gray-500 dark:text-200 outline-none"
            >
            <button
              @click="copyLink(videoUrl)"
              :class="[
                'flex items-center gap-2 rounded-lg px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer',
                copied ? 'bg-green-500 text-white' : 'bg-gray-800 text-white dark:bg-gray-50 dark:text-gray-950 hover:opacity-90'
              ]"
            >
              <Copy v-if="!copied" :size="14" />
              <span>{{ copied ? 'Copiado!' : 'Copiar' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>