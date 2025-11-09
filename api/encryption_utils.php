<?php
// encryption_utils.php
require_once 'config.php';

define('ENCRYPTION_METHOD', 'aes-256-cbc');

function encrypt_note($plaintext) {
    $key = ENCRYPTION_KEY;
    $iv_length = openssl_cipher_iv_length(ENCRYPTION_METHOD);
    $iv = openssl_random_pseudo_bytes($iv_length);
    $ciphertext = openssl_encrypt($plaintext, ENCRYPTION_METHOD, $key, 0, $iv);
    // Retornamos o IV junto com o texto cifrado, para podermos descriptografar depois
    return base64_encode($iv . $ciphertext);
}

function decrypt_note($encrypted_text) {
    $key = ENCRYPTION_KEY;
    $data = base64_decode($encrypted_text);
    $iv_length = openssl_cipher_iv_length(ENCRYPTION_METHOD);
    $iv = substr($data, 0, $iv_length);
    $ciphertext = substr($data, $iv_length);
    return openssl_decrypt($ciphertext, ENCRYPTION_METHOD, $key, 0, $iv);
}
?>