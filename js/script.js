// Preenchimento do ano
document.getElementById("year").innerText = new Date().getFullYear();

// Número de WhatsApp para contato
const waNumber = "5561998548265";

// Base de dados de psicólogos (com fotos mais adequadas ao perfil/nome)
const psychologists = [
    {
        name: "Rafael Camino",
        photo: "https://images.unsplash.com/photo-1544723795-3fb6469e825a?w=200&h=200&fit=crop", // Nova foto: Homem em ambiente de escritório/profissional
        crp: "CRP 07/29706",
        approach: "Terapia Cognitiva Comportamental",
        specialties: ["Ansiedade", "Luto", "Trauma"],
        price: "A combinar no whatsapp",
        whatsapp: "5561998548265"
    },
    {
        name: "Cristiene Sousa Oliveira",
        photo: "https://images.unsplash.com/photo-1582212975870-8736e44b584d?w=200&h=200&fit=crop", // Nova foto: Mulher com sorriso profissional
        crp: "CRP 04/79454",
        approach: "Terapia Cognitiva Comportamental",
        specialties: ["Ansiedade", "Depressão", "Autoconhecimento"],
        price: "A combinar no whatsapp",
        whatsapp: "5561998548265"
    },
    {
        name: "Carolina Pastori",
        photo: "https://images.unsplash.com/photo-1599842057984-b04000302b15?w=200&h=200&fit=crop", // Nova foto: Mulher em postura profissional, focada
        crp: "CRP 07/35788",
        approach: "TFC, TCC e Terapias Contextuais",
        specialties: ["Autocobrança", "Perfeccionismo", "Saúde Mental da Mulher"],
        price: "A combinar no whatsapp",
        whatsapp: "5561998548265"
    },
    {
        name: "Jéssica Cardoso Abreu da Silva",
        photo: "https://images.unsplash.com/photo-1595152772835-a7457d19c30f?w=200&h=200&fit=crop", // Nova foto: Mulher com foco no trabalho
        crp: "CRP 05/75274",
        approach: "Terapia Cognitiva Comportamental",
        specialties: ["Ansiedade", "Depressão", "Compulsão Alimentar"],
        price: "A combinar no whatsapp",
        whatsapp: "5561998548265"
    },
    {
        name: "Rebeca Santos Bacelar Dessa",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734b584?w=200&h=200&fit=crop", // Nova foto: Mulher em ambiente de trabalho
        crp: "CRP 03/31112",
        approach: "Terapia Cognitiva Comportamental",
        specialties: ["Adolescentes", "Adultos", "Atendimento Online"],
        price: "A combinar no whatsapp",
        whatsapp: "5561998548265"
    },
    {
        name: "Mayara Borges",
        photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop", // Nova foto: Profissional sorrindo
        crp: "CRP 06/203605",
        approach: "Terapia Cognitivo-Comportamental",
        specialties: ["Ansiedade", "Depressão", "Abordagem prática e baseada em evidências"],
        price: "A combinar no whatsapp",
        whatsapp: "5561998548265",
     
    }
];


// Função para criar card de psicólogo
function createPsyCard(psy) {
    // Conteúdo do price ajustado para exibir o valor correto
    const priceDisplay = psy.price.toLowerCase() === "a combinar no whatsapp" 
        ? "<strong>A combinar</strong><br> no whatsapp"
        : `<strong>R$ ${psy.price}</strong><br> por sessão`;

    return `
        <div class="psy-card" data-approach="${psy.approach}">
            <div class="psy-header">
                <img src="${psy.photo}" alt="${psy.name}" class="psy-photo" />
                <div class="psy-info">
                    <div class="psy-name">${psy.name}</div>
                    <div class="psy-crp">${psy.crp}</div>
                    <span class="verified-badge">✓ Verificado</span>
                </div>
            </div>
            <div class="psy-body">
                <div class="psy-approach">${psy.approach}</div>
                <div class="psy-specialties">
                    ${psy.specialties.map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
                </div>
            </div>
            <div class="psy-footer">
                <div class="psy-price">
                    A partir de<br>
                    ${priceDisplay}
                </div>
                <a href="https://wa.me/${psy.whatsapp}?text=${encodeURIComponent(`Olá, ${psy.name}! Gostaria de agendar uma consulta.`)}" 
                   target="_blank" 
                   class="psy-whatsapp-btn">
                    💬 Contatar
                </a>
            </div>
        </div>
    `;
}

