# FinApp Frontend

[In English](./README.md)

## Visão Geral

O FinApp Frontend é uma interface web moderna e intuitiva para gerenciamento de finanças pessoais, projetada
especificamente para jovens adultos e adolescentes. Construído com Angular 19 e powered by Bun, este frontend oferece
uma experiência digital rápida, envolvente e acessível que substitui planilhas tradicionais por uma abordagem gamificada
ao gerenciamento financeiro.

---

## Propósito

Entregar uma aplicação web elegante e responsiva que torna o gerenciamento financeiro simples, rápido e atrativo,
promovendo educação financeira através de uma interface intuitiva e recursos práticos. Este frontend serve como a
interface do usuário do "Duolingo das finanças", focado em construir consciência financeira com design amigável e
experiência de usuário fluida.

---

## Público-Alvo

- **Primário**: Jovens adultos (18-25) e adolescentes (16-18)
- Nativos digitais que buscam simplicidade, velocidade e mobilidade em suas ferramentas financeiras
- Usuários em transição para independência financeira que preferem experiências visuais e interativas

---

## Proposta de Valor

- **UI/UX Moderna**: Interface limpa e intuitiva otimizada para usuários jovens
- **Velocidade Extrema**: Construído com Bun para desenvolvimento e performance ultra-rápidos
- **Design Responsivo**: Experiência perfeita em desktop, tablet e mobile
- **Atualizações em Tempo Real**: Sincronização de dados ao vivo com integração SignalR
- **Acessibilidade**: Projetado com inclusividade e facilidade de uso em mente

---

## Diferenciais do Projeto

- **Design Focado na Juventude**: Interface e linguagem adaptadas especificamente para usuários jovens
- **Performance Ultra-Rápida**: Runtime Bun proporciona velocidade e eficiência excepcionais
- **Progressive Web App**: Experiência similar a app móvel com capacidades offline
- **Micro-Interações**: Animações e feedback envolventes para melhor experiência do usuário
- **Orientado a Componentes**: Componentes Angular modulares e reutilizáveis para manutenibilidade

---

## Benefícios Esperados

- **Maior Engajamento do Usuário**: Rastreamento financeiro interativo e gamificado
- **Melhores Hábitos Financeiros**: Insights visuais promovem maior consciência de gastos
- **Experiência Fluida**: Tempos de carregamento rápidos e navegação suave
- **Consistência Cross-Platform**: Experiência unificada em todos os dispositivos
- **Integração Educacional**: Dicas financeiras integradas e orientação sem friction

---

## Escopo do Frontend

### Inclui:

- **Autenticação de Usuário**: Login, registro e gerenciamento de perfil
- **Dashboard**: Visão geral financeira em tempo real e métricas principais
- **Gerenciamento de Transações**: Adicionar, editar e categorizar receitas/despesas _(em andamento)_
- **Acompanhamento de Orçamento**: Gerenciamento visual de orçamento e definição de metas _(em andamento)_
- **Relatórios Financeiros**: Gráficos interativos e insights de gastos _(em andamento)_
- **Design Responsivo**: Abordagem mobile-first com capacidades PWA
- **Recursos em Tempo Real**: Atualizações ao vivo via integração SignalR _(em andamento)_
- **Acessibilidade**: Design de interface compatível com WCAG

### Não inclui:

- **Lógica de Backend**: Toda lógica de negócios tratada pela API FinApp
- **Acesso Direto ao Banco**: Gerenciamento de dados apenas através de endpoints da API
- **Processamento de Pagamentos**: Transações financeiras tratadas pelo backend
- **Apps Móveis Nativos**: Solução baseada na web com capacidades PWA

---

## Stack Tecnológica

- **Framework**: Angular 19 com componentes standalone
- **Runtime**: Bun (gerenciador de pacotes e bundler)
- **Estilização**: Tailwind CSS + Angular Material
- **Gerenciamento de Estado**: NgRx para manipulação de estado complexo
- **Gráficos**: Chart.js para visualizações financeiras
- **Cliente HTTP**: Angular HttpClient com interceptors
- **Tempo Real**: Integração SignalR client
- **Testes**: Jasmine + Karma + Jest
- **PWA**: Angular Service Worker
- **Ferramenta de Build**: Angular CLI com integração Bun

---

## Como Executar

### Pré-requisitos

- Node.js (versão LTS mais recente)
- Runtime Bun
- Git
- Backend FinApp rodando (para integração com API)

### Instalação

**Instale o Bun (se ainda não estiver instalado):**

```bash
curl -fsSL https://bun.sh/install | bash
```

**Clone o repositório:**

```bash
git clone https://github.com/AppFin/fin-frontend.git
cd fin-frontend
```

**Instale as dependências:**

```bash
bun install
```

**Configure o ambiente:**

- Copie `src/environments/environment.example.ts` para `src/environments/environment.ts`
- Atualize os endpoints da API e configuração baseada na configuração do seu backend

### Comandos de Desenvolvimento

**Iniciar servidor de desenvolvimento:**

```bash
bun start
# ou
ng serve
```

**Build para produção:**

```bash
bun run build
# ou
ng build
```

**Executar testes:**

```bash
bun test
# ou
ng test
```

**Executar testes e2e:**

```bash
bun run e2e
# ou
ng e2e
```

**Lint do código:**

```bash
bun run lint
# ou
ng lint
```

---

## Servidor de Desenvolvimento

A aplicação roda em `http://localhost:4200/` com hot module replacement habilitado. O servidor de desenvolvimento
recarrega automaticamente quando você modifica arquivos fonte.

### Geração de Código

Gere novos componentes, serviços e outros schematics do Angular:

```bash
# Gerar um novo componente
ng generate component components/component-name

# Gerar um novo serviço
ng generate service services/service-name

# Gerar um novo módulo
ng generate module modules/module-name

# Ver todos os schematics disponíveis
ng generate --help
```

## Integração com API

Este frontend integra com a API Backend do FinApp. Certifique-se de que o backend está rodando e acessível no endpoint
configurado no seu arquivo de ambiente.

---

## Licença

Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes

---

*Este README reflete a visão, arquitetura e abordagem de desenvolvimento do FinApp Frontend, fornecendo orientação clara
para desenvolvedores e contribuidores trabalhando na interface do usuário.*