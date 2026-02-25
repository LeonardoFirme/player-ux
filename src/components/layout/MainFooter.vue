/**
 * @file src/components/layout/MainsFooter.vue
 * @description Rodapé institucional da aplicação. Organiza links de termos, políticas e redes sociais com um layout responsivo e minimalista.
 * @author Leonardo Firme
 * @version v1.0.0
 */

<script setup lang="ts">
import { Github, Linkedin, Package } from 'lucide-vue-next'

// Links institucionais e de ajuda
const links = [
  { name: 'Sobre', href: '#' },
  { name: 'Imprensa', href: '#' },
  { name: 'Direitos autorais', href: '#' },
  { name: 'Entre em contato', href: '#' },
  { name: 'Criadores de conteúdo', href: '#' },
  { name: 'Publicidade', href: '#' },
  { name: 'Desenvolvedores', href: '#' }
]

// Links de termos legais e recursos experimentais
const terms = [
  { name: 'Termos', href: '#' },
  { name: 'Privacidade', href: '#' },
  { name: 'Política e segurança', href: '#' },
  { name: 'Como funciona o Player UX', href: '#' },
  { name: 'Testar novos recursos', href: '#' }
]

// Redes sociais e perfis profissionais (Leonardo Firme / v0 Digital)
const social = [
  { icon: Github, href: 'https://github.com/LeonardoFirme' },
  { icon: Package, href: 'https://www.npmjs.com/~leonardofirme' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/leonardofirme/' },
]
</script>

<template>
  <footer class="mt-auto w-full border-t border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
    <div class="mx-auto flex max-w-7xl flex-col gap-8">

      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          class="text-[11px] font-black uppercase tracking-widest text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-50"
        >
          {{ link.name }}
        </a>
      </div>

      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <a
          v-for="term in terms"
          :key="term.name"
          :href="term.href"
          class="text-[11px] font-black uppercase tracking-widest text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-50"
        >
          {{ term.name }}
        </a>
      </div>

      <div class="flex flex-col items-center justify-between gap-6 pt-4 lg:flex-row">
        <div class="flex items-center gap-4">
          <div class="group relative flex items-center justify-center">
                <img src="../../assets/logo.svg" class="h-6 w-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" alt="Logo">
            </div>
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            © 2026 Player UX • Todos os direitos reservados
          </span>
        </div>

        <div class="flex items-center gap-2">
          <a
            v-for="(item, index) in social"
            :key="index"
            :href="item.href"
            target="_blank"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-all hover:bg-gray-800 hover:text-white dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-50 dark:hover:text-gray-950 cursor-pointer active:scale-90"
          >
            <component :is="item.icon" :size="18" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>