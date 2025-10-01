// Dados dos produtos (exemplo de produtos digitais)
const products = [
    {
        id: 1,
        name: "Janela Neflix em HD (mensal)",
        price: 10.00,
        image: "https://static.vecteezy.com/system/resources/previews/017/396/814/non_2x/netflix-mobile-application-logo-free-png.png",
        description: "Melhor preço só aqui!! Aproveite seus filmes e series por bem pouco!!",
        features: [
            "Produto 100% confiavel!",
            "Vendido por Ismael Vieira 😉",
        ]
    },
];

// Estado da aplicação
let cart = [];
let favorites = [];
let currentProducts = [...products];

// Elementos do DOM
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// Modais
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const cartModalClose = document.getElementById('cartModalClose');
const cartModalOverlay = document.getElementById('cartModalOverlay');

const favoritesModal = document.getElementById('favoritesModal');
const favoritesBtn = document.getElementById('favoritesBtn');
const favoritesModalClose = document.getElementById('favoritesModalClose');
const favoritesModalOverlay = document.getElementById('favoritesModalOverlay');

// Badges
const cartBadge = document.getElementById('cartBadge');
const favoritesBadge = document.getElementById('favoritesBadge');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderProducts(currentProducts);
    updateBadges();
    setupEventListeners();
});

// Renderizar produtos
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    productsToRender.forEach(product => {
        const isFavorite = favorites.some(fav => fav.id === product.id);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container" onclick="openProductModal(${product.id})">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="buyNow(${product.id})">Comprar Agora</button>
                    <button class="btn btn-secondary" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Abrir modal do produto
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('modalDescription').textContent = product.description;
    
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    document.getElementById('modalBuyBtn').onclick = () => buyNow(productId);
    document.getElementById('modalCartBtn').onclick = () => {
        addToCart(productId);
        closeModal(productModal);
    };
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        showNotification('Produto já está no carrinho! 🛒');
        return;
    }
    
    cart.push(product);
    updateBadges();
    saveToLocalStorage();
    showNotification('Produto adicionado ao carrinho! ✅');
}

// Remover do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateBadges();
    saveToLocalStorage();
    renderCart();
    showNotification('Produto removido do carrinho! 🗑️');
}

// Comprar agora
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Criar mensagem para WhatsApp
    const message = `🛍️ *Olá! Gostaria de comprar:*\n\n` +
                   `📦 *Produto:* ${product.name}\n` +
                   `💰 *Valor:* R$ ${product.price.toFixed(2).replace('.', ',')}\n\n` +
                   `Aguardo retorno para finalizar a compra! 😊`;
    
    // Número do WhatsApp (sem caracteres especiais)
    const phoneNumber = '5585985074830';
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Criar URL do WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Fechar modal se estiver aberto
    closeModal(productModal);
    
    showNotification('Redirecionando para o WhatsApp... 📱');
}

// Toggle favorito
function toggleFavorite(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = favorites.findIndex(fav => fav.id === productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removido dos favoritos! 💔');
    } else {
        favorites.push(product);
        showNotification('Adicionado aos favoritos! ❤️');
    }
    
    updateBadges();
    saveToLocalStorage();
    renderProducts(currentProducts);
}

// Pesquisar produtos
function searchProducts(query) {
    const lowerQuery = query.toLowerCase().trim();
    
    if (lowerQuery === '') {
        currentProducts = [...products];
    } else {
        currentProducts = products.filter(product => 
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        );
    }
    
    renderProducts(currentProducts);
}

// Abrir carrinho
function openCart() {
    renderCart();
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Renderizar carrinho
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const totalPrice = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.style.display = 'block';
        totalPrice.textContent = 'R$ 0,00';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remover</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    totalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Abrir favoritos
function openFavorites() {
    renderFavorites();
    favoritesModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Renderizar favoritos
function renderFavorites() {
    const favoritesItems = document.getElementById('favoritesItems');
    const favoritesEmpty = document.getElementById('favoritesEmpty');
    
    if (favorites.length === 0) {
        favoritesItems.innerHTML = '';
        favoritesEmpty.style.display = 'block';
        return;
    }
    
    favoritesEmpty.style.display = 'none';
    favoritesItems.innerHTML = '';
    
    favorites.forEach(item => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="favorite-item-image">
            <div class="favorite-item-info">
                <div class="favorite-item-name">${item.name}</div>
                <div class="favorite-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
            </div>
            <button class="favorite-item-remove" onclick="toggleFavorite(${item.id}); renderFavorites();">Remover</button>
        `;
        
        favoritesItems.appendChild(favoriteItem);
    });
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio! 🛒');
        return;
    }
    
    // Calcular total
    let total = 0;
    cart.forEach(item => total += item.price);
    
    // Criar lista de produtos
    let productsList = '';
    cart.forEach((item, index) => {
        productsList += `${index + 1}. ${item.name}\n   💰 R$ ${item.price.toFixed(2).replace('.', ',')}\n\n`;
    });
    
    // Criar mensagem para WhatsApp
    const message = `🛍️ *Olá! Gostaria de finalizar minha compra:*\n\n` +
                   `📦 *Produtos no Carrinho:*\n\n${productsList}` +
                   `━━━━━━━━━━━━━━━━━\n` +
                   `🔢 *Total de itens:* ${cart.length}\n` +
                   `💵 *Valor Total:* R$ ${total.toFixed(2).replace('.', ',')}\n\n` +
                   `Aguardo retorno para finalizar o pedido! 😊`;
    
    // Número do WhatsApp (sem caracteres especiais)
    const phoneNumber = '5585985074830';
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Criar URL do WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Fechar modal
    closeModal(cartModal);
    
    showNotification('Redirecionando para o WhatsApp... 📱');
}

// Atualizar badges
function updateBadges() {
    cartBadge.textContent = cart.length;
    favoritesBadge.textContent = favorites.length;
}

// Notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: bold;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedFavorites) favorites = JSON.parse(savedFavorites);
}

// Event Listeners
function setupEventListeners() {
    // Pesquisa
    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });
    
    // Modal de produto
    modalClose.addEventListener('click', () => closeModal(productModal));
    modalOverlay.addEventListener('click', () => closeModal(productModal));
    
    // Modal de carrinho
    cartBtn.addEventListener('click', openCart);
    cartModalClose.addEventListener('click', () => closeModal(cartModal));
    cartModalOverlay.addEventListener('click', () => closeModal(cartModal));
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
    
    // Modal de favoritos
    favoritesBtn.addEventListener('click', openFavorites);
    favoritesModalClose.addEventListener('click', () => closeModal(favoritesModal));
    favoritesModalOverlay.addEventListener('click', () => closeModal(favoritesModal));
    
    // Fechar modais com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(productModal);
            closeModal(cartModal);
            closeModal(favoritesModal);
        }
    });
}

// Adicionar animação de fadeOut ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);
