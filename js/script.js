// Preenchimento do ano
document.getElementById("year").innerText = new Date().getFullYear();

// Número de WhatsApp para contato
const waNumber = "5561998548265";

// Base de dados de psicólogos com sistema PREMIUM
const psychologists = [
    // PREMIUM - Aparecem primeiro
    {
        name: "Lucas Ribeiro Costa",
        photo: "../img/psicologos/lucas-ribeiro.jpg",
        crp: "CRP 06/182628",
        approach: "Terapia de Aceitação e Compromisso - ACT",
        specialties: ["Ansiedade", "Autoconhecimento"],
        whatsapp: "5511984789568",
        premium: true // R$ 29,90/mês
    },
    {
        name: "Noemia Noronha Domingos",
        photo: "../img/psicologos/noemia-noronha.jpg",
        crp: "CRP 04/77404",
        approach: "Terapia Cognitivo-Comportamental (TCC)",
        specialties: ["Ansiedade", "Depressão", "Autoconhecimento"],
        whatsapp: "553597010965",
        premium: true // R$ 29,90/mês
    },
    {
        name: "Jaqueline Martins",
        photo: "../img/psicologos/jaqueline-martins.jpg",
        crp: "CRP 07/30847",
        approach: "Psicanálise",
        specialties: ["Adultos", "Adolescentes", "Escuta Psicanalítica"],
        whatsapp: "555199947197",
        premium: true // R$ 29,90/mês
    },
    // Psicólogos regulares
    {
        name: "Mayara Borges",
        photo: "../img/psicologos/mayara.jpg",
        crp: "CRP 06/203605",
        approach: "Terapia Cognitivo-Comportamental (TCC)",
        specialties: ["Abordagem prática e baseada em evidências", "Depressão", "Ansiedade"],
        whatsapp: "5561998548265"
    },
    {
        name: "Rafael Camino",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces",
        crp: "CRP 07/29706",
        approach: "Terapia Cognitiva Comportamental",
        specialties: ["Ansiedade", "Luto", "Trauma"],
        whatsapp: "5561998548265"
    },
    {
        name: "Carolina Pastori",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces",
        crp: "CRP 07/35788",
        approach: "TFC, TCC e Terapias Contextuais",
        specialties: ["Autocobrança", "Perfeccionismo", "Saúde Mental da Mulher"],
        whatsapp: "555496835158"
    },
    {
        name: "Jéssica Cardoso Abreu da Silva",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=faces",
        crp: "CRP 05/75274",
        approach: "Terapia Cognitiva Comportamental",
        specialties: ["Ansiedade", "Depressão", "Compulsão Alimentar"],
        whatsapp: "5561998548265"
    },
    {
        name: "Rebeca Santos Bacelar Dessa",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces",
        crp: "CRP 03/31112",
        approach: "Terapia Cognitiva Comportamental",
        specialties: ["Adolescentes", "Adultos", "Atendimento Online"],
        whatsapp: "5561998548265"
    },
    {
        name: "Rafaela Armesto",
        photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=faces",
        crp: "CRP 06/101253",
        approach: "Terapia Cognitivo-Comportamental",
        specialties: ["Adultos", "Idosos", "Adolescentes"],
        whatsapp: "5561998548265"
    },
    {
        name: "Alan Amoras",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces",
        crp: "CRP 10/10509",
        approach: "Psicanalítica",
        specialties: ["Adolescentes", "Adultos", "Escuta Clínica Profunda"],
        whatsapp: "5561998548265"
    },
    {
        name: "Bruna Macedo da Costa",
        photo: "../img/psicologos/bruna-macedo.jpg",
        crp: "CRP 06/223753",
        approach: "Terapia Cognitivo-Comportamental (TCC)",
        specialties: ["Ansiedade", "Autoconhecimento", "Depressão"],
        whatsapp: "5511970285561",
        premium: false
    }
    // {
    //     name: "Palmiana Lovati",
    //     photo: "../img/psicologos/palmiana-lovati.jpg",
    //     crp: "CRP 16/4835",
    //     approach: "Terapia Cognitivo-Comportamental (TCC)",
    //     specialties: ["Ansiedade", "Relacionamentos", "Autoestima"],
    //     whatsapp: "5528999785955",
    //     premium: false
    // },

];

