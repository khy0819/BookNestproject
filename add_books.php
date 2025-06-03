<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if (empty($_SESSION['adminAuthed'])) {
    echo json_encode(['success' => false, 'message' => '로그인 후 이용하세요.']);
    exit;
}

$title = $_POST['title'] ?? '';
$author = $_POST['author'] ?? '';

if (!$title || !$author) {
    echo json_encode(['success' => false, 'message' => '도서명과 저자를 모두 입력하세요.']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=127.0.0.1;port=3307;dbname=library_db;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO books (title, author, isBorrowed) VALUES (?, ?, 0)");
    $stmt->execute([$title, $author]);

    echo json_encode(['success' => true, 'message' => '도서 등록 성공']);
} catch (Exception $e) {
    error_log("Add book error: " . $e->getMessage()); // 에러 로그에 기록
    echo json_encode([
        'success' => false,
        'message' => '서버 오류: ' . $e->getMessage() // 화면에도 에러 내용 출력
    ]);
    exit;
}
