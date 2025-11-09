// O sortedPsychologists é definido em script.js e acessível aqui.

const carouselWrapper = document.getElementById('carouselWrapper');
const carouselLeftBtn = document.getElementById('carouselLeftBtn');
const carouselRightBtn = document.getElementById('carouselRightBtn');
const carouselIndicators = document.getElementById('carouselIndicators');

const modal = document.getElementById('psyModal');
const modalContent = document.getElementById('modalBodyContent');
const closeModalBtn = modal ? modal.querySelector('.close-btn') : null;

// Distância aproximada de um card + gap (320px + 20px) em desktop
const scrollDistance = 340; 
let autoScrollInterval;
const AUTO_SCROLL_DELAY = 4000; // 4 segundos para rolagem automática

// ===============================================
// 1. FUNCIONALIDADE DO CARROSSEL (RENDERIZAÇÃO E NAVEGAÇÃO)
// ===============================================

// Função para criar o HTML do card para o carrossel
function createCarouselCard(psy, index) {
    const cardClass = psy.premium ? 'carousel-card premium' : 'carousel-card';
    const verifiedBadge = `<span class="carousel-verified-badge">✓ Verificado</span>`;

    // Adiciona data-index no botão "Ver Perfil" para abrir o modal correto
    return `<div class="${cardClass}" data-index="${index}">
        <div class="carousel-card-header">
            <img src="${psy.photo}" alt="${psy.name}" class="carousel-card-photo">
            ${verifiedBadge}
        </div>
        <div class="carousel-card-body">
            <div class="carousel-card-name">${psy.name}</div>
            <div class="carousel-card-crp">${psy.crp}</div>
            <div class="carousel-card-approach">${psy.approach}</div>
            <div class="carousel-specialties">
                ${psy.specialties.slice(0, 3).map(spec => `<span class="carousel-specialty">${spec}</span>`).join('')}
            </div>
        </div>
        <div class="carousel-card-footer">
            <a href="https://wa.me/${psy.whatsapp}?text=${encodeURIComponent(`Olá, ${psy.name}! Vi seu perfil na Psi Telemedicina e gostaria de agendar uma consulta.`)}" target="_blank" class="carousel-btn carousel-btn-primary">
                💬 Agendar no WhatsApp
            </a>
            <button class="carousel-btn carousel-btn-secondary view-profile-btn" data-index="${index}">Ver Perfil</button>
        </div>
    </div>`;
}

// Função para renderizar os psicólogos no carrossel
function renderPsychologistsCarousel(psychologistsToRender) {
    if (!carouselWrapper) return;
    
    // Renderiza apenas os 8 primeiros para um carrossel de destaque
    const displayPsychologists = psychologistsToRender.slice(0, 8); 

    carouselWrapper.innerHTML = displayPsychologists.map((psy, index) => createCarouselCard(psy, index)).join('');
    
    updateIndicators(displayPsychologists.length);
    handleScroll(); // Inicializa o estado dos controles

    // Adiciona o evento para abrir o modal
    document.querySelectorAll('.view-profile-btn').forEach(button => {
        button.removeEventListener('click', openModal); // Limpa listeners antigos
        button.addEventListener('click', openModal);
    });
}

// Lógica de navegação manual
if (carouselLeftBtn) {
    carouselLeftBtn.addEventListener('click', () => {
        stopAutoScroll(); // Para o auto-scroll ao interagir manualmente
        carouselWrapper.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        startAutoScroll(); 
    });
}

if (carouselRightBtn) {
    carouselRightBtn.addEventListener('click', () => {
        stopAutoScroll(); // Para o auto-scroll ao interagir manualmente
        carouselWrapper.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        startAutoScroll(); 
    });
}

// Lógica para indicadores e desabilitar botões
function updateIndicators(totalCards) {
    if (!carouselIndicators) return;
    carouselIndicators.innerHTML = '';
    
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            stopAutoScroll();
            const cardWidth = 320; 
            const gap = 20;
            const scrollAmount = i * (cardWidth + gap);
            carouselWrapper.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            startAutoScroll();
        });
        carouselIndicators.appendChild(dot);
    }
}

