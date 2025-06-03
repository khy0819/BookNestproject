<?php
session_start();
$_SESSION = [];
// 세션 쿠키 삭제
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
session_destroy();
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => true, 'message' => '로그아웃 되었습니다.']);