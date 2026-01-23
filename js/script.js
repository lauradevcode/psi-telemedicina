// Preenchimento do ano
document.getElementById("year").innerText = new Date().getFullYear();

// Número de WhatsApp para contato
const waNumber = "5561998548265";

// Base de dados de psicólogos 
const psychologistsRaw = [
    {
        name: "Paula Gomes",
        photo: "../img/psicologos/paulagomes.jpeg",
        crp: "CRP 04/52968",
        approach: "Terapia Cognitiva-Comportamental (TCC)",
        specialties: ["Atendimento Psicológico à adolescentes com depressão, ansiedade, estudantes acadêmicos, mulheres, violência doméstica, assédio moral, empoderamento feminino."],
        whatsapp: "5535998075360",
        premium: true
    },
    {
        name: "Joseane dos Santos",
        photo: "../img/psicologos/joseaneoliveira.jpg",
        crp: "CRP 05/75542",
        approach: "Psicanálise",
        specialties: ["Adolescentes, adultos e idosos (Mulheres)"],
        whatsapp: "5521983328482",
        premium: true
    },
    {
        name: "Sandra Aparecida de Paula ",
        photo: "../img/psicologos/sandraamorim.jpg",
        crp: "CRP 06/218585",
        approach: "Terapia Cognitiva-Comportamental (TCC)",
        specialties: ["Público- adolescentes , adultos ( feminino e masculino) Avaliação Neuropsicologica "],
        whatsapp: "5511979820978",
        premium: false
    },
    {
        name: "Karina Guimarães Medronho",
        photo: "../img/psicologos/karina.jpeg",
        crp: "CRP 05/71318",
        approach: "Psicanálise",
        specialties: ["Adulto e idoso"],
        whatsapp: "5521981319804",
        premium: false
    },
    {
        name: "Carolline Mikos",
        photo: "../img/psicologos/carollinemikos.jpg",
        crp: "CRP 08/08775",
        approach: "TCC",
        specialties: ["Avaliação e reabilitação neuropsicológica  (crianças,  adultos e idosos) transtornos ansiosos, alimentares, sexuais, do humor e psicoses"],
        whatsapp: "55419917299825",
        premium: false
    },
    {
        name: "Andrea Dias",
        photo: "../img/psicologos/andreadias.jpeg",
        crp: "CRP 24364",
        approach: "TCC",
        specialties: ["Atendimento psicanalítico neuroafirmativo para crianças, adolescentes e adultos neurodivergentes (TEA, TDAH, AH/SD, TOD e outros), bem como famílias e pessoas típicas, com foco em acolhimento, escuta qualificada e desenvolvimento emocional. Ansiedade, depressão, acompanhamento neuroparental, bariátrico/obesidade, profissional e outros"],
        whatsapp: "5511993891559",
        premium: false
    },
    {
        name: "Noemia Noronha Domingos",
        photo: "../img/psicologos/noemia-noronha.jpg",
        crp: "CRP 04/60211",
        approach: "Sistêmica",
        specialties: ["Adultos, adolescentes"],
        whatsapp: "553597010965",
        premium: false
    },
    {
        name: "Lucas Ribeiro Costa",
        photo: "../img/psicologos/lucas-ribeiro.jpg",
        crp: "CRP 06/182628",
        approach: "Terapia de Aceitação e Compromisso - ACT",
        specialties: ["Ansiedade", "Autoconhecimento", "Depressão"],
        whatsapp: "5511984789568",
        premium: false
    },
    {
        name: "Lediane Fonseca",
        photo: "../img/psicologos/lediane.jpg",
        crp: "CRP 04/77404",
        approach: "Sistêmica",
        specialties: ["Adolescentes e adultos."],
        whatsapp: "5538999589059",
        premium: false
    },
    {
        name: "Paula Micali Fucci",
        photo: "../img/psicologos/paulamicali.jpg",
        crp: "CRP 06/181488",
        approach: "Psicanálise Clínica. Neuropsicologia e Avaliação Psicologica",
        specialties: ["Adolescentes e adultos"],
        whatsapp: "5516992434120",
        premium: false
    },
    {
        name: "Susan Soto Pires",
        photo: "../img/psicologos/susan.jpg",
        crp: "CRP 06/215565",
        approach: "Psicoterapia",
        specialties: ["Comportamental "],
        whatsapp: "5514997205941",
        premium: false
    },
    {
        name: "Thiago Oliveira",
        photo: "../img/psicologos/thiago.png",
        crp: "CRP 01/654321",
        approach: "Humanista",
        specialties: ["Conflitos Pessoais", "Autoestima"],
        whatsapp: "5521989937876", 
        premium: false
    },
    {
        name: "Mayara Borges",
        photo: "../img/psicologos/mayara.jpg",
        crp: "CRP 06/203605",
        approach: "Terapia Cognitiva-Comportamental (TCC)",
        specialties: ["Ansiedade", "Depressão", "Conflitos Familiares"],
        whatsapp: "5511949425267",
        premium: false
    },
    {
        name: "Ana Carolina Santos",
        photo: "../img/psicologos/ana-carolina.jpeg",
        crp: "CRP 01/29141",
        approach: "Análise do Comportamento",
        specialties: ["Depressão", "Ansiedade", "Terapia de Casal"],
        whatsapp: "5511949425267",
        premium: false
    },
    {
        name: "Laryssa Nunes Rodrigues",
        photo: "../img/psicologos/laryssa-nune.jpg",
        crp: "CRP 11/20823",
        approach: "Terapia Cognitiva-Comportamental",
        specialties: ["Ansiedade", "Autossabotagem", "Medo"],
        whatsapp: "5585986470826",
        premium: false
    },
];

