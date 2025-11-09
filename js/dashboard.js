document.addEventListener('DOMContentLoaded', () => {
    // URLS DA API (AJUSTE O CAMINHO 'seu-nome-do-projeto'!)
    
    // AQUI ESTÁ O ERRO! BASE_URL DEVE APONTAR APENAS PARA A PASTA /api
    // Substitua a linha errada pela de baixo:
    const BASE_URL = 'http://localhost/psi-telemedicina/api';
    
    // As URLs dos arquivos devem ser construídas a partir do BASE_URL:
    const API_LOGIN_URL = `${BASE_URL}/api_login.php`;
    const API_PACIENTES_URL = `${BASE_URL}/api_pacientes.php`;
    const API_PERFIL_URL = `${BASE_URL}/api_perfil.php`;
    const API_DELETE_PACIENTE_URL = `${BASE_URL}/api_delete_paciente.php`;
    const API_SESSOES_URL = `${BASE_URL}/api_sessoes.php`;


    // Elementos do DOM
    const authView = document.getElementById('auth-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const authTitle = document.getElementById('auth-title');
    const logoutBtn = document.getElementById('logout-btn');
    const psyNameDisplay = document.getElementById('psy-name-display');
    const registerPatientForm = document.getElementById('register-patient-form');
    const patientsList = document.getElementById('patients-list');

    // Estado e Inicialização
    // Tenta carregar o estado e o nome do usuário do localStorage
    let userName = localStorage.getItem('userName') || "Dr(a). Psi";
    let isLoggedIn = !!localStorage.getItem('authToken'); // Verifica se há token

    // Função para alternar entre as views
    function toggleView(loggedIn) {
        if (loggedIn) {
            authView.classList.add('hidden');
            dashboardView.classList.remove('hidden');
            psyNameDisplay.textContent = userName;

            loadProfileData(); // Chama a função para carregar os dados do perfil!
            loadPatients(); // Chama a função para carregar a lista de pacientes!
            populatePatientSelect(); // Carrega a lista de pacientes no dropdown da aba Progresso!

        } else {
            // Limpa o estado e o token ao fazer logoff
            localStorage.removeItem('authToken');
            localStorage.removeItem('userName');
            
            authView.classList.remove('hidden');
            dashboardView.classList.add('hidden');
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            authTitle.textContent = "Acesso Exclusivo para Psicólogos";
        }
    }

    // --- FUNÇÃO PARA CARREGAR OS DADOS DO PERFIL DA API ---
    async function loadProfileData() {
        console.log("Iniciando carregamento do perfil..."); // Para nos ajudar a depurar
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Nenhum token encontrado, não é possível carregar o perfil.');
            return;
        }

        try {
            const response = await fetch(API_PERFIL_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {
                console.log("Perfil carregado com sucesso:", result.data); // Outra ajuda para depurar
                const profile = result.data;
                document.getElementById('profile-name').value = profile.nome || '';
                document.getElementById('profile-email').value = profile.email || '';
                document.getElementById('profile-crp').value = profile.crp || '';
                document.getElementById('profile-whatsapp').value = profile.whatsapp || '';
                document.getElementById('profile-abordagem').value = profile.abordagem || '';
                document.getElementById('profile-sobre').value = profile.sobre || '';
            } else {
                alert(`Erro ao carregar perfil: ${result.message}`);
            }

        } catch (error) {
            console.error('Falha na requisição de carregar perfil:', error);
            alert('Não foi possível conectar ao servidor para carregar seus dados.');
        }
    }


    // --- FUNÇÃO PARA CARREGAR A LISTA DE PACIENTES DA API ---
    async function loadPatients() {
        console.log("Iniciando carregamento da lista de pacientes...");
        const token = localStorage.getItem('authToken');
        
        try {
            const response = await fetch(API_PACIENTES_URL, {
                method: 'GET', // Usamos GET para buscar dados
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const result = await response.json();

            if (response.ok && result.success) {
                const patientsListContainer = document.getElementById('patients-list');
                // 1. Limpa a lista de exemplos estáticos
                patientsListContainer.innerHTML = ''; 

                // 2. Verifica se a lista de pacientes está vazia
                if (result.data.length === 0) {
                    patientsListContainer.innerHTML = '<p>Nenhum paciente cadastrado ainda.</p>';
                    return;
                }

                // 3. Loop para criar um card para cada paciente
                result.data.forEach(patient => {
                    const patientCard = document.createElement('div');
                    patientCard.className = 'patient-card card';
                    
                    // Formata a data para o padrão brasileiro
                    const startDate = new Date(patient.data_inicio).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                    patientCard.innerHTML = `
                        <div class="patient-header">
                            <span class="patient-icon">${patient.nome.charAt(0).toUpperCase()}</span>
                            <div>
                                <strong>${patient.nome}</strong>
                                <small>Início: ${startDate}</small>
                            </div>
                        </div>
                        <div class="patient-body">
                            <span class="patient-tag blue">ID: ${patient.id}</span>
                        </div>
                        <div class="patient-footer" style="display: flex; justify-content: flex-end; gap: 8px;">
                            <button class="btn-outline btn-small edit-btn" data-id="${patient.id}">Editar</button>
                            <button class="btn-outline btn-small delete-btn" data-id="${patient.id}" style="border-color: #ef4444; color: #ef4444;">Excluir</button>
                        </div>
                    `;
                    patientsListContainer.appendChild(patientCard);
                });
            }
        } catch (error) {
            console.error("Falha ao carregar pacientes:", error);
        }
    }

    // --- FUNÇÃO PARA POPULAR O SELETOR DE PACIENTES NA ABA PROGRESSO ---
    async function populatePatientSelect() {
        const token = localStorage.getItem('authToken');
        const selectElement = document.getElementById('patient-select');
        
        try {
            // Reutilizamos a mesma chamada de API que lista todos os pacientes
            const response = await fetch(API_PACIENTES_URL, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();

            if (result.success && result.data.length > 0) {
                // Limpa a mensagem "Carregando..." e adiciona a primeira opção
                selectElement.innerHTML = '<option value="">-- Selecione um paciente --</option>';
                
                // Adiciona cada paciente como uma nova opção no seletor
                result.data.forEach(patient => {
                    const option = document.createElement('option');
                    option.value = patient.id; // O valor será o ID do paciente
                    option.textContent = patient.nome; // O texto visível será o nome
                    selectElement.appendChild(option);
                });
            } else {
                selectElement.innerHTML = '<option value="">-- Nenhum paciente cadastrado --</option>';
            }
        } catch (error) {
            console.error("Erro ao popular a lista de pacientes no seletor:", error);
            selectElement.innerHTML = '<option value="">-- Erro ao carregar --</option>';
        }
    }

    // --- 1. Lógica de Login (COMUNICAÇÃO COM API PHP) ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            alert('Preencha e-mail e senha.');
            return;
        }

        try {
            const response = await fetch(API_LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Sucesso: Salva o token e o nome no armazenamento local
                localStorage.setItem('authToken', data.token);
                
                const loggedName = data.user.name || "Dr(a). " + email.split('@')[0].replace('.', ' ');
                localStorage.setItem('userName', loggedName);
                userName = loggedName;

                alert('Login realizado com sucesso! Bem-vindo(a) ao Dashboard.');
                isLoggedIn = true;
                toggleView(true);

            } else {
                // Erro de credenciais (401) ou outro erro da API
                alert(`Erro de Login: ${data.message || 'Verifique suas credenciais.'}`);
            }

        } catch (error) {
            console.error('Falha na requisição de login:', error);
            alert('Erro de conexão com o servidor. Verifique se o XAMPP/WAMP está rodando.');
        }
    });

    // 2. Simulação de Cadastro (Mantenha a simulação, pois o foco era o painel)
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const crp = document.getElementById('register-crp').value;
        
        alert(`Cadastro de ${name} com CRP ${crp} enviado para análise. Um registro será criado no banco de dados. Você já pode fazer login (use a senha '123' para o usuário de teste).`);
        
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        userName = name;
        showLoginLink.click();
    });

    // 3. Simulação de Logoff
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        toggleView(false);
        alert('Você saiu do Dashboard.');
    });

    // 4. Alternar entre formulários Login/Cadastro
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        authTitle.textContent = "Cadastre Seu Perfil";
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        authTitle.textContent = "Acesso Exclusivo para Psicólogos";
    });

    // 5. Lógica de Abas do Dashboard (SEM ALTERAÇÕES)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));

            button.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.remove('hidden');
        });
    });

    // --- 6. Lógica de Cadastro de Paciente (COMUNICAÇÃO COM API PHP) ---
    registerPatientForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Erro de autenticação. Faça login novamente.');
            return;
        }

        // Coleta os dados de TODOS os campos do formulário de cadastro
        const data = {
            nome: document.getElementById('patient-name').value,
            email: document.getElementById('patient-email').value,
            telefone: document.getElementById('patient-telefone').value,
            data_nascimento: document.getElementById('patient-nascimento').value,
            data_inicio: document.getElementById('patient-start-date').value,
            queixa_principal: document.getElementById('patient-queixa').value,
        };

        if (!data.nome) {
            alert('O nome do paciente é obrigatório.');
            return;
        }
        try {
            const response = await fetch(API_PACIENTES_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // CORREÇÃO 1: Envia o objeto 'data' completo que coletamos antes.
                body: JSON.stringify(data)
            });

            const result = await response.json(); // Usamos 'result' para não confundir com o 'data' de cima.

            if (response.ok && result.success) {
                // CORREÇÃO 2: Usamos o objeto 'paciente' que o PHP nos retorna.
                const newPatient = result.paciente;

                alert(`Paciente ${newPatient.nome} cadastrado com sucesso! ID: ${newPatient.id}`);
                
                // CORREÇÃO 3: Usamos os dados de 'newPatient' para criar o card.
                const newPatientCard = document.createElement('div');
                newPatientCard.classList.add('patient-card', 'card');
                
                const startDateFormatted = new Date(newPatient.data_inicio).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                newPatientCard.innerHTML = `
                    <div class="patient-header">
                        <span class="patient-icon">${newPatient.nome.charAt(0).toUpperCase()}</span>
                        <div>
                            <strong>${newPatient.nome}</strong>
                            <small>Início: ${startDateFormatted}</small>
                        </div>
                    </div>
                    <div class="patient-body">
                        <span class="patient-tag blue">ID: ${newPatient.id}</span>
                    </div>
                    <div class="patient-footer" style="display: flex; justify-content: flex-end; gap: 8px;">
                        <button class="btn-outline btn-small edit-btn" data-id="${newPatient.id}">Editar</button>
                        <button class="btn-outline btn-small delete-btn" data-id="${newPatient.id}" style="border-color: #ef4444; color: #ef4444;">Excluir</button>
                    </div>
                `;
                patientsList.prepend(newPatientCard); // Adiciona no início da lista

                registerPatientForm.reset(); // Limpa o formulário
                document.getElementById('patient-start-date').valueAsDate = new Date();

            } else {
                alert(`Erro ao cadastrar: ${result.message || 'Verifique o console para mais detalhes.'}`);
            }

        } catch (error) {
            console.error('Falha na requisição de cadastro de paciente:', error);
            alert('Erro de conexão ao tentar salvar o paciente.');
        }
    });

    // Inicializa a data de cadastro do paciente com o dia de hoje
    document.getElementById('patient-start-date').valueAsDate = new Date();

    // Inicia a visualização no estado atual (Se houver token, mostra o dashboard)
    toggleView(isLoggedIn);

    // --- LÓGICA PARA ENVIAR O FORMULÁRIO DE PERFIL ATUALIZADO ---
    const profileForm = document.getElementById('profile-form');
    const profileMessage = document.getElementById('profile-message');

    profileForm.addEventListener('submit', async (e) => {
        // Impede que a página recarregue ao enviar o formulário
        e.preventDefault();

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Sessão expirada. Faça login novamente.');
            return;
        }

        // 1. Coletar os dados dos campos do formulário
        const profileData = {
            nome: document.getElementById('profile-name').value,
            crp: document.getElementById('profile-crp').value,
            whatsapp: document.getElementById('profile-whatsapp').value,
            abordagem: document.getElementById('profile-abordagem').value,
            sobre: document.getElementById('profile-sobre').value,
        };

        // 2. Enviar os dados para a API via fetch
        try {
            const response = await fetch(API_PERFIL_URL, {
                method: 'POST', // Usamos POST para enviar/atualizar dados
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Converte o objeto JavaScript para uma string JSON
                body: JSON.stringify(profileData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                profileMessage.textContent = result.message;
                profileMessage.style.color = 'green';
            } else {
                profileMessage.textContent = `Erro: ${result.message}`;
                profileMessage.style.color = 'red';
            }

        } catch (error) {
            console.error('Falha ao salvar perfil:', error);
            profileMessage.textContent = 'Erro de conexão com o servidor.';
            profileMessage.style.color = 'red';
        }
    });
    // --- LÓGICA DO MODAL DE EDIÇÃO DE PACIENTE ---
    const editModal = document.getElementById('edit-patient-modal');
    const editForm = document.getElementById('edit-patient-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const patientsListContainer = document.getElementById('patients-list');

    // Função para abrir e preencher o modal
    async function openEditModal(patientId) {
        const token = localStorage.getItem('authToken');
        try {
            // Busca os dados completos do paciente específico
            const response = await fetch(`${API_PACIENTES_URL}?id=${patientId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();

            if (result.success) {
                const p = result.data;
                // Preenche o formulário do modal com os dados
                document.getElementById('edit-patient-id').value = p.id;
                document.getElementById('edit-patient-name').value = p.nome;
                document.getElementById('edit-patient-email').value = p.email;
                document.getElementById('edit-patient-telefone').value = p.telefone;
                document.getElementById('edit-patient-nascimento').value = p.data_nascimento;
                document.getElementById('edit-patient-inicio').value = p.data_inicio;
                document.getElementById('edit-patient-status').value = p.status;
                document.getElementById('edit-patient-queixa').value = p.queixa_principal;
                
                editModal.classList.remove('hidden'); // Mostra o modal
            }
        } catch (error) {
            console.error("Erro ao buscar dados do paciente:", error);
        }
    }

    // "Ouvinte" inteligente que gerencia os cliques na lista de pacientes
    patientsListContainer.addEventListener('click', (e) => {
        const target = e.target;
        // Se o botão de EDITAR foi clicado
        if (target.classList.contains('edit-btn')) {
            const patientId = target.dataset.id;
            openEditModal(patientId);
        }
        // Se o botão de EXCLUIR foi clicado
        if (target.classList.contains('delete-btn')) {
            const patientId = target.dataset.id;
            const patientName = target.closest('.patient-card').querySelector('strong').textContent;

            // Pede confirmação antes de apagar
            if (confirm(`Tem certeza que deseja excluir o paciente "${patientName}"? Esta ação não pode ser desfeita.`)) {
                deletePatient(patientId);
            }
        }
    });

    // Evento para SALVAR o formulário de edição
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        
        const patientData = {
            id: document.getElementById('edit-patient-id').value,
            nome: document.getElementById('edit-patient-name').value,
            email: document.getElementById('edit-patient-email').value,
            telefone: document.getElementById('edit-patient-telefone').value,
            data_nascimento: document.getElementById('edit-patient-nascimento').value,
            data_inicio: document.getElementById('edit-patient-inicio').value,
            status: document.getElementById('edit-patient-status').value,
            queixa_principal: document.getElementById('edit-patient-queixa').value,
        };

        try {
            const response = await fetch(API_PACIENTES_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(patientData)
            });
            const result = await response.json();
            if (result.success) {
                alert('Paciente atualizado!');
                editModal.classList.add('hidden'); // Esconde o modal
                loadPatients(); // Recarrega a lista de pacientes para mostrar os dados atualizados
            }
        } catch (error) {
            console.error("Erro ao salvar paciente:", error);
        }
    });

    // Evento para CANCELAR/FECHAR o modal
    cancelEditBtn.addEventListener('click', () => {
        editModal.classList.add('hidden');
    });

    // Função para EXCLUIR um paciente
    async function deletePatient(patientId) {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(API_DELETE_PACIENTE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ id: patientId })
            });
            const result = await response.json();
            if (result.success) {
                alert(result.message);
                loadPatients(); // Recarrega a lista para remover o card do paciente excluído
            } else {
                alert(`Erro: ${result.message}`);
            }
        } catch (error) {
            console.error("Erro ao excluir paciente:", error);
        }
    }

    // --- LÓGICA DA BARRA DE BUSCA DE PACIENTES ---
    const searchInput = document.getElementById('search-patient-input');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const allPatients = document.querySelectorAll('#patients-list .patient-card');

        allPatients.forEach(card => {
            const patientName = card.querySelector('strong').textContent.toLowerCase();
            if (patientName.includes(searchTerm)) {
                card.style.display = 'flex'; // Mostra o card
            } else {
                card.style.display = 'none'; // Esconde o card
            }
        });
    });
    // --- LÓGICA DA ABA DE PROGRESSO ---
    const patientSelect = document.getElementById('patient-select');
    const sessionContent = document.getElementById('session-content');
    const sessionHistoryList = document.getElementById('session-history-list');

    // Função que busca e exibe as sessões de um paciente
    async function fetchAndDisplaySessions(patientId) {
        const token = localStorage.getItem('authToken');
        sessionHistoryList.innerHTML = '<p>Carregando histórico...</p>'; // Feedback visual

        try {
            const response = await fetch(`${API_SESSOES_URL}?paciente_id=${patientId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();

            if (result.success && result.data.length > 0) {
                sessionHistoryList.innerHTML = ''; // Limpa a lista
                result.data.forEach(session => {
                    const sessionCard = document.createElement('div');
                    sessionCard.style.border = '1px solid #e2e8f0';
                    sessionCard.style.borderRadius = '8px';
                    sessionCard.style.padding = '15px';
                    sessionCard.style.marginBottom = '10px';
                    
                    const sessionDate = new Date(session.data_sessao).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                    const feeling = session.sentimento_geral ? ` | Sentimento: ${session.sentimento_geral}` : '';

                    sessionCard.innerHTML = `
                        <p style="font-weight: bold; margin-bottom: 5px;">Sessão de ${sessionDate}${feeling}</p>
                        <p style="white-space: pre-wrap; color: #475569;">${session.anotacoes || '<i>Nenhuma anotação para esta sessão.</i>'}</p>
                    `;
                    sessionHistoryList.appendChild(sessionCard);
                });
            } else {
                sessionHistoryList.innerHTML = '<p>Nenhum registro de sessão encontrado para este paciente.</p>';
            }
        } catch (error) {
            console.error("Erro ao buscar sessões:", error);
            sessionHistoryList.innerHTML = '<p>Erro ao carregar o histórico.</p>';
        }
    }

    // "Ouvinte" para o seletor de pacientes
    patientSelect.addEventListener('change', () => {
        const selectedPatientId = patientSelect.value;
        
        if (selectedPatientId) {
            sessionContent.classList.remove('hidden'); // Mostra a área de conteúdo
            // Define a data da nova sessão para hoje por padrão
            document.getElementById('session-date').valueAsDate = new Date();
            fetchAndDisplaySessions(selectedPatientId); // Busca o histórico
        } else {
            sessionContent.classList.add('hidden'); // Esconde se nenhum paciente for selecionado
        }
    });
    // --- LÓGICA PARA SALVAR UM NOVO REGISTRO DE SESSÃO ---
    const newSessionForm = document.getElementById('new-session-form');

    newSessionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const selectedPatientId = document.getElementById('patient-select').value;

        if (!selectedPatientId) {
            alert('Por favor, selecione um paciente primeiro.');
            return;
        }

        // Coleta os dados do formulário de nova sessão
        const sessionData = {
            paciente_id: selectedPatientId,
            data_sessao: document.getElementById('session-date').value,
            sentimento_geral: document.getElementById('session-feeling').value,
            anotacoes: document.getElementById('session-notes').value,
        };

        try {
            const response = await fetch(API_SESSOES_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(sessionData)
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                // Limpa o formulário e recarrega o histórico
                newSessionForm.reset();
                document.getElementById('session-date').valueAsDate = new Date();
                fetchAndDisplaySessions(selectedPatientId);
            } else {
                alert(`Erro: ${result.message}`);
            }
        } catch (error) {
            console.error("Erro ao salvar sessão:", error);
            alert('Erro de conexão ao salvar a sessão.');
        }
    });
});