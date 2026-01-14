<?php
/**
 * db_connect.php
 * Script para conectar com o banco de dados MySQL usando a extensão mysqli.
 */

// ===============================================
// 1. CONFIGURAÇÕES - AJUSTE AQUI!
// ===============================================
// Se você está usando XAMPP/WAMP/MAMP, estas são as configurações padrão:
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root'); 
define('DB_PASSWORD', ''); // Senha padrão é vazia
define('DB_NAME', 'psicologia_db'); // Nome do banco de dados que você CRIOU

// ===============================================
// 2. Tentar Conectar
// ===============================================
// Cria uma nova conexão com o MySQL
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// ===============================================
// 3. Checar Conexão
// ===============================================
if ($conn->connect_error) {
    // Para depuração, exibe o erro. Em produção, registre o erro em um log.
    die("ERRO DE CONEXÃO COM O BANCO DE DADOS: " . $conn->connect_error);
}

// Configura o charset para UTF8mb4 (suporte a acentuação e emojis)
if (!$conn->set_charset("utf8mb4")) {
    error_log("Erro ao carregar o charset utf8mb4: " . $conn->error);
}

// Retorna o objeto de conexão para ser incluído e usado nos outros scripts
return $conn;
?>