// 1. Gerar IDs únicos para os links (IMPORTANTE PARA O MODAL)
const psychologists = psychologistsRaw.map(psy => ({
    ...psy,
    id: psy.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
}));

const allSpecialties = [...new Set(psychologists.flatMap(p => p.specialties))].sort();
const allApproaches = [...new Set(psychologists.map(p => p.approach))].sort();

// 2. Função para criar card de psicólogo - COM BOTOES ORGANIZADOS
function createPsyCard(psy) {
    const premiumBadge = psy.premium ? '<span class="premium-badge">⭐ PREMIUM</span>' : '';
    const cardClass = psy.premium ? 'psy-card premium-card' : 'psy-card';
    const encodedMessage = encodeURIComponent(`Olá, ${psy.name}! Vim do Psitelemedicina. Gostaria de agendar uma sessão de terapia.`);

    return `<div class="${cardClass}">
        <div class="psy-header">
            <img src="${psy.photo}" alt="${psy.name}" class="psy-photo">
            <div class="psy-info">
                <div class="psy-name">${psy.name}</div>
                <div class="psy-crp">${psy.crp}</div>
                <div class="badges">
                    <span class="verified-badge">✓ Verificado</span>
                    ${premiumBadge}
                </div>
            </div>
        </div>
        <div class="psy-body">
            <div class="psy-approach">Abordagem: ${psy.approach}</div>
            <div class="psy-specialties">
                ${psy.specialties.slice(0, 3).map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
                ${psy.specialties.length > 3 ? `<span class="specialty-tag">+${psy.specialties.length - 3}</span>` : ''}
            </div>
        </div>
        
        <div class="psy-footer">
            <div class="psy-footer-actions">
                <button onclick="openPsyModal('${psy.id}')" class="btn-secondary" style="width: 100%; cursor: pointer;font-size: 16px;">Ver Perfil</button>
                <a href="https://wa.me/${psy.whatsapp}?text=${encodedMessage}" target="_blank" class="psy-whatsapp-btn-full" style="width: 100%; font-size: 16px;margin: 0; text-align: center;">
                    Conversar no WhatsApp
                </a>
            </div>
        </div>
    </div>`;
}

