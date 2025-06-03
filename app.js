// 도서 데이터 구조: { id, title, author, isBorrowed }
let books = [];

// localStorage에서 데이터 불러오기
function loadBooks() {
    const data = localStorage.getItem('books');
    books = data ? JSON.parse(data) : [];
}

// localStorage에 데이터 저장
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

// 메시지 표시 함수
function showMessage(text, type = 'success') {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = text;
    msgDiv.className = 'message ' + type;
    msgDiv.style.display = 'block';
    setTimeout(() => { msgDiv.style.display = 'none'; }, 2000);
}

// 도서 대출/반납 처리
function toggleBorrow(idx) {
    if (books[idx].isBorrowed) {
        books[idx].isBorrowed = false;
        showMessage('반납이 완료되었습니다.', 'success');
    } else {
        books[idx].isBorrowed = true;
        showMessage('대출이 완료되었습니다.', 'success');
    }
    saveBooks();
    renderBooks();
}

// 도서 목록 테이블 렌더링
function renderBooks() {
    const tbody = document.querySelector('#book-table tbody');
    tbody.innerHTML = '';
    books.forEach((book, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isBorrowed ? '대출중' : '대출가능'}</td>
            <td>
                <button class="btn ${book.isBorrowed ? 'btn-primary' : 'btn-secondary'}" onclick="toggleBorrow(${idx})">
                    ${book.isBorrowed ? '반납' : '대출'}
                </button>
            </td>
            <td>
                <button class="btn btn-secondary" disabled>준비중</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 초기화
loadBooks();
renderBooks(); 