// Renderizar todos os psicólogos
function renderPsychologists(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('psychologistsGrid');
    const noResults = document.getElementById('noPsychologists');
    
    let filtered = psychologists;
    
    // Filtrar por abordagem
    if (filter !== 'all') {
        filtered = filtered.filter(psy => psy.approach === filter);
    }
    
    // Filtrar por busca
    if (searchTerm) {
        filtered = filtered.filter(psy => 
            psy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            psy.approach.toLowerCase().includes(searchTerm.toLowerCase()) ||
            psy.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }
    
    if (filtered.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        noResults.style.display = 'none';
        grid.innerHTML = filtered.map(psy => createPsyCard(psy)).join('');
    }
}

// Inicializar catálogo
renderPsychologists();

// Filtros de chips
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        const filter = chip.dataset.filter;
        const searchTerm = document.getElementById('searchPsy').value;
        renderPsychologists(filter, searchTerm);
    });
});

// Busca
document.getElementById('searchPsy').addEventListener('input', (e) => {
    // Garantir que a busca mantenha o filtro de chip ativo
    const activeChip = document.querySelector('.chip.active');
    const filter = activeChip ? activeChip.dataset.filter : 'all';
    renderPsychologists(filter, e.target.value);
});

// Sistema de abas - REMOVIDO pois a página foi unificada.
/*
const tabs = document.querySelectorAll(".nav-tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // ... Lógica de abas
    });
});
*/

// WhatsApp com mensagens personalizadas

// Para pacientes
document.getElementById("startWhats").addEventListener("click", (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
        "Olá! Gostaria de encontrar um psicólogo para teleconsulta."
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
});

// Para psicólogos - Agora também usado na nova seção
document.getElementById("startWhatsPsy").addEventListener("click", (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
        "Olá! Sou psicólogo(a) e tenho interesse em me cadastrar na plataforma."
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
});

// Adicionando evento de clique para o botão "Quero me cadastrar"
document.getElementById("signUpBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
        "Olá! Sou psicólogo(a) e tenho interesse em me cadastrar na plataforma."
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
});


// Formulário de contato
document.getElementById("sendForm").addEventListener("click", () => {
    const name = document.getElementById("name").value || "Não informado";
    const email = document.getElementById("email").value || "Não informado";
    const userType = document.getElementById("userType").value || "não especificado";

    let message = `Olá! Meu nome é ${name}, email: ${email}. `;

    if (userType === "paciente") {
        message += "Sou paciente e gostaria de mais informações sobre como encontrar um psicólogo.";
    } else if (userType === "psicologo") {
        message += "Sou psicólogo(a) e tenho interesse em me cadastrar na plataforma.";
    } else {
        message += "Gostaria de mais informações sobre a plataforma.";
    }

    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
});

// Enter key nos inputs
["name", "email", "searchPsy"].forEach((id) => { // Adicionado searchPsy
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (id === "searchPsy") {
                    // Simula clique no chip 'Todos' para re-renderizar
                    document.querySelector('.chip.active').click(); 
                } else {
                    document.getElementById("sendForm").click();
                }
            }
        });
    }
});

// Animações no scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
        }
    });
}, observerOptions);

// Observa elementos que devem ter animação
document.querySelectorAll(".step, .benefit-card, .hero").forEach((el) => {
    observer.observe(el);
});