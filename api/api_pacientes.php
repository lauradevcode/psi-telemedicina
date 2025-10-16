<?php
// api_pacientes.php - Lógica de Cadastro de Pacientes

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 1. Incluir a Conexão com o Banco de Dados
$conn = require_once 'db_connect.php';

// 2. [SEGURANÇA] Verificar Token de Autenticação
// Em um sistema real, você validaria o JWT
$headers = getallheaders();
$auth_header = $headers['Authorization'] ?? '';

if (empty($auth_header) || !preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Acesso negado. Token ausente ou inválido.']);
    exit();
}

// Decodifica o token simples (em produção, use uma biblioteca JWT!)
$token = $matches[1];
$payload = json_decode(base64_decode($token), true);
$psicologo_id = $payload['user_id'] ?? null;

if (!$psicologo_id) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Token inválido. Faça login novamente.']);
    exit();
}


// 3. Receber Dados do Paciente
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? null;
$startDate = $data['startDate'] ?? date('Y-m-d'); // Data atual se não for enviada

// 4. Validação
if (empty($name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'O nome do paciente é obrigatório.']);
    exit();
}

// 5. Inserir no Banco de Dados (AJUSTE O NOME DA TABELA!)
// Você deve ter uma tabela chamada 'pacientes' com colunas para esses campos.
$stmt = $conn->prepare("INSERT INTO pacientes (psicologo_id, nome, email, data_inicio) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $psicologo_id, $name, $email, $startDate);

if ($stmt->execute()) {
    $new_id = $stmt->insert_id;
    http_response_code(201); // Created
    echo json_encode([
        'success' => true,
        'message' => 'Paciente cadastrado com sucesso!',
        'id' => $new_id,
        'name' => $name,
        'data_inicio' => $startDate
    ]);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Erro ao inserir paciente no banco de dados.']);
}

$stmt->close();
$conn->close();
?>