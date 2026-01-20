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
        name: "Nelci Starosky Loeve",
        photo: "../img/psicologos/nelcistarosky.jpg",
        crp: "CRP 06/43695",
        approach: "Analítica",
        specialties: ["Adolescentes e adultos "],
        whatsapp: "5541985210582",
        premium: false
    },
    {
        name: "Gleice Rojas",
        photo: "../img/psicologos/gleicerojas.jpg",
        crp: "CRP 06/43695",
        approach: "Terapia Cognitiva-Comportamental (TCC)",
        specialties: ["adultos "],
        whatsapp: "5517997256530",
        premium: false
    },
    {
        name: "Sandra Aparecida de Paula",
        photo: "../img/psicologos/FOTO PROFISSIONAL  - Sandra Amorim.jpg",
        crp: "CRP 06/218585",
        approach: "Terapia Cognitiva-Comportamental (TCC)",
        specialties: ["adolescentes , adultos ( feminino e masculino) Avaliação Neuropsicologica "],
        whatsapp: "5511979820978",
        premium: false
    },
    {
        name: "Larissa Freire Maia",
        photo: "../img/psicologos/larissamaia.jpeg",
        crp: "CRP 11/22937",
        approach: "Terapia Cognitiva-Comportamental (TCC)",
        specialties: ["Crianças, Adolescentes, Adultos e Idosos"],
        whatsapp: "5588992052429",
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
        crp: "CRP 04/60211",
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

// Gerador de IDs únicos para os links
const psychologists = psychologistsRaw.map(psy => ({
    ...psy,
    id: psy.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
}));

const allSpecialties = [...new Set(psychologists.flatMap(p => p.specialties))].sort();
const allApproaches = [...new Set(psychologists.map(p => p.approach))].sort();

// FUNÇÃO ATUALIZADA COM OS BOTÕES LADO A LADO
function createPsyCard(psy) {
    const premiumBadge = psy.premium ? '<span class="premium-badge">⭐ PREMIUM</span>' : '';
    const cardClass = psy.premium ? 'psy-card premium-card' : 'psy-card';
    const encodedMessage = encodeURIComponent(`Olá, ${psy.name}! Vi seu perfil no Psi Telemedicina. Gostaria de agendar uma sessão.`);

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
            <div class="psy-actions">
                <button onclick="openPsyModal('${psy.id}')" class="btn-profile-secondary">Ver Perfil</button>
                <a href="https://wa.me/${psy.whatsapp}?text=${encodedMessage}" target="_blank" class="btn-whatsapp-primary">
                    WhatsApp
                </a>
            </div>
        </div>
    </div>`;
}

function renderModalContent(psy) {
    const modalContent = document.getElementById('modalContent');
    const profileUrl = window.location.origin + window.location.pathname + '#' + psy.id;
    const encodedMessage = encodeURIComponent(`Olá, ${psy.name}! Vi seu perfil no Psi Telemedicina. Gostaria de agendar uma sessão.`);

    modalContent.innerHTML = `
        <div style="text-align: center;">
            <img src="${psy.photo}" alt="${psy.name}" class="psy-photo" style="margin: 0 auto 15px; width: 120px; height: 120px; border: 4px solid #1a8089;">
            <div class="verified-badge" style="display: inline-block; margin-bottom: 10px;">✓ CRP Verificado: ${psy.crp}</div>
            <h2 style="font-size: 24px; color: #1a1a2e; margin: 10px 0;">${psy.name}</h2>
            <div style="color: #475569; font-style: italic; margin-bottom: 20px;">${psy.approach}</div>
            
            <div style="margin: 20px 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;">
                ${psy.specialties.map(sp => `<span class="specialty-tag" style="margin:0">${sp}</span>`).join('')}
            </div>

            <button onclick="copyToClipboard('${profileUrl}')" style="background: #f1f5f9; border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; cursor: pointer; font-size: 13px; margin-bottom: 20px; width: 100%;">
                🔗 Copiar link deste perfil para compartilhar
            </button>

            <a href="https://wa.me/${psy.whatsapp}?text=${encodedMessage}" target="_blank" class="psy-whatsapp-btn-full" style="margin: 0;">
               Agendar Consulta via WhatsApp
            </a>
        </div>
    `;
}

function openPsyModal(psyId) {
    const psy = psychologists.find(p => p.id === psyId);
    if (psy) {
        renderModalContent(psy);
        document.getElementById('psyModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        window.location.hash = psyId;
    }
}

function closePsyModal() {
    document.getElementById('psyModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    history.pushState("", document.title, window.location.pathname + window.location.search);
}

function checkUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        setTimeout(() => openPsyModal(hash), 100);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Link do perfil copiado!");
    });
}

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
    checkUrlHash();
});

document.querySelector('.close-btn').addEventListener('click', closePsyModal);
window.onclick = function(event) {
    const modal = document.getElementById('psyModal');
    if (event.target == modal) closePsyModal();
}

document.getElementById("specialtyFilter").addEventListener("change", (e) => {
    renderPsychologists(e.target.value, document.getElementById("approachFilter").value);
});
document.getElementById("approachFilter").addEventListener("change", (e) => {
    renderPsychologists(document.getElementById("specialtyFilter").value, e.target.value);
});
document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    document.getElementById("specialtyFilter").value = "";
    document.getElementById("approachFilter").value = "";
    renderPsychologists();
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".animate-fade-in").forEach((el) => {
    observer.observe(el);
});