// Ordenar psicólogos: PREMIUM primeiro
const sortedPsychologists = [...psychologists].sort((a, b) => {
    if (a.premium && !b.premium) return -1;
    if (!a.premium && b.premium) return 1;
    return 0;
});

// Extrair especialidades e abordagens únicas para filtros
const allSpecialties = [...new Set(psychologists.flatMap(p => p.specialties))].sort();
const allApproaches = [...new Set(psychologists.map(p => p.approach))].sort();

// Função para criar card de psicólogo
function createPsyCard(psy) {
    const premiumBadge = psy.premium ? '<span class="premium-badge">⭐ PREMIUM</span>' : '';
    const cardClass = psy.premium ? 'psy-card premium-card' : 'psy-card';

    return `<div class="${cardClass}" data-approach="${psy.approach}" data-specialties="${psy.specialties.join(',')}">
<div class="psy-header">
<img src="${psy.photo}" alt="${psy.name}" class="psy-photo">
<div class="psy-info">
<div class="psy-name">${psy.name}</div>
<div class="psy-crp">${psy.crp}</div>
<span class="verified-badge">✓ Verificado</span>
${premiumBadge}
</div>
</div>
<div class="psy-body">
<div class="psy-approach">${psy.approach}</div>
<div class="psy-specialties">
${psy.specialties.map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
</div>
</div>
<div class="psy-footer">
<a href="https://wa.me/${psy.whatsapp}?text=${encodeURIComponent(`Olá, ${psy.name}! Gostaria de agendar uma consulta e saber mais sobre valores e disponibilidade.`)}" target="_blank" class="psy-whatsapp-btn-full">💬 Conversar no WhatsApp</a>
</div>
</div>`;
}

// Renderizar psicólogos com filtros
function renderPsychologists(filters = {}) {
    const grid = document.getElementById('psychologistsGrid');
    const noResults = document.getElementById('noPsychologists');

    let filtered = [...sortedPsychologists];

    // Aplicar filtros
    if (filters.specialty && filters.specialty !== 'all') {
        filtered = filtered.filter(psy => psy.specialties.includes(filters.specialty));
    }

    if (filters.approach && filters.approach !== 'all') {
        filtered = filtered.filter(psy => psy.approach === filters.approach);
    }

    // Mostrar resultados
    if (filtered.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        noResults.style.display = 'none';
        grid.innerHTML = filtered.map(psy => createPsyCard(psy)).join('');
    }
}

// Criar filtros dinamicamente
function createFilters() {
    const filtersHTML = `
        <div class="filters-container">
            <div class="filters-title">🔍 Encontre o psicólogo ideal para você</div>
            <div class="filters-grid">
                <select id="filterSpecialty" class="filter-select">
                    <option value="all">Todas as especialidades</option>
                    ${allSpecialties.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
                
                <select id="filterApproach" class="filter-select">
                    <option value="all">Todas as abordagens</option>
                    ${allApproaches.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
                
                <button class="clear-filters-btn" id="clearFilters">Limpar filtros</button>
            </div>
        </div>
    `;

    const section = document.getElementById('psicologos');
    const title = section.querySelector('h3');
    title.insertAdjacentHTML('afterend', filtersHTML);

    // Event listeners para filtros
    document.getElementById('filterSpecialty').addEventListener('change', applyFilters);
    document.getElementById('filterApproach').addEventListener('change', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
}

// Aplicar filtros
function applyFilters() {
    const specialty = document.getElementById('filterSpecialty').value;
    const approach = document.getElementById('filterApproach').value;

    renderPsychologists({
        specialty: specialty,
        approach: approach
    });
}

// Limpar filtros
function clearFilters() {
    document.getElementById('filterSpecialty').value = 'all';
    document.getElementById('filterApproach').value = 'all';
    renderPsychologists();
}

// Inicializar
createFilters();
renderPsychologists();

// WhatsApp com mensagens personalizadas
document.getElementById("startWhats").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById('psicologos').scrollIntoView({ behavior: 'smooth' });
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
["name", "email"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                document.getElementById("sendForm").click();
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