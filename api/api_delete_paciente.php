<?php
// api_delete_paciente.php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = require_once 'db_connect.php';

// Segurança: Verificar Token
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

// Lógica Principal: Receber o ID e deletar
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $patient_id = $data['id'] ?? null;

    if (!$patient_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID do paciente não fornecido.']);
        exit();
    }

    // O comando DELETE crucial, com a checagem de segurança do psicologo_id
    $stmt = $conn->prepare("DELETE FROM pacientes WHERE id = ? AND psicologo_id = ?");
    $stmt->bind_param("ii", $patient_id, $psicologo_id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Paciente excluído com sucesso!']);
        } else {
            // Isso acontece se o paciente não existe ou não pertence ao psicólogo
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Paciente não encontrado ou não pertence a você.']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erro ao excluir paciente.']);
    }
    $stmt->close();
}
$conn->close();
?>