// 3. Renderizar o Modal com Link Compartilhável
function renderModalContent(psy) {
    const modalContent = document.getElementById('modalContent');
    // Cria a URL completa para compartilhar
    const profileUrl = window.location.origin + window.location.pathname + '#' + psy.id;
    const encodedMessage = encodeURIComponent(`Olá, ${psy.name}! Vim do perfil no Psitelemedicina.`);

    modalContent.innerHTML = `
        <div style="text-align: center;">
            <img src="${psy.photo}" alt="${psy.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #1a8089; margin-bottom: 15px;margin: 0 auto;">
            <h2>${psy.name}</h2>
            <p style="color: #64748b; margin-bottom: 20px;">${psy.crp}</p>
            
            <div style="text-align: left; background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <p><strong>Abordagem:</strong> ${psy.approach}</p>
                <p style="margin-top: 10px;"><strong>Especialidades:</strong></p>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px;">
                    ${psy.specialties.map(s => `<span class="specialty-tag" style="background: white; border: 1px solid #e2e8f0;">${s}</span>`).join('')}
                </div>
            </div>

            <button onclick="copyToClipboard('${profileUrl}')" class="btn-secondary" style="width: 100%; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                🔗 Copiar Link do Perfil
            </button>

            <a href="https://wa.me/${psy.whatsapp}?text=${encodedMessage}" target="_blank" class="psy-whatsapp-btn-full" style="display: block; text-align: center; margin: 0;">
                Agendar via WhatsApp
            </a>
        </div>
    `;
}

function openPsyModal(psyId) {
    const psy = psychologists.find(p => p.id === psyId);
    if (psy) {
        renderModalContent(psy);
        document.getElementById('psyModal').style.display = 'block';
        window.location.hash = psyId; // Adiciona o hash na URL
    }
}

function closePsyModal() {
    document.getElementById('psyModal').style.display = 'none';
    history.pushState("", document.title, window.location.pathname + window.location.search); // Remove hash limpo
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Link do perfil copiado!");
    });
}

// Checar se abriu a pagina ja com um link (ex: site.com/#paula-gomes)
function checkUrlHash() {
    const hash = window.location.hash.substring(1);
    if(hash) {
        setTimeout(() => openPsyModal(hash), 500);
    }
}

// Renderização dos cards e filtros
function renderPsychologists(filterSpecialty = "", filterApproach = "") {
    const grid = document.getElementById("psychologistsGrid");
    grid.innerHTML = "";

    const filtered = psychologists.filter(psy => {
        const matchesSpecialty = !filterSpecialty || psy.specialties.some(spec => spec === filterSpecialty);
        const matchesApproach = !filterApproach || psy.approach === filterApproach;
        return matchesSpecialty && matchesApproach;
    });

    filtered.sort((a, b) => {
        if (a.premium && !b.premium) return -1;
        if (!a.premium && b.premium) return 1;
        return a.name.localeCompare(b.name);
    });

    filtered.forEach(psy => {
        grid.innerHTML += createPsyCard(psy);
    });
}

function populateFilters() {
    const specialtyFilter = document.getElementById("specialtyFilter");
    allSpecialties.forEach(spec => {
        specialtyFilter.innerHTML += `<option value="${spec}">${spec}</option>`;
    });

    const approachFilter = document.getElementById("approachFilter");
    allApproaches.forEach(app => {
        approachFilter.innerHTML += `<option value="${app}">${app}</option>`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateFilters();
    renderPsychologists();
    checkUrlHash(); // Verifica se tem link compartilhado
});

// Eventos de Filtro
const specialtyFilter = document.getElementById("specialtyFilter");
const approachFilter = document.getElementById("approachFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

function applyFilters() {
    renderPsychologists(specialtyFilter.value, approachFilter.value);
}

specialtyFilter.addEventListener("change", applyFilters);
approachFilter.addEventListener("change", applyFilters);
clearFiltersBtn.addEventListener("click", () => {
    specialtyFilter.value = "";
    approachFilter.value = "";
    renderPsychologists();
});

// Fechar modal
document.querySelector('.close-btn').addEventListener('click', closePsyModal);
window.onclick = function(event) {
    if (event.target == document.getElementById('psyModal')) {
        closePsyModal();
    }
}

// Animações
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
}, { threshold: 0.1 });
document.querySelectorAll(".animate-fade-in").forEach((el) => observer.observe(el));