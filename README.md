# 🐾 Wizard de Configuração - Pet Food Delivery

Aplicação web responsiva e full-screen para configuração rápida de sites de entrega de ração para animais. Desenvolvida com **HTML puro, Tailwind CSS e JavaScript Vanilla** (sem frameworks).

## 🚀 Demonstração

Este projeto implementa um wizard multi-etapas (4 passos) com design moderno e responsivo que ocupa toda a tela, proporcionando uma experiência imersiva.

![Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Adicione+seu+screenshot+aqui)

## ✨ Funcionalidades Implementadas

### ✅ Wizard Completo com 4 Etapas

1. **Informações Básicas** 
   - Nome do estabelecimento
   - Descrição do negócio
   - Telefone, WhatsApp e E-mail
   - Endereço/região de atendimento

2. **Horários de Funcionamento**
   - Configuração individual para cada dia da semana
   - Opção de marcar dias como fechados
   - Horários de abertura e fechamento

3. **Entrega e Pagamento**
   - Formas de entrega (Delivery próprio/terceiros/retirada)
   - Métodos de pagamento (Dinheiro, Débito, Crédito, PIX, Vale)
   - Categorias de produtos personalizáveis

4. **Identidade Visual**
   - Upload de logotipo (opcional)
   - Seleção de cor primária
   - Seleção de cor secundária
   - Prévia em tempo real das cores

### 🎯 Recursos Principais

✅ **Validação Completa** - Validação em tempo real com mensagens de erro claras  
✅ **Navegação Intuitiva** - Botões próximo/voltar com indicador visual de progresso  
✅ **Resumo Final** - Visualização completa antes de publicar com opção de editar cada seção  
✅ **Persistência Local** - Dados salvos automaticamente no localStorage  
✅ **Design Full-Screen** - Layout que ocupa toda a tela com design imersivo  
✅ **100% Responsivo** - Adaptável para mobile, tablet e desktop  
✅ **JavaScript Puro** - Sem jQuery, sem frameworks - apenas Vanilla JS  
✅ **Placeholders para Imagens** - Áreas reservadas para você adicionar suas imagens  

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **Tailwind CSS** - Framework CSS via CDN (sem build necessário)
- **JavaScript Vanilla** - Lógica pura, sem dependências
- **localStorage API** - Persistência de dados

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

## 📁 Estrutura do Projeto

```
wizard-pet-food/
├── index.html          # Estrutura HTML completa
├── app.js             # Lógica JavaScript (Vanilla)
└── README.md          # Documentação
```

**Simples assim!** Apenas 2 arquivos principais.

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

## 🎯 Campos Obrigatórios

### Validações Implementadas

**Passo 1 - Informações Básicas:**
- ✅ Nome do estabelecimento (não vazio)
- ✅ Descrição (não vazio)
- ✅ Telefone (não vazio)
- ✅ WhatsApp (não vazio)
- ✅ E-mail (formato válido)
- ✅ Endereço/região (não vazio)

**Passo 3 - Entrega e Pagamento:**
- ✅ Ao menos uma forma de entrega
- ✅ Ao menos um método de pagamento
- ✅ Ao menos uma categoria de produto

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
