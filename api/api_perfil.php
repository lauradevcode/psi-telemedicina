<?php
// api_perfil.php

// 1. Cabeçalhos (A receita de bolo para toda API)
//    Define que a resposta será em formato JSON e permite que o frontend acesse este script.
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Permitimos GET (buscar) e POST (salvar)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Responde com OK para requisições OPTIONS (uma checagem de segurança que os navegadores fazem)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Incluir a Conexão com o Banco de Dados
//    É como um "import" em Python. Traz o código do db_connect.php para cá.
$conn = require_once 'db_connect.php';

// 3. [SEGURANÇA] Verificar o Token de Autenticação
//    Garante que apenas um psicólogo logado possa acessar suas informações.
$headers = getallheaders();
$auth_header = $headers['Authorization'] ?? '';

if (empty($auth_header) || !preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
    http_response_code(401); // 401 = Não autorizado
    echo json_encode(['success' => false, 'message' => 'Acesso negado. Token ausente ou inválido.']);
    exit();
}

$token = $matches[1];
$payload = json_decode(base64_decode($token), true);
$psicologo_id = $payload['user_id'] ?? null;

if (!$psicologo_id) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Token inválido. Faça login novamente.']);
    exit();
}

// 4. Lógica Principal: Decidir o que fazer com base no método da requisição
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // --- SE A REQUISIÇÃO FOR GET: BUSCAR DADOS DO PERFIL ---

    // Prepara o comando SQL para evitar injeção de SQL
    $stmt = $conn->prepare("SELECT nome, email, crp, abordagem, whatsapp, sobre FROM psicologos WHERE id = ?");
    $stmt->bind_param("i", $psicologo_id); // "i" significa que o parâmetro é um inteiro (integer)

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $perfil = $result->fetch_assoc();

        if ($perfil) {
            // Sucesso! Retorna os dados do perfil em JSON
            http_response_code(200); // 200 = OK
            echo json_encode(['success' => true, 'data' => $perfil]);
        } else {
            // Não encontrou um perfil com esse ID (pouco provável, mas é bom checar)
            http_response_code(404); // 404 = Não encontrado
            echo json_encode(['success' => false, 'message' => 'Perfil não encontrado.']);
        }
    } else {
        // Erro ao executar a consulta
        http_response_code(500); // 500 = Erro interno do servidor
        echo json_encode(['success' => false, 'message' => 'Erro ao buscar dados do perfil.']);
    }

    $stmt->close();

} elseif ($method === 'POST') {
    // --- SE A REQUISIÇÃO FOR POST: ATUALIZAR DADOS DO PERFIL ---

    // 1. Receber os dados enviados pelo JavaScript
    //    file_get_contents('php://input') é o jeito padrão de pegar o corpo de uma requisição JSON em PHP.
    //    É o equivalente ao `request.data` do Django REST Framework.
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // 2. Extrair e validar os dados (uma validação simples por enquanto)
    $nome = $data['nome'] ?? '';
    $crp = $data['crp'] ?? null;
    $whatsapp = $data['whatsapp'] ?? null;
    $abordagem = $data['abordagem'] ?? null;
    $sobre = $data['sobre'] ?? null;

    // O nome é obrigatório
    if (empty($nome)) {
        http_response_code(400); // 400 = Bad Request (Requisição Inválida)
        echo json_encode(['success' => false, 'message' => 'O nome completo é obrigatório.']);
        exit();
    }

    // 3. Preparar e executar o comando SQL de UPDATE
    //    Usamos 'prepare' e 'bind_param' para PREVENIR SQL INJECTION. É a forma segura de fazer isso.
    //    O Django ORM faz isso por baixo dos panos para você, aqui fazemos manualmente.
    $stmt = $conn->prepare("UPDATE psicologos SET nome = ?, crp = ?, whatsapp = ?, abordagem = ?, sobre = ? WHERE id = ?");

    // "sssssi" -> informa ao PHP os tipos de cada variável:
    // s = string (para nome, crp, whatsapp, abordagem, sobre)
    // i = integer (para psicologo_id)
    $stmt->bind_param("sssssi", $nome, $crp, $whatsapp, $abordagem, $sobre, $psicologo_id);

    if ($stmt->execute()) {
        // Sucesso!
        http_response_code(200); // 200 = OK
        echo json_encode(['success' => true, 'message' => 'Perfil atualizado com sucesso!']);
    } else {
        // Erro ao executar
        http_response_code(500); // 500 = Erro Interno do Servidor
        echo json_encode(['success' => false, 'message' => 'Erro ao salvar o perfil no banco de dados.']);
    }

    $stmt->close();
    
}else {
    // Método não permitido
    http_response_code(405); // 405 = Método não permitido
    echo json_encode(['success' => false, 'message' => 'Método não suportado.']);
}

$conn->close();
?>