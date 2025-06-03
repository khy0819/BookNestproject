<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

$host = '127.0.0.1';
$port = 3307;
$dbname = 'library_db';
$user = 'root';
$pass = '';

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['success' => false, 'message' => '아이디와 비밀번호를 입력하세요.']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && $admin['password'] === $password) {
        $_SESSION['adminAuthed'] = true;
        $_SESSION['adminUsername'] = $username;
        echo json_encode(['success' => true, 'message' => '로그인 성공']);
    } else {
        echo json_encode(['success' => false, 'message' => '아이디 또는 비밀번호가 올바르지 않습니다.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => '서버 오류: ' . $e->getMessage()]);
}
