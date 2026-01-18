// Preenchimento do ano
document.getElementById("year").innerText = new Date().getFullYear();

// Número de WhatsApp para contato
const waNumber = "5561998548265";

// Base de dados de psicólogos com sistema PREMIUM
const psychologists = [
    // PREMIUM - Aparecem primeiro

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


    // Psicólogos regulares FREE
        {
        name: "Sandra Aparecida de Paula ",
        photo: "../img/psicologos/sandraamorim.jpg",
        crp: "CRP 06/218585",
        approach: "Terapia Cognitiva-Comportamental (TCC)",
        specialties: ["Público- adolescentes , adultos ( feminino e masculino) Avaliação Neuropsicologica "],
        whatsapp: "5511979820978",
        premium: true
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
        whatsapp: "5521989937876", // Atualizar com o número real se necessário
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

// Extrair especialidades e abordagens únicas para filtros
// Nota: Os nomes das especialidades na base de dados (e nos selects) agora não têm acentos ou maiúsculas para facilitar a correspondência, mas o texto exibido no tag é o original.
const allSpecialties = [...new Set(psychologists.flatMap(p => p.specialties))].sort();
const allApproaches = [...new Set(psychologists.map(p => p.approach))].sort();

// Função para criar card de psicólogo
function createPsyCard(psy) {
    const premiumBadge = psy.premium ? '<span class="premium-badge">⭐ PREMIUM</span>' : '';
    const cardClass = psy.premium ? 'psy-card premium-card' : 'psy-card';

    // Cria a mensagem para o WhatsApp com o nome do profissional
    const encodedMessage = encodeURIComponent(`Olá, ${psy.name}! Vir do Psitelemedicina. Gostaria de agendar uma sessão de terapia.`);

    return `<div class="${cardClass}" data-approach="${psy.approach}" data-specialties="${psy.specialties.join(', ')}">
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
            <a href="https://wa.me/${psy.whatsapp}?text=${encodedMessage}" target="_blank" class="psy-whatsapp-btn-full">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width: 18px; height: 18px; filter: brightness(0) invert(1); display: inline;">
                Chamar no WhatsApp
            </a>
        </div>
    </div>`;
}

// Função para renderizar os psicólogos
function renderPsychologists(filterSpecialty = "", filterApproach = "") {
    const grid = document.getElementById("psychologistsGrid");
    const noResultsMessage = document.getElementById("noResultsMessage");
    grid.innerHTML = "";

    // Filtra psicólogos. Se o filtro for "", ele é ignorado.
    const filtered = psychologists.filter(psy => {
        // Normaliza a especialidade para a comparação, mas só se tiver sido selecionado um filtro
        const matchesSpecialty = !filterSpecialty || psy.specialties.some(spec => spec === filterSpecialty);
        const matchesApproach = !filterApproach || psy.approach === filterApproach;
        return matchesSpecialty && matchesApproach;
    });

    // Ordena: Premium primeiro, depois por nome
    filtered.sort((a, b) => {
        if (a.premium && !b.premium) return -1;
        if (!a.premium && b.premium) return 1;
        return a.name.localeCompare(b.name);
    });

    if (filtered.length === 0) {
        // Mostra a mensagem de "sem resultados" 
        if (noResultsMessage) {
            noResultsMessage.classList.remove("hidden");
        }
    } else {
        // Esconde a mensagem e renderiza os cards
        if (noResultsMessage) {
            noResultsMessage.classList.add("hidden");
        }
        filtered.forEach(psy => {
            grid.innerHTML += createPsyCard(psy);
        });
    }
}

// Preencher os filtros (Selects)
function populateFilters() {
    const specialtyFilter = document.getElementById("specialtyFilter");
    allSpecialties.forEach(spec => {
        // Usa a especialidade completa como valor e texto
        specialtyFilter.innerHTML += `<option value="${spec}">${spec}</option>`;
    });

    const approachFilter = document.getElementById("approachFilter");
    allApproaches.forEach(app => {
        approachFilter.innerHTML += `<option value="${app}">${app}</option>`;
    });

    // Atualiza os placeholders de acordo com a nova cópia
    specialtyFilter.querySelector('option[value=""]').textContent = "Escolha a especialidade";
    approachFilter.querySelector('option[value=""]').textContent = "Escolha a abordagem terapêutica";
}

// Inicialização: CHAMA A FUNÇÃO SEM FILTROS para exibir tudo ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    populateFilters();
    renderPsychologists();
});


// Lógica de Filtragem
const specialtyFilter = document.getElementById("specialtyFilter");
const approachFilter = document.getElementById("approachFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

function applyFilters() {
    const selectedSpecialty = specialtyFilter.value;
    const selectedApproach = approachFilter.value;
    // O filtro só é aplicado quando esta função é chamada (ao interagir com os selects)
    renderPsychologists(selectedSpecialty, selectedApproach);
}

specialtyFilter.addEventListener("change", applyFilters);
approachFilter.addEventListener("change", applyFilters);
clearFiltersBtn.addEventListener("click", () => {
    specialtyFilter.value = "";
    approachFilter.value = "";
    // Limpa os filtros e renderiza TUDO novamente
    renderPsychologists();
});


// Lógica do Formulário de Contato
document.getElementById("sendForm").addEventListener("click", () => {
    const name = document.getElementById("name").value || "Não informado";
    const email = document.getElementById("email").value || "Não informado";
    const userType = document.getElementById("userType").value || "não especificado";

    let message = `Olá, vim do site e gostaria de falar sobre um assunto. Meu nome é ${name}, email: ${email}. `;

    if (userType === "paciente") {
        message += "Sou paciente e quero agendar minha primeira sessão de terapia.";
    } else if (userType === "psicologo") {
        message += "Sou psicólogo(a) e estou interessado(a) em me cadastrar na plataforma.";
    } else {
        message += "Gostaria de mais informações sobre a plataforma.";
    }

    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
});

// Enter key nos inputs
["name", "email", "userType"].forEach((id) => {
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
            entry.target.classList.add("is-visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".animate-fade-in").forEach((el) => {
    observer.observe(el);
});

function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Libera o scroll
}

// Fechar ao clicar fora do card branco
window.onclick = function (event) {
    const modal = document.getElementById('registerModal');
    if (event.target == modal) {
        closeRegisterModal();
    }
}

