# 🛍️ Loja Digital - Produtos Digitais

## Descrição

Loja online moderna e responsiva para venda de produtos digitais, desenvolvida com HTML, CSS e JavaScript puro. Design otimizado para dispositivos móveis com animações suaves e interface intuitiva.

## 🎯 Funcionalidades

### ✨ Principais Recursos

- **Cards de Produtos**: Exibição elegante com imagens, preços e botões de ação
- **Sistema de Favoritos**: Adicione produtos aos favoritos com um clique no coração
- **Carrinho de Compras**: Adicione, visualize e remova produtos do carrinho
- **Pesquisa em Tempo Real**: Campo de busca funcional que filtra produtos instantaneamente
- **Modal de Detalhes**: Clique na imagem do produto para ver informações completas
- **Animações Suaves**: Transições e animações em todos os elementos interativos
- **Design Responsivo**: Perfeito em todos os tamanhos de tela, especialmente mobile
- **Persistência de Dados**: Carrinho e favoritos salvos no LocalStorage

### 🎨 Design

- **Fundo**: Preto (#000000) para destaque dos produtos
- **Cards**: Brancos (#FFFFFF) com sombras elegantes
- **Cor de Destaque**: Vermelho vibrante (#ff6b6b) para botões e preços
- **Layout Mobile-First**: Máximo de 2 produtos por linha
- **Tipografia**: Fonte moderna e legível (System Font Stack)

## 📱 Responsividade

O site foi desenvolvido com foco em dispositivos móveis:

- **Mobile**: 2 produtos por linha (design principal)
- **Tablet**: 2 produtos por linha
- **Desktop**: 3 produtos por linha (telas grandes)

## 🚀 Como Usar

### Instalação

1. Extraia o arquivo `loja-online.zip`
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Pronto! A loja está funcionando

### Estrutura de Arquivos

```
loja-online/
├── index.html      # Estrutura HTML principal
├── styles.css      # Estilos e animações
├── script.js       # Funcionalidades JavaScript
└── README.md       # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização, Grid Layout, Flexbox, Animações
- **JavaScript ES6+**: Funcionalidades interativas
- **LocalStorage API**: Persistência de dados
- **Unsplash**: Imagens de exemplo dos produtos

## 📦 Produtos Incluídos

O site vem com 12 produtos digitais de exemplo:

1. E-book: Guia Completo de Marketing Digital
2. Curso Online: Programação Web Completa
3. Template Premium: Landing Page Profissional
4. Pack de Ícones: 5000+ Ícones Premium
5. E-book: Finanças Pessoais para Iniciantes
6. Curso: Design Gráfico Profissional
7. Plugin WordPress: SEO Master Pro
8. E-book: Receitas Fitness Completo
9. Curso: Fotografia Digital Avançada
10. Template: Dashboard Admin Completo
11. E-book: Produtividade Máxima
12. Curso: Edição de Vídeo Profissional

## 🎯 Funcionalidades Detalhadas

### Pesquisa de Produtos

Digite qualquer termo no campo de pesquisa para filtrar produtos em tempo real. A busca funciona tanto no nome quanto na descrição dos produtos.

### Sistema de Favoritos

- Clique no coração branco (🤍) para adicionar aos favoritos
- O coração fica vermelho (❤️) quando favoritado
- Acesse seus favoritos clicando no ícone de coração no header
- Badge mostra a quantidade de favoritos

### Carrinho de Compras

- Clique em "Adicionar ao Carrinho" em qualquer produto
- Visualize o carrinho clicando no ícone 🛒 no header
- Badge mostra a quantidade de itens
- Remova produtos individualmente
- Veja o total da compra em tempo real
- Finalize a compra com um clique

### Modal de Detalhes

- Clique na imagem de qualquer produto
- Veja informações completas: descrição e características
- Compre diretamente ou adicione ao carrinho
- Animação suave de abertura e fechamento
- Feche clicando no X, fora do modal ou pressionando ESC

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --bg-color: #000000;        /* Cor de fundo */
    --card-bg: #ffffff;         /* Cor dos cards */
    --text-primary: #ffffff;    /* Texto principal */
    --text-secondary: #000000;  /* Texto secundário */
    --accent-color: #ff6b6b;    /* Cor de destaque */
    --accent-hover: #ff5252;    /* Cor de hover */
}
```

### Adicionar Novos Produtos

Edite o array `products` no arquivo `script.js`:

```javascript
const products = [
    {
        id: 13,
        name: "Nome do Produto",
        price: 99.90,
        image: "URL_DA_IMAGEM",
        description: "Descrição detalhada do produto",
        features: [
            "Característica 1",
            "Característica 2",
            "Característica 3"
        ]
    },
    // ... mais produtos
];
```

## 🌟 Destaques Técnicos

- **Zero Dependências**: Não usa bibliotecas externas
- **Performance**: Carregamento rápido e otimizado
- **Acessibilidade**: Estrutura semântica e navegação por teclado
- **SEO Friendly**: Meta tags e estrutura adequada
- **Cross-Browser**: Funciona em todos os navegadores modernos

## 📱 Compatibilidade

- ✅ Chrome/Edge (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Opera (versão 76+)
- ✅ Navegadores Mobile (iOS Safari, Chrome Mobile)

## 💡 Dicas de Uso

1. **Imagens**: Substitua as URLs do Unsplash por suas próprias imagens
2. **Preços**: Ajuste os preços conforme seus produtos
3. **Cores**: Personalize as cores para combinar com sua marca
4. **Produtos**: Adicione quantos produtos quiser no array
5. **Integração**: Conecte com backend para processar pagamentos reais

## 🚀 Próximos Passos

Para transformar em uma loja real:

1. Integre com gateway de pagamento (Stripe, PayPal, Mercado Pago)
2. Adicione backend para gerenciar produtos e pedidos
3. Implemente sistema de login de usuários
4. Adicione painel administrativo
5. Configure envio automático de produtos digitais

## 📄 Licença

Este projeto é livre para uso pessoal e comercial. Modifique como desejar!

## 🎉 Aproveite sua Loja Digital!

Desenvolvido com ❤️ por Manus
