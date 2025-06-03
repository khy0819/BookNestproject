<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if (empty($_SESSION['adminAuthed'])) {
    echo json_encode(['success' => false, 'message' => '로그인 후 이용하세요.']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=127.0.0.1;port=3307;dbname=library_db;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT id, title, author, isBorrowed FROM books ORDER BY id DESC");
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'books' => $books]);
} catch (Exception $e) {
    error_log("Get books error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => '서버 오류: ' . $e->getMessage()]);
    exit;
}
