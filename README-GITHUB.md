# Pet Food Delivery Wizard


> **AVISO IMPORTANTE - PROTÓTIPO**
> 
> Este projeto é um **protótipo/esboço visual** desenvolvido para demonstrar a interface e fluxo de um wizard de configuração. O Dashboard (Passo 5) exibe apenas **dados simulados e mockados** sem funcionalidades reais ou integração com backend. O objetivo é expressar graficamente a ideia e conceito para um futuro desenvolvimento completo com funcionalidades reais.

## Sobre o Projeto

Sistema completo de configuração para criação de sites de Pet Food Delivery com wizard interativo de 5 etapas. Desenvolvido com **HTML5, Tailwind CSS, JavaScript Vanilla e SweetAlert2** - sem frameworks pesados.

Aplicação web moderna e responsiva que guia o usuário através de um processo intuitivo de configuração de site para delivery de ração e produtos pet. Com validação em tempo real, persistência de dados, dashboard preview e sistema de progresso visual.

## Screenshots

### Interface Principal
![Interface Principal](https://via.placeholder.com/800x400/a855f7/ffffff?text=Pet+Food+Delivery+Wizard)

### Wizard de Configuração
![Wizard](https://via.placeholder.com/800x400/a855f7/ffffff?text=Wizard+Interativo)

### Dashboard Preview
![Dashboard](https://via.placeholder.com/800x400/a855f7/ffffff?text=Dashboard+Preview)

## Funcionalidades Principais

### Wizard Completo com 5 Etapas

#### Passo 1: Informações Básicas
- Nome do estabelecimento (obrigatório)
- Descrição do negócio (obrigatório)
- Telefone comercial (obrigatório)
- WhatsApp para contato (obrigatório)
- E-mail com validação (obrigatório)
- Endereço/região de atendimento (obrigatório)
- Preview visual em tempo real

#### Passo 2: Horários de Funcionamento
- Configuração individual para cada dia da semana
- Toggle para marcar dias como fechados
- Horários de abertura e fechamento
- Validação de pelo menos um dia aberto
- **Ações Rápidas:**
  - Abrir todos os dias (9h-18h)
  - Apenas dias úteis (segunda a sexta)
- Cards visuais com status (Aberto/Fechado)

#### Passo 3: Entrega e Pagamento
- **Formas de Entrega** (obrigatório ao menos 1):
  - Delivery Próprio
  - Delivery Terceiros (iFood, Rappi, etc)
  - Retirada no Local
- **Métodos de Pagamento** (obrigatório ao menos 1):
  - Dinheiro
  - Cartão de Débito
  - Cartão de Crédito
  - PIX
  - Vale Alimentação
- **Categorias de Produtos** (obrigatório ao menos 1):
  - Sistema de tags personalizáveis
  - Adicionar/remover categorias dinamicamente

#### Passo 4: Identidade Visual
- **Upload de Logotipo** (obrigatório)
  - Preview em tempo real
  - Suporte para imagens (JPG, PNG, etc)
- **Cor Primária** (obrigatório)
  - Seletor de cor com preview
  - Input manual de código HEX
  - Cubo 3D interativo com a cor
- **Cor Secundária** (obrigatório)
  - Seletor de cor com preview
  - Input manual de código HEX
  - Cubo 3D interativo com a cor
- **Paletas Prontas:**
  - Roxo & Rosa
  - Azul & Verde
  - Laranja & Vermelho
  - Violeta & Ciano
- Cubos 3D com efeito hover e rotação

#### Passo 5: Dashboard Preview

> **IMPORTANTE:** Este dashboard é apenas um esboço visual/protótipo sem funcionalidades reais. Os dados exibidos são simulados e servem apenas para demonstrar graficamente como seria um dashboard futuro. Não há integração com banco de dados ou APIs reais nesta versão.

- Métricas simuladas (valores fictícios)
- Gráficos de vendas por categoria (dados mockados)
- Tabela de pedidos recentes (exemplos visuais)
- Design baseado nas cores escolhidas
- Animações suaves de carregamento
- **Objetivo:** Expressar graficamente a ideia para desenvolvimento futuro

## Tecnologias Utilizadas

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

## Como Executar

### Pré-requisitos
Nenhum! O projeto roda diretamente no navegador sem necessidade de instalação.

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

## Características Técnicas

### Sistema de Validação
- Validação em tempo real de todos os campos
- Mensagens de erro contextuais e claras
- Validação de formato de e-mail
- Validação de campos obrigatórios
- Validação de cores no formato HEX
- Bloqueio de navegação sem preencher campos obrigatórios
- Alertas visuais com SweetAlert2

### Interface e UX
- **Menu Lateral Responsivo** com navegação direta
- **Widget de progresso circular 3D** clicável
- **Barra de Progresso Visual** no topo
- **Indicadores de Passo** com checkmarks
- **Animações Suaves** em todas as transições
- **Design Full-Screen** imersivo
- **100% Responsivo** (Mobile, Tablet, Desktop)

### Persistência e Dados
- **Auto-save** - Salvamento automático no localStorage
- **Recuperação de Dados** - Continua de onde parou
- **Reset Completo** - Opção de recomeçar do zero
- **Chave de Storage:** `wizard_pet_food_data`

## Categorias do Sistema

### Informações do Negócio
- Nome do estabelecimento
- Descrição/slogan
- Dados de contato (telefone, WhatsApp, e-mail)
- Localização/região de atendimento

### Gestão de Horários
- Segunda a Domingo
- Horário de abertura/fechamento
- Dias fechados
- Ações rápidas (todos os dias, apenas úteis)

### Logística e Pagamentos
- **Entrega:** Delivery próprio, Delivery terceirizado, Retirada no local
- **Pagamento:** Dinheiro, Débito/Crédito, PIX, Vale Alimentação

### Catálogo de Produtos
- Sistema de categorias customizáveis
- Exemplos: Ração Premium, Ração Econômica, Petiscos, Brinquedos, Acessórios

### Identidade Visual
- Logotipo da marca
- Paleta de cores (primária e secundária)
- Preview em tempo real
- Cubos 3D interativos

### Dashboard e Métricas

> **NOTA:** Todos os dados exibidos no dashboard são fictícios e simulados. Esta seção é apenas um esboço visual para demonstrar como seria um dashboard real em uma implementação futura.

- Vendas totais (valores mockados)
- Quantidade de pedidos (dados simulados)
- Base de clientes (números fictícios)
- Avaliações (exemplos visuais)
- Gráficos por categoria (dados de exemplo)

## Sistema de Validação Completo

### Campos Obrigatórios por Passo

#### Passo 1 - Informações Básicas
- Nome do estabelecimento (não vazio)
- Descrição (não vazio)
- Telefone (não vazio)
- WhatsApp (não vazio)
- E-mail (formato válido: `usuario@dominio.com`)
- Endereço/região (não vazio)

#### Passo 2 - Horários
- Pelo menos 1 dia configurado como aberto
- Horário de abertura preenchido
- Horário de fechamento preenchido

#### Passo 3 - Entrega e Pagamento
- Ao menos 1 forma de entrega selecionada
- Ao menos 1 método de pagamento selecionado
- Ao menos 1 categoria de produto adicionada

#### Passo 4 - Identidade Visual
- Cor primária selecionada (formato HEX)
- Cor secundária selecionada (formato HEX)
- **Logotipo enviado (obrigatório)**

### Comportamento de Validação
- **Bloqueio de Navegação:** Não permite avançar sem preencher campos obrigatórios
- **Feedback Visual:** Campos inválidos ficam com borda vermelha
- **Mensagens Claras:** Alertas específicos para cada tipo de erro
- **Validação em Tempo Real:** Remove erros ao corrigir o campo

## Responsividade

- **Mobile First** - Design otimizado para celular
- **Breakpoints:** sm (640px), md (768px), lg (1024px)
- **Grid adaptativo** - Colunas ajustam automaticamente
- **Touch-friendly** - Botões e áreas de toque adequados

## Design e UX

### Destaques Visuais
- **Gradientes modernos** em backgrounds e botões
- **Animações suaves** nas transições entre passos
- **Indicador de progresso visual** com checkmarks
- **Feedback imediato** em todas as interações
- **Cores temáticas** relacionadas a pet shops
- **Sombras e profundidade** para hierarquia visual
- **Ícones SVG** para melhor performance

## Deploy

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

## Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Adicionar testes

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com JavaScript puro para demonstração de conceito**

## Contato

Para dúvidas sobre o projeto, abra uma issue no repositório.

**Stack:** HTML5 • Tailwind CSS • JavaScript Vanilla  
**Sem dependências** • **Sem build** • **Sem frameworks**

---

> **Lembre-se:** Este é um protótipo conceitual. Para uma implementação completa, seriam necessários backend, banco de dados e integrações reais.
