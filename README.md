# 🐾 Wizard de Configuração - Pet Food Delivery

Sistema completo de configuração para criação de sites de Pet Food Delivery com wizard interativo de 5 etapas. Desenvolvido com **HTML5, Tailwind CSS, JavaScript Vanilla e SweetAlert2** - sem frameworks pesados.

## 🚀 Visão Geral

Aplicação web moderna e responsiva que guia o usuário através de um processo intuitivo de configuração de site para delivery de ração e produtos pet. Com validação em tempo real, persistência de dados, dashboard preview e sistema de progresso visual.

> ⚠️ **AVISO IMPORTANTE - PROTÓTIPO**
> 
> Este projeto é um **protótipo/esboço visual** desenvolvido para demonstrar a interface e fluxo de um wizard de configuração. O Dashboard (Passo 5) exibe apenas **dados simulados e mockados** sem funcionalidades reais ou integração com backend. O objetivo é expressar graficamente a ideia e conceito para um futuro desenvolvimento completo com funcionalidades reais.

![Screenshot](https://via.placeholder.com/800x400/a855f7/ffffff?text=Pet+Food+Delivery+Wizard)

## ✨ Funcionalidades Implementadas

### ✅ Wizard Completo com 5 Etapas

#### 📋 **Passo 1: Informações Básicas**
- ✅ Nome do estabelecimento (obrigatório)
- ✅ Descrição do negócio (obrigatório)
- ✅ Telefone comercial (obrigatório)
- ✅ WhatsApp para contato (obrigatório)
- ✅ E-mail com validação (obrigatório)
- ✅ Endereço/região de atendimento (obrigatório)
- 🎨 Preview visual em tempo real

#### ⏰ **Passo 2: Horários de Funcionamento**
- ✅ Configuração individual para cada dia da semana
- ✅ Toggle para marcar dias como fechados
- ✅ Horários de abertura e fechamento
- ✅ Validação de pelo menos um dia aberto
- ⚡ **Ações Rápidas:**
  - Abrir todos os dias (9h-18h)
  - Apenas dias úteis (segunda a sexta)
- 🎨 Cards visuais com status (Aberto/Fechado)

#### 🚚 **Passo 3: Entrega e Pagamento**
- ✅ **Formas de Entrega** (obrigatório ao menos 1):
  - Delivery Próprio
  - Delivery Terceiros (iFood, Rappi, etc)
  - Retirada no Local
- ✅ **Métodos de Pagamento** (obrigatório ao menos 1):
  - Dinheiro
  - Cartão de Débito
  - Cartão de Crédito
  - PIX
  - Vale Alimentação
- ✅ **Categorias de Produtos** (obrigatório ao menos 1):
  - Sistema de tags personalizáveis
  - Adicionar/remover categorias dinamicamente
  - Exemplos: Ração Premium, Petiscos, Brinquedos, etc.

#### 🎨 **Passo 4: Identidade Visual**
- ✅ **Upload de Logotipo** (obrigatório)
  - Preview em tempo real
  - Suporte para imagens (JPG, PNG, etc)
- ✅ **Cor Primária** (obrigatório)
  - Seletor de cor com preview
  - Input manual de código HEX
  - Cubo 3D interativo com a cor
- ✅ **Cor Secundária** (obrigatório)
  - Seletor de cor com preview
  - Input manual de código HEX
  - Cubo 3D interativo com a cor
- 🎨 **Paletas Prontas:**
  - Roxo & Rosa
  - Azul & Verde
  - Laranja & Vermelho
  - Violeta & Ciano
- ✨ Cubos 3D com efeito hover e rotação
- ✅ Validação de cores obrigatórias

#### 📊 **Passo 5: Dashboard Preview**

> ⚠️ **IMPORTANTE:** Este dashboard é apenas um **esboço visual/protótipo** sem funcionalidades reais. Os dados exibidos são simulados e servem apenas para demonstrar graficamente como seria um dashboard futuro. Não há integração com banco de dados ou APIs reais nesta versão.

- 📈 Métricas simuladas (valores fictícios):
  - Total de Vendas (R$)
  - Pedidos realizados
  - Total de Clientes
  - Avaliação média
- 📊 Gráficos de vendas por categoria (dados mockados)
- 📋 Tabela de pedidos recentes (exemplos visuais)
- 🎨 Design baseado nas cores escolhidas
- ⚡ Animações suaves de carregamento
- 🎯 **Objetivo:** Expressar graficamente a ideia para desenvolvimento futuro

### 🎯 Recursos Principais

#### 🔐 Sistema de Validação
- ✅ Validação em tempo real de todos os campos
- ✅ Mensagens de erro contextuais e claras
- ✅ Validação de formato de e-mail
- ✅ Validação de campos obrigatórios
- ✅ Validação de cores no formato HEX
- ✅ Bloqueio de navegação sem preencher campos obrigatórios
- 🎨 Alertas visuais com SweetAlert2

#### 🎨 Interface e UX
- ✅ **Menu Lateral Responsivo** com:
  - Navegação direta entre passos
  - Indicador de passo ativo
  - Widget de progresso circular 3D
  - Estimativa de tempo restante
  - Contador de passos completos
- ✅ **Barra de Progresso Visual** no topo
- ✅ **Indicadores de Passo** com checkmarks
- ✅ **Botões de Navegação** (Próximo/Voltar/Publicar)
- ✅ **Animações Suaves** em todas as transições
- ✅ **Design Full-Screen** imersivo
- ✅ **100% Responsivo** (Mobile, Tablet, Desktop)
- ✅ **Modo Escuro** no menu lateral

#### 💾 Persistência e Dados
- ✅ **Auto-save** - Salvamento automático no localStorage
- ✅ **Recuperação de Dados** - Continua de onde parou
- ✅ **Reset Completo** - Opção de recomeçar do zero
- ✅ **Chave de Storage:** `wizard_pet_food_data`

#### 📊 Sistema de Progresso
- ✅ **Widget "Progresso Geral"** clicável
- ✅ **Popup Detalhado** mostrando:
  - Passos completos vs pendentes
  - Lista de campos faltantes por passo
  - Botões para navegar direto ao passo
  - Ícones visuais por categoria
- ✅ **Cálculo Inteligente** baseado em:
  - Passo 1: 6 campos obrigatórios
  - Passo 2: Pelo menos 1 dia com horário
  - Passo 3: Entrega + Pagamento + Categorias
  - Passo 4: Cores + Logotipo

#### 🎭 Resumo Final
- ✅ **Visualização Completa** de todas as informações
- ✅ **Botões de Edição** em cada seção
- ✅ **Preview das Cores** com cubos 3D
- ✅ **Exibição do Logotipo** enviado
- ✅ **Horários Formatados** por dia
- ✅ **Tags Visuais** para categorias
- ✅ **Botão Publicar** para finalizar

#### ⚡ Funcionalidades Avançadas
- ✅ **Cubos 3D Interativos** para cores
- ✅ **Paletas de Cores Prontas** (4 opções)
- ✅ **Ações Rápidas** para horários
- ✅ **Dashboard Animado** com métricas
- ✅ **Sistema de Tags** para categorias
- ✅ **Upload de Imagem** com preview
- ✅ **Validação de Cores HEX** em tempo real  

## 🛠️ Tecnologias e Arquitetura

### Stack Principal
- **HTML5** - Estrutura semântica e acessível
- **Tailwind CSS 3.x** - Framework CSS via CDN
- **JavaScript ES6+** - Vanilla JS modular
- **SweetAlert2** - Alertas e modais elegantes
- **Font Awesome** - Ícones vetoriais
- **localStorage API** - Persistência client-side

### Arquitetura do Código

```
PROJETO INDEX/
├── index.html                 # Estrutura HTML principal
├── js/
│   ├── state.js              # Gerenciamento de estado global
│   ├── init.js               # Inicialização da aplicação
│   ├── handlers.js           # Navegação e handlers principais
│   ├── ui.js                 # Atualizações de interface
│   ├── validation.js         # Sistema de validação
│   ├── sidebar.js            # Controle do menu lateral
│   ├── sidebar-widget.js     # Widget de progresso
│   ├── progress-details.js   # Popup de detalhes
│   ├── summary.js            # Geração do resumo
│   ├── events.js             # Event listeners
│   ├── forms.js              # Manipulação de formulários
│   ├── quick-actions.js      # Ações rápidas de horários
│   ├── visual-identity.js    # Cubos 3D e cores
│   ├── mobile-ui.js          # Adaptações mobile
│   └── dashboard.js          # Dashboard preview
├── README.md                  # Documentação
├── FUNCOES-RENOMEADAS.md     # Mapeamento de funções
└── FUNCTION-MAPPING.md       # Guia de refatoração
```

### Padrões de Código
- ✅ **Modularização** - Separação por responsabilidade
- ✅ **Nomenclatura em Português** - Funções e variáveis
- ✅ **Comentários Descritivos** - Código autodocumentado
- ✅ **Sem Dependências Pesadas** - Apenas CDNs leves
- ✅ **Performance Otimizada** - Animações com RAF

## 📋 Pré-requisitos

Nenhum! O projeto roda diretamente no navegador sem necessidade de instalação.

## 🔧 Como Executar

### Opção 1: Abrir Diretamente

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` no seu navegador
3. Pronto! O wizard está funcionando

### Opção 2: Servidor Local (Recomendado)

Se você tem Python instalado:

```bash
# Python 3
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000`

### Opção 3: Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

## � Categorias do Sistema

### 🏪 Informações do Negócio
- Nome do estabelecimento
- Descrição/slogan
- Dados de contato (telefone, WhatsApp, e-mail)
- Localização/região de atendimento

### ⏰ Gestão de Horários
- Segunda a Domingo
- Horário de abertura/fechamento
- Dias fechados
- Ações rápidas (todos os dias, apenas úteis)

### 🚚 Logística e Pagamentos
- **Entrega:**
  - Delivery próprio
  - Delivery terceirizado
  - Retirada no local
- **Pagamento:**
  - Dinheiro
  - Débito/Crédito
  - PIX
  - Vale Alimentação

### 🛍️ Catálogo de Produtos
- Sistema de categorias customizáveis
- Exemplos: Ração Premium, Ração Econômica, Petiscos, Brinquedos, Acessórios, Higiene, Medicamentos

### 🎨 Identidade Visual
- Logotipo da marca
- Paleta de cores (primária e secundária)
- Preview em tempo real
- Cubos 3D interativos

### 📊 Dashboard e Métricas

> ⚠️ **NOTA:** Todos os dados exibidos no dashboard são **fictícios e simulados**. Esta seção é apenas um esboço visual para demonstrar como seria um dashboard real em uma implementação futura.

- Vendas totais (valores mockados)
- Quantidade de pedidos (dados simulados)
- Base de clientes (números fictícios)
- Avaliações (exemplos visuais)
- Gráficos por categoria (dados de exemplo)

## 🎨 Personalização de Imagens

O projeto possui placeholders para imagens que você pode substituir:

### 1. Banner do Topo
Localize no `index.html` (linha ~60):
```html
<div class="image-placeholder w-full h-full">
```
Substitua por:
```html
<img src="sua-imagem-banner.jpg" class="w-full h-full object-cover" alt="Banner">
```

### 2. Imagem Ilustrativa (Passo 1)
Localize no `index.html` (linha ~200):
```html
<div class="image-placeholder h-32 rounded-xl">
```
Substitua por:
```html
<img src="sua-imagem.jpg" class="h-32 w-full object-cover rounded-xl" alt="Ilustração">
```

## 💾 Persistência de Dados

Os dados são automaticamente salvos no `localStorage` a cada alteração:
- **Chave de armazenamento:** `wizard_pet_food_data`
- Permite fechar e reabrir o navegador sem perder progresso
- Dados persistem até serem limpos manualmente

### Limpar Dados Salvos

Abra o Console do navegador (F12) e execute:
```javascript
localStorage.removeItem('wizard_pet_food_data');
location.reload();
```

## 🎯 Sistema de Validação Completo

### Campos Obrigatórios por Passo

#### ✅ Passo 1 - Informações Básicas
- Nome do estabelecimento (não vazio)
- Descrição (não vazio)
- Telefone (não vazio)
- WhatsApp (não vazio)
- E-mail (formato válido: `usuario@dominio.com`)
- Endereço/região (não vazio)

#### ✅ Passo 2 - Horários
- Pelo menos 1 dia configurado como aberto
- Horário de abertura preenchido
- Horário de fechamento preenchido

#### ✅ Passo 3 - Entrega e Pagamento
- Ao menos 1 forma de entrega selecionada
- Ao menos 1 método de pagamento selecionado
- Ao menos 1 categoria de produto adicionada

#### ✅ Passo 4 - Identidade Visual
- Cor primária selecionada (formato HEX)
- Cor secundária selecionada (formato HEX)
- **Logotipo enviado (obrigatório)**

### Comportamento de Validação
- ❌ **Bloqueio de Navegação:** Não permite avançar sem preencher campos obrigatórios
- 🔴 **Feedback Visual:** Campos inválidos ficam com borda vermelha
- 💬 **Mensagens Claras:** Alertas específicos para cada tipo de erro
- ✅ **Validação em Tempo Real:** Remove erros ao corrigir o campo

## 🎨 Design e UX

### Destaques Visuais

- **Gradientes modernos** em backgrounds e botões
- **Animações suaves** nas transições entre passos
- **Indicador de progresso visual** com checkmarks
- **Feedback imediato** em todas as interações
- **Placeholders animados** com efeito shimmer
- **Cores temáticas** relacionadas a pet shops
- **Sombras e profundidade** para hierarquia visual
- **Ícones SVG** para melhor performance

### Responsividade

- **Mobile First** - Design otimizado para celular
- **Breakpoints:** sm (640px), md (768px), lg (1024px)
- **Grid adaptativo** - Colunas ajustam automaticamente
- **Touch-friendly** - Botões e áreas de toque adequados

## 🧪 Funcionalidades JavaScript

### Gerenciamento de Estado

```javascript
const formData = {
    businessName: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    hours: {},
    deliveryMethods: [],
    paymentMethods: [],
    categories: [],
    primaryColor: '#22c55e',
    secondaryColor: '#3b82f6',
    logo: null
}
```

### Principais Funções

- `validateStep(step)` - Validação por etapa
- `saveToStorage()` - Persistência automática
- `loadFromStorage()` - Recuperação de dados
- `showSummary()` - Geração dinâmica do resumo
- `updateStepIndicator()` - Atualização visual do progresso

## 📦 Deploy

### Opções de Hospedagem Gratuita

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
1. Arraste a pasta do projeto para [netlify.com/drop](https://app.netlify.com/drop)
2. Pronto!

**GitHub Pages:**
1. Faça push para um repositório GitHub
2. Vá em Settings → Pages
3. Selecione a branch main
4. Seu site estará em `https://seu-usuario.github.io/repo-name`

## ✅ Critérios do Desafio Atendidos

✅ Wizard com 4 passos funcionais  
✅ Todos os campos obrigatórios implementados  
✅ Validação básica de campos  
✅ Navegação próximo/voltar  
✅ Resumo final antes de publicar  
✅ Persistência com localStorage  
✅ Layout responsivo (mobile → desktop)  
✅ Código limpo e organizado  
✅ JavaScript puro sem jQuery  
✅ Design moderno e atraente  
✅ Performance otimizada  
✅ Documentação completa  

## 🎓 Boas Práticas Aplicadas

- **Código semântico** - HTML5 com tags apropriadas
- **Separação de responsabilidades** - HTML/CSS/JS separados
- **Nomenclatura clara** - Variáveis e funções descritivas
- **Comentários úteis** - Documentação inline quando necessário
- **Performance** - Uso de CDN para Tailwind
- **Acessibilidade** - Labels e estrutura adequada
- **Mobile First** - Design responsivo desde o início

## 🐛 Troubleshooting

**Problema:** Dados não estão sendo salvos  
**Solução:** Verifique se o localStorage está habilitado no navegador

**Problema:** Imagens não aparecem  
**Solução:** Substitua os placeholders por suas próprias imagens

**Problema:** Cores não atualizam  
**Solução:** Verifique se o formato do hex está correto (#RRGGBB)

## 📄 Licença

Este projeto foi desenvolvido como desafio técnico para avaliação de habilidades front-end.

---

**Desenvolvido com ❤️ e JavaScript puro para o desafio de Desenvolvedor(a) Front-End**

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Adicionar testes

---

### 📞 Contato

Para dúvidas sobre o projeto, abra uma issue no repositório.

**Stack:** HTML5 • Tailwind CSS • JavaScript Vanilla  
**Sem dependências** • **Sem build** • **Sem frameworks**
