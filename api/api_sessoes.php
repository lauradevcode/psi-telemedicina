<?php
// ADICIONE ESTAS 3 LINHAS DE DEPURAÇÃO AQUI
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclui a conexão e as nossas novas funções de criptografia
$conn = require_once 'db_connect.php';
require_once 'encryption_utils.php';

// Segurança: Verificar Token do Psicólogo
$headers = getallheaders();
$auth_header = $headers['Authorization'] ?? '';
if (empty($auth_header) || !preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Acesso negado.']);
    exit();
}
$token = $matches[1];
$payload = json_decode(base64_decode($token), true);
$psicologo_id = $payload['user_id'] ?? null;
if (!$psicologo_id) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Token inválido.']);
    exit();
}

// --- LÓGICA PRINCIPAL ---

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // --- BUSCAR SESSÕES DE UM PACIENTE ---
    $paciente_id = $_GET['paciente_id'] ?? null;
    if (!$paciente_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID do paciente não fornecido.']);
        exit();
    }

    $stmt = $conn->prepare("SELECT id, data_sessao, anotacoes_criptografadas, sentimento_geral FROM sessoes WHERE paciente_id = ? AND psicologo_id = ? ORDER BY data_sessao DESC");
    $stmt->bind_param("ii", $paciente_id, $psicologo_id);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $sessoes = [];
        while ($row = $result->fetch_assoc()) {
            // DESCRIPTOGRAFA a anotação antes de enviar para o frontend
            if (!empty($row['anotacoes_criptografadas'])) {
                $row['anotacoes'] = decrypt_note($row['anotacoes_criptografadas']);
            } else {
                $row['anotacoes'] = ''; // Envia uma string vazia se não houver anotação
            }
            unset($row['anotacoes_criptografadas']); // Remove o campo criptografado da resposta
            $sessoes[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $sessoes]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erro ao buscar sessões.']);
    }
    $stmt->close();

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // --- SALVAR UMA NOVA SESSÃO ---
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $paciente_id = $data['paciente_id'] ?? null;
    $data_sessao = $data['data_sessao'] ?? null;
    $sentimento_geral = $data['sentimento_geral'] ?? null;
    $anotacoes = $data['anotacoes'] ?? null;

    // Validação básica
    if (!$paciente_id || !$data_sessao) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID do paciente e data da sessão são obrigatórios.']);
        exit();
    }

    // CRIPTOGRAFIA EM AÇÃO!
    $anotacoes_criptografadas = null;
    if (!empty($anotacoes)) {
        $anotacoes_criptografadas = encrypt_note($anotacoes);
    }

    $stmt = $conn->prepare("INSERT INTO sessoes (paciente_id, psicologo_id, data_sessao, anotacoes_criptografadas, sentimento_geral) VALUES (?, ?, ?, ?, ?)");
    // Tipos: i(nt), i(nt), s(tring), s(tring), s(tring)
    $stmt->bind_param("iisss", $paciente_id, $psicologo_id, $data_sessao, $anotacoes_criptografadas, $sentimento_geral);

    if ($stmt->execute()) {
        http_response_code(201); // Created
        echo json_encode(['success' => true, 'message' => 'Registro de sessão salvo com sucesso!']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erro ao salvar o registro da sessão.']);
    }
    $stmt->close();
}

$conn->close();
?>