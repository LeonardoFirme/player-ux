# Player UX - v1.0.0 (apenas para estudo)

Estrutura de projeto de streaming de vídeo minimalista desenvolvida com **Vue.js 3** e **Tailwind CSS v4**, focada em performance, tipagem rigorosa e interface de usuário refinada.

![Leonardo Firme](https://img.shields.io/badge/Leonardo_Firme-fff1f0?style=for-the-badge&logo=data:image/png;base64,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&logoColor=white)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/LeonardoFirme/player-ux?color=gray&label=RELEASE&style=for-the-badge)](https://github.com/LeonardoFirme/player-ux/releases)
[![Vue Version](https://img.shields.io/badge/VUE-3.x-42b883?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Tailwind Version](https://img.shields.io/badge/TAILWIND-v4-06b6d4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🛠 Tech Stack

* **Core:** [Vue 3](https://vuejs.org/) (Composition API)
* **State Management:** [Pinia](https://pinia.vuejs.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Padrão @latest)
* **Icons:** [Lucide Vue Next](https://lucide.dev/)
* **Animations:** `canvas-confetti`, `tailwindcss-animate`
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)

---

## 💎 Diferenciais Técnicos

### 1. Design Minimalista & Responsivo
O layout foi construído seguindo diretrizes de alta precisão:
* **Modo Dark Nativo:** Implementação utilizando prefixos `dark:` em conformidade com as variáveis de cor da v0 Digital.
* **Tailwind v4:** Uso exclusivo das novas classes de gradiente (`bg-linear-to-br`) e ausência de arbitrary values `-[]`.
* **Foco em UX:** Sistema de busca com histórico persistente, transições suaves e feedbacks visuais dinâmicos.

### 2. Arquitetura de Componentes
* **Store Centralizada:** Gerenciamento de vídeos e preferências globais (Autoplay) via Pinia.
* **Composables:** Lógica de negócios (comentários, curtidas e respostas) encapsulada em `useComments.ts` para facilitar a manutenção.
* **Persistência:** Sincronização automática com `LocalStorage` para manter o estado do usuário entre sessões.

---

## 📂 Estrutura de Pastas

```text
├── src/                                         # Diretório raiz do código-fonte da aplicação
│   ├── App.vue                                  # Componente raiz que orquestra o layout global e rotas
│   ├── assets/                                  # Recursos estáticos e arquivos de estilo global
│   │   ├── logo.svg                             # Vetor de identidade visual da plataforma
│   │   └── main.css                             # Estilos globais e importações do Tailwind CSS v4
│   ├── components/                              # Componentes reutilizáveis da interface
│   │   ├── icons/                               # Biblioteca de componentes de ícones SVG
│   │   │   ├── IconCommunity.vue                # Ícone representativo de comunidade
│   │   │   ├── IconDocumentation.vue            # Ícone para links de documentação técnica
│   │   │   ├── IconEcosystem.vue                # Ícone referente ao ecossistema de ferramentas
│   │   │   ├── IconSupport.vue                  # Ícone para canais de suporte ao usuário
│   │   │   └── IconTooling.vue                  # Ícone para utilitários de desenvolvimento
│   │   ├── layout/                              # Componentes estruturais de arquitetura de página
│   │   │   ├── MainFooter.vue                   # Rodapé institucional com links e redes sociais
│   │   │   ├── MainHeader.vue                   # Cabeçalho com busca e identificação de usuário
│   │   │   └── NavigationSidebar.vue            # Menu lateral de navegação e biblioteca
│   │   └── player/                              # Componentes específicos da experiência do player
│   │       ├── PlaylistSidebar.vue              # Lista de vídeos recomendados e controle de autoplay
│   │       ├── ShareModal.vue                   # Modal de compartilhamento com redes sociais
│   │       ├── VideoComments.vue                # Sistema de threads e gestão de comentários
│   │       └── YoutubePlayer.vue                # Componente de Iframe otimizado para reprodução
│   ├── composables/                             # Lógica de negócio extraída (Composition API)
│   │   └── useComments.ts                       # Gerenciamento de estado e persistência de comentários
│   ├── main.ts                                  # Ponto de entrada para inicialização do Vue e Pinia
│   ├── stores/                                  # Gerenciamento de estado global (Pinia)
│   │   └── video.ts                             # Store de controle de vídeos e preferências do player
│   └── views/                                   # Páginas/Views principais da aplicação
│       └── HomeView.vue                         # View principal que integra o player e interações
├── tsconfig.app.json                            # Configurações TypeScript específicas para o App
├── tsconfig.json                                # Configuração mestre do compilador TypeScript
├── tsconfig.node.json                           # Configurações TS para o ambiente de execução Node
├── tsconfig.vitest.json                         # Definições de tipos para o ambiente de testes
├── vite.config.ts                               # Configurações de build, aliases e plugins do Vite
└── vitest.config.ts                             # Configuração do framework de testes unitários

```

---

## 🚀 Instalação e Execução

1. **Clone o repositório utilizando sua chave SSH pessoal:**
```bash
git clone git@github.com-pessoal:LeonardoFirme/player-ux.git

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Pacotes adicionais para funcionamento do player:**
```bash
npm install tailwindcss@latest @tailwindcss/vite@latest lucide-vue-next

```


4. **Inicie o ambiente de desenvolvimento:**
```bash
npm run dev

```


---

## 👤 Autor

**Leonardo Firme**

* GitHub: [@LeonardoFirme](https://github.com/LeonardoFirme)
* Company: [v0 Digital](https://github.com/v0digital)

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.

---