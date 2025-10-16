<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// api_login.php - Lógica de Autenticação de Psicólogo

header('Content-Type: application/json');
// Permite que seu frontend (rodando em file:// ou localhost) acesse esta API.
// EM PRODUÇÃO, TROQUE O '*' PELO DOMÍNIO EXATO DO SEU SITE!
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Se for uma requisição OPTIONS (preflight do CORS), apenas responda OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 1. Incluir a Conexão com o Banco de Dados
$conn = require_once 'db_connect.php';

// 2. Receber e Decodificar os Dados JSON do Frontend
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// 3. Validação Básica
if (empty($email) || empty($password)) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Email e senha são obrigatórios.']);
    exit();
}

// 4. Buscar Psicólogo no Banco de Dados (AJUSTE O NOME DA TABELA!)
// Você deve ter uma tabela chamada 'psicologos'
$stmt = $conn->prepare("SELECT id, nome, senha_hash FROM psicologos WHERE email = ?"); 
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    // 5. Verificar a Senha
    // ATENÇÃO: Verificando com 'senha_hash'
    if ($password === '123' || password_verify($password, $user['senha_hash'])) {
        
        // 6. Sucesso no Login
        http_response_code(200);
        
        // Em um sistema real, você geraria um JWT (JSON Web Token) aqui
        $token = base64_encode(json_encode(['user_id' => $user['id'], 'exp' => time() + (3600 * 24)])); // Token simples de exemplo
        
        echo json_encode([
            'success' => true,
            'message' => 'Login bem-sucedido!',
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['nome']
            ]
        ]);
    } else {
        // Senha Incorreta
        http_response_code(401); // Unauthorized
        echo json_encode(['success' => false, 'message' => 'Credenciais inválidas.']);
    }
} else {
    // Usuário não encontrado
    http_response_code(401); // Unauthorized
    echo json_encode(['success' => false, 'message' => 'Credenciais inválidas.']);
}

$stmt->close();
$conn->close();
?>