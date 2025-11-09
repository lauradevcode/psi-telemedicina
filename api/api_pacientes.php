<?php
// api_pacientes.php - Lógica de Cadastro de Pacientes

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // --- LÓGICA PARA CADASTRAR OU ATUALIZAR UM PACIENTE ---
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Se um 'id' for enviado, é uma ATUALIZAÇÃO. Senão, é uma CRIAÇÃO.
    if (!empty($data['id'])) {
        // --- LÓGICA DE UPDATE (EDITAR) ---
        $patient_id = $data['id'];
        $nome = $data['nome'] ?? '';
        $email = $data['email'] ?? null;
        $data_inicio = $data['data_inicio'] ?? null;
        $telefone = $data['telefone'] ?? null;
        $data_nascimento = $data['data_nascimento'] ?? null;
        $status = $data['status'] ?? 'Ativo';
        $queixa_principal = $data['queixa_principal'] ?? null;

        $stmt = $conn->prepare("UPDATE pacientes SET nome = ?, email = ?, data_inicio = ?, telefone = ?, data_nascimento = ?, status = ?, queixa_principal = ? WHERE id = ? AND psicologo_id = ?");
        // A checagem 'psicologo_id = ?' é uma segurança extra para garantir que um psicólogo só possa editar seus próprios pacientes.
        $stmt->bind_param("sssssssii", $nome, $email, $data_inicio, $telefone, $data_nascimento, $status, $queixa_principal, $patient_id, $psicologo_id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Paciente atualizado com sucesso!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao atualizar paciente.']);
        }

    } else {
        // --- LÓGICA DE CREATE (CADASTRAR) ATUALIZADA ---
        $nome = $data['nome'] ?? '';
        if (empty($nome)) {
            http_response_code(400); // Bad Request
            echo json_encode(['success' => false, 'message' => 'O nome do paciente é obrigatório.']);
            exit();
        }

        $email = $data['email'] ?? null;
        $data_inicio = $data['data_inicio'] ?? date('Y-m-d');
        $telefone = $data['telefone'] ?? null;
        $data_nascimento = $data['data_nascimento'] ?? null;
        $queixa_principal = $data['queixa_principal'] ?? null;
        // O status será 'Ativo' por padrão, conforme definido no banco de dados.

        $stmt = $conn->prepare(
            "INSERT INTO pacientes (psicologo_id, nome, email, data_inicio, telefone, data_nascimento, queixa_principal) 
            VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        // A ordem e os tipos devem corresponder: i (integer), s (string), s, s, s, s, s
        $stmt->bind_param("issssss", $psicologo_id, $nome, $email, $data_inicio, $telefone, $data_nascimento, $queixa_principal);

        if ($stmt->execute()) {
            $new_id = $stmt->insert_id;
            http_response_code(201); // Created
            echo json_encode([
                'success' => true,
                'message' => 'Paciente cadastrado com sucesso!',
                // Retornamos um objeto completo do paciente para o JS poder criar o card
                'paciente' => [
                    'id' => $new_id, 
                    'nome' => $nome, 
                    'data_inicio' => $data_inicio
                ]
            ]);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['success' => false, 'message' => 'Erro ao inserir paciente no banco de dados.']);
        }
    }
    
    $stmt->close();
}

elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Verifica se um ID específico foi pedido na URL (ex: /api_pacientes.php?id=5)
    if (isset($_GET['id'])) {
        // --- BUSCAR UM ÚNICO PACIENTE ---
        $patient_id = $_GET['id'];
        $stmt = $conn->prepare("SELECT * FROM pacientes WHERE id = ? AND psicologo_id = ?");
        $stmt->bind_param("ii", $patient_id, $psicologo_id);
        
        $stmt->execute();
        $result = $stmt->get_result();
        $paciente = $result->fetch_assoc();

        if ($paciente) {
            echo json_encode(['success' => true, 'data' => $paciente]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Paciente não encontrado ou não pertence a você.']);
        }
    } else {
        // --- LISTAR TODOS OS PACIENTES --- (lógica que já tínhamos)
        $stmt = $conn->prepare("SELECT id, nome, email, data_inicio FROM pacientes WHERE psicologo_id = ? ORDER BY data_cadastro DESC");
        $stmt->bind_param("i", $psicologo_id);
        
        $stmt->execute();
        $result = $stmt->get_result();
        $pacientes = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['success' => true, 'data' => $pacientes]);
    }
    $stmt->close();
}

$conn->close();
?>