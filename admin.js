// 메시지 표시 함수 (기존 그대로)
function showMessage(text, type = 'success') {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = text;
    msgDiv.className = 'message ' + type;
    msgDiv.style.display = 'block';
    setTimeout(() => { msgDiv.style.display = 'none'; }, 2000);
}

// 로그인 성공 시 관리자 페이지 보여주기
function showLogin() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-section').style.display = 'none';
}
function showAdmin() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
}

// 로그인 폼 이벤트: 서버에 로그인 요청
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('admin-id').value.trim();
    const pw = document.getElementById('admin-pw').value;

    if (!id || !pw) {
        showMessage('아이디와 비밀번호를 입력하세요.', 'error');
        return;
    }

    fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(id)}&password=${encodeURIComponent(pw)}`,
        credentials: 'include'  // 세션 쿠키 전송 위해 반드시 포함
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAdmin();
            showMessage(data.message, 'success');
        } else {
            showMessage(data.message, 'error');
        }
    })
    .catch(() => {
        showMessage('서버와 연결할 수 없습니다.', 'error');
    });
});

// 로그아웃 버튼
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', function() {
    fetch('logout.php', { 
        method: 'POST',
        credentials: 'include'  // 세션 유지 위해 포함
    })
    .then(() => {
        showLogin();
        showMessage('로그아웃되었습니다.', 'success');
    })
    .catch(() => {
        showMessage('서버와 연결할 수 없습니다.', 'error');
    });
});

// 페이지 로드 시 서버 세션 확인
function checkServerAuth() {
    fetch('check_auth.php', {
        credentials: 'include'  // 세션 쿠키 포함해서 요청
    })
    .then(res => res.json())
    .then(data => {
        if (data.authenticated) {
            showAdmin();
        } else {
            showLogin();
        }
    })
    .catch(() => {
        showLogin();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    checkServerAuth();
});

// 도서 등록 폼 제출 처리
const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();

    if (!title || !author) {
        showMessage('도서명과 저자를 입력하세요.', 'error');
        return;
    }

    fetch('add_books.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
    })
    .then(res => res.json())
    .then(data => {
        showMessage(data.message, data.success ? 'success' : 'error');
        if (data.success) {
            // 도서 목록 갱신 함수 호출 (아래에 만들어야 할 수도 있음)
            fetchBooks();
            addBookForm.reset();
        }
    })
    .catch(() => {
        showMessage('서버와 연결할 수 없습니다.', 'error');
    });
});

// 도서 목록 가져오기 및 화면 렌더링 함수 예시
function fetchBooks() {
    fetch('get_books.php', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            renderBooks(data.books);
        } else {
            showMessage('도서 목록을 불러오는데 실패했습니다.', 'error');
        }
    })
    .catch(() => {
        showMessage('서버와 연결할 수 없습니다.', 'error');
    });
}

// 테이블 tbody에 도서 목록 출력하는 함수
function renderBooks(books) {
    const tbody = document.querySelector('#admin-book-table tbody');
    tbody.innerHTML = '';
    books.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isBorrowed ? '대출중' : '대출가능'}</td>
            <td><button class="btn btn-secondary" disabled>수정</button></td>
            <td><button class="btn btn-danger" disabled>삭제</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function checkServerAuth() {
    fetch('check_auth.php', {
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        if (data.authenticated) {
            showAdmin();
            fetchBooks();  // 로그인 상태면 도서 목록 불러오기 추가!
        } else {
            showLogin();
        }
    })
    .catch(() => {
        showLogin();
    });
}