function handleScroll() {
    if (!carouselWrapper) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselWrapper;
    const cardWidth = 320; 
    const gap = 20;
    const cardScroll = cardWidth + gap;
    
    // Atualiza botões de navegação
    if (carouselLeftBtn) carouselLeftBtn.disabled = scrollLeft === 0;
    if (carouselRightBtn) carouselRightBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 5; 

    // Atualiza Indicadores (dots)
    const totalDots = document.querySelectorAll('.carousel-dot').length;
    let currentIndex = Math.round(scrollLeft / cardScroll); 
    
    if (currentIndex >= totalDots) currentIndex = totalDots - 1;
    if (currentIndex < 0) currentIndex = 0;


    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) { 
            dot.classList.add('active');
        }
    });
}

if (carouselWrapper) {
    carouselWrapper.addEventListener('scroll', handleScroll);
}

// ===============================================
// 2. ROLAGEM AUTOMÁTICA
// ===============================================

function autoScroll() {
    if (!carouselWrapper) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselWrapper;
    
    // Se chegou ao final, volta para o início.
    if (scrollLeft + clientWidth >= scrollWidth - scrollDistance) { 
        carouselWrapper.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        // Senão, rola um card para a direita
        carouselWrapper.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
}

function startAutoScroll() {
    // Limpa qualquer intervalo anterior para evitar duplicação
    stopAutoScroll(); 
    autoScrollInterval = setInterval(autoScroll, AUTO_SCROLL_DELAY);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Adiciona listener para parar o auto-scroll ao passar o mouse por cima
if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopAutoScroll);
    carouselWrapper.addEventListener('mouseleave', startAutoScroll);
}


// ===============================================
// 3. MODAL DE PERFIL
// ===============================================

function createModalContent(psy) {
    return `
        <div class="modal-profile-header">
            <img src="${psy.photo}" alt="${psy.name}" class="modal-profile-photo">
            <div class="modal-profile-info">
                <h2>${psy.name}</h2>
                <p class="modal-crp">${psy.crp}</p>
                <span class="modal-verified-badge">✓ Profissional Verificado</span>
            </div>
        </div>
        <div class="modal-profile-body">
            <h3>Abordagem Terapêutica</h3>
            <p class="modal-approach">${psy.approach}</p>
            
            <h3>Especialidades</h3>
            <div class="modal-specialties">
                ${psy.specialties.map(spec => `<span class="modal-specialty-tag">${spec}</span>`).join('')}
            </div>
            
            <h3>Sobre o Profissional</h3>
            <p class="modal-description">
                ${psy.name} é um(a) psicólogo(a) especializado(a) em ${psy.approach}, com vasta experiência no tratamento de ${psy.specialties.join(', ')}. Sua missão é oferecer um espaço seguro e acolhedor para que você encontre o caminho para o seu bem-estar.
            </p>
        </div>
        <div class="modal-profile-footer">
            <a href="https://wa.me/${psy.whatsapp}?text=${encodeURIComponent(`Olá, ${psy.name}! Vi seu perfil detalhado e gostaria de agendar uma consulta.`)}" target="_blank" class="modal-whatsapp-btn">
                💬 Agendar Agora no WhatsApp
            </a>
        </div>
    `;
}

function openModal(event) {
    if (!modal || !modalContent) return;
    
    const button = event.currentTarget;
    // O índice está no atributo data-index do botão "Ver Perfil"
    const index = parseInt(button.getAttribute('data-index'));
    
    // Pega o psicólogo pelo índice na lista ordenada global (sortedPsychologists)
    const psy = sortedPsychologists[index]; 
    
    if (psy) {
        modalContent.innerHTML = createModalContent(psy);
        modal.style.display = "flex";
        document.body.style.overflow = 'hidden'; // Evita scroll do corpo
        stopAutoScroll(); // Para o carrossel quando o modal abrir
    }
}

function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = 'auto'; // Restaura scroll do corpo
    startAutoScroll(); // Reinicia o carrossel
}

// Event listeners do Modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Fecha o modal ao apertar ESC
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal();
    }
});


// ===============================================
// 4. INICIALIZAÇÃO
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // Verifica se sortedPsychologists existe no escopo global
    if (typeof sortedPsychologists !== 'undefined') {
        renderPsychologistsCarousel(sortedPsychologists);
        startAutoScroll(); // Inicia a rolagem automática
    } 
});