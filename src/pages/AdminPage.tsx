import React, { useState, useEffect } from "react";
import { fetchBooks, Book } from "../api/bookApi";

const AdminPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  // 간단 삭제 기능 예시
  const handleDelete = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // API 호출 후 리스트 재요청 (예시)
      alert(`도서 ID ${id} 삭제 처리`);
    }
  };

  return (
    <div className="admin-page">
      <h1>관리자 도서 관리</h1>
      <table>
        <thead>
          <tr>
            <th>도서명</th>
            <th>저자</th>
            <th>상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.available ? "대출 가능" : "대출 중"}</td>
              <td>
                <button onClick={() => handleDelete(b.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
