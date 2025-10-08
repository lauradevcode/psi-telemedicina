// Preenchimento do ano
document.getElementById("year").innerText = new Date().getFullYear();

// Número de WhatsApp para contato
const waNumber = "5561998548265";

// Base de dados de psicólogos (com fotos profissionais melhoradas)
const psychologists = [

    {
        name: "Lucas Ribeiro Costa",
        photo: "../img/psicologos/lucas-ribeiro.jpg",
        crp: "CRP 06/182628",
        approach: "Terapia de Aceitação e Compromisso - ACT.",
        specialties: ["Ansiedade", "Autoconhecimento"],
        whatsapp: "5511984789568",
        premium: true
    },
    {
        name: "Noemia Noronha Domingos",
        photo: "../img/psicologos/noemia-noronha.jpg",
        crp: "CRP 04/77404",
        approach: "Terapia Cognitivo-Comportamental (TCC)",
        specialties: ["Ansiedade", "Depressão", "Autoconhecimento"],
        whatsapp: "53597010965",
        premium: true
    },

    {
        name: "Jaqueline Martins",
        photo: "../img/psicologos/jaqueline-martins.jpg",
        crp: "CRP 07/30847",
        approach: "Psicanálise",
        specialties: ["Autoconhecimento", "Relacionamentos", "Conflitos Internos"],
        whatsapp: "555199947197",
        premium: true
    },

    {
        name: "Mayara Borges",
        photo: "../img/psicologos/mayara.jpg",
        crp: "CRP 06/203605",
        approach: "Terapia Cognitivo-Comportamental (TCC)",
        specialties: ["Abordagem prática e baseada em evidências", "Depressão", "Ansiedade"],
        whatsapp: "5561998548265",

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
        whatsapp: "5561998548265"
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
        name: "Mayara Borges",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces",
        crp: "CRP 06/203605",
        approach: "Terapia Cognitivo-Comportamental",
        specialties: ["Ansiedade", "Depressão", "Abordagem prática e baseada em evidências"],
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
    }
];

// Função para criar card de psicólogo
function createPsyCard(psy) {
    // Novo badge de destaque, usando um ícone ou texto mais neutro
    // Opção 1: Usar apenas um ícone (Ex: 💎)
    const highlightBadge = psy.premium ? '<span class="highlight-badge">💎 DESTAQUE</span>' : '';
    // Opção 2: Usar a palavra "Destaque"
    // const highlightBadge = psy.premium ? '<span class="highlight-badge">💎</span>' : ''; 

    // A classe CSS para o card é mantida para que o estilo visual ainda seja aplicado
    const cardClass = psy.premium ? 'psy-card highlight-card' : 'psy-card';

    return `<div class="${cardClass}" data-approach="${psy.approach}">
<div class="psy-header">
<img src="${psy.photo}" alt="${psy.name}" class="psy-photo">
<div class="psy-info">
<div class="psy-name">${psy.name}</div>
<div class="psy-crp">${psy.crp}</div>
<span class="verified-badge">✓ Verificado</span>
${highlightBadge}
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

// Renderizar todos os psicólogos
function renderPsychologists() {
    const grid = document.getElementById('psychologistsGrid');
    grid.innerHTML = psychologists.map(psy => createPsyCard(psy)).join('');
}

// Inicializar catálogo
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