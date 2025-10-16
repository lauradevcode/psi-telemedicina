document.addEventListener('DOMContentLoaded', () => {
    // URLS DA API (AJUSTE O CAMINHO 'seu-nome-do-projeto'!)
    
    // AQUI ESTÁ O ERRO! BASE_URL DEVE APONTAR APENAS PARA A PASTA /api
    // Substitua a linha errada pela de baixo:
    const BASE_URL = 'http://localhost/psi-telemedicina-saas/api'; 
    
    // As URLs dos arquivos devem ser construídas a partir do BASE_URL:
    const API_LOGIN_URL = `${BASE_URL}/api_login.php`;
    const API_PACIENTES_URL = `${BASE_URL}/api_pacientes.php`;


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
        
        const name = document.getElementById('patient-name').value;
        const email = document.getElementById('patient-email').value;
        const startDate = document.getElementById('patient-start-date').value;

        if (!name) {
             alert('O nome do paciente é obrigatório.');
             return;
        }

        try {
            const response = await fetch(API_PACIENTES_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o token para o PHP verificar
                },
                body: JSON.stringify({ name, email, startDate }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(`Paciente ${data.name} cadastrado com sucesso! ID: ${data.id}`);
                
                // Cria e insere o novo card (Feedback visual no frontend)
                const newPatientCard = document.createElement('div');
                newPatientCard.classList.add('patient-card', 'card');
                newPatientCard.innerHTML = `
                    <div class="patient-header">
                        <span class="patient-icon">${name.charAt(0).toUpperCase()}</span>
                        <div>
                            <strong>${name}</strong>
                            <small>Início: ${new Date(startDate).toLocaleDateString('pt-BR')}</small>
                        </div>
                    </div>
                    <div class="patient-body">
                        <span class="patient-tag green">ID: ${data.id}</span>
                        <span class="patient-tag blue">Salvo no BD</span>
                    </div>
                    <div class="patient-footer">
                        <a href="#" class="btn-outline btn-small">Ver Progresso →</a>
                    </div>
                `;
                patientsList.prepend(newPatientCard); // Adiciona no início da lista

                registerPatientForm.reset();
                document.getElementById('patient-start-date').valueAsDate = new Date();

            } else {
                 alert(`Erro ao cadastrar: ${data.message || 'Verifique o console para mais detalhes.'}`);
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
});