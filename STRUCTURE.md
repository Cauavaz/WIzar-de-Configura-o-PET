# Estrutura do Projeto - Pet Food Delivery Wizard

## 📁 Organização de Pastas

```
PROJETO INDEX/
├── index.html              # Arquivo principal HTML
├── README.md              # Documentação do projeto
├── STRUCTURE.md           # Este arquivo (estrutura do projeto)
├── app.js                 # Arquivo legado (pode ser removido)
│
├── js/                    # Módulos JavaScript
│   ├── init.js           # Inicialização da aplicação
│   ├── state.js          # Gerenciamento de estado e dados
│   ├── ui.js             # Atualizações de UI e display
│   ├── validation.js     # Validação de formulários
│   ├── handlers.js       # Manipuladores de eventos e navegação
│   ├── sidebar.js        # Funções do menu lateral
│   ├── forms.js          # Inicialização e população de formulários
│   ├── summary.js        # Exibição do resumo final
│   └── events.js         # Setup de event listeners
│
├── css/                   # Estilos (futuro)
│   └── (vazio - usar Tailwind CSS por enquanto)
│
└── assets/                # Recursos (imagens, ícones, etc)
    └── (vazio - para uso futuro)
```

## 📋 Descrição dos Módulos JavaScript

### `init.js`
- Ponto de entrada da aplicação
- Inicializa todos os módulos na ordem correta
- Executa no evento `DOMContentLoaded`

### `state.js`
- Gerenciamento centralizado de estado
- Funções de localStorage (save/load)
- Definição de estrutura de dados (`formData`)
- Dias da semana e constantes

### `ui.js`
- Atualização de indicadores de passos
- Exibição/ocultação de conteúdo
- Atualização de barra de progresso
- Gerenciamento de erros visuais

### `validation.js`
- Validação de campos por passo
- Regras de validação (email, campos obrigatórios, etc)
- Retorna booleano de validação

### `handlers.js`
- Navegação entre passos (next/prev)
- Publicação do site
- Edição de passos do resumo
- Lógica de fluxo do wizard

### `sidebar.js`
- Setup do menu lateral
- Toggle do sidebar em mobile
- Atualização de item ativo
- Navegação via sidebar

### `forms.js`
- Inicialização de horas
- Renderização de campos dinâmicos
- População de formulários com dados salvos
- Gerenciamento de categorias

### `summary.js`
- Geração do HTML do resumo
- Formatação de dados para exibição
- Atualização de indicadores no resumo

### `events.js`
- Setup de todos os event listeners
- Delegação de eventos
- Listeners para inputs, buttons, etc

## 🔄 Fluxo de Dados

```
init.js (inicializa)
  ↓
state.js (carrega dados)
  ↓
forms.js (popula campos)
  ↓
events.js (ativa listeners)
  ↓
ui.js (atualiza visual)
  ↓
handlers.js (responde a ações)
  ↓
validation.js (valida dados)
  ↓
state.js (salva dados)
```

## 💡 Benefícios da Organização

✅ **Separação de Responsabilidades** - Cada módulo tem um propósito claro
✅ **Fácil Manutenção** - Encontrar e editar código específico é mais rápido
✅ **Reutilização** - Funções podem ser importadas em outros projetos
✅ **Escalabilidade** - Fácil adicionar novos módulos ou funcionalidades
✅ **Testabilidade** - Cada módulo pode ser testado independentemente

## 🚀 Como Adicionar Novos Módulos

1. Criar novo arquivo em `js/` com nome descritivo
2. Adicionar funções relacionadas ao módulo
3. Importar no `index.html` antes de `init.js`
4. Chamar funções do novo módulo em `init.js` ou em outros módulos conforme necessário

## 📝 Próximos Passos (Opcional)

- [ ] Criar arquivo CSS modularizado em `css/`
- [ ] Adicionar testes unitários para cada módulo
- [ ] Implementar bundler (webpack/vite) para otimização
- [ ] Adicionar comentários JSDoc em cada função
- [ ] Criar arquivo de configuração centralizado
