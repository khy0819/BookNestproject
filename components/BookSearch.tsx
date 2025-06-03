import React, { useState, useEffect } from "react";
import { fetchBooks, Book } from "../api/bookApi";

const BookSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setBooks([]);
      return;
    }

    setLoading(true);
    fetchBooks(query)
      .then(setBooks)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <input
        type="search"
        placeholder="도서명 또는 저자 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>검색 중...</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author} {book.available ? "(대출 가능)" : "(대출 중)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
// 이 컴포넌트는 도서 검색 기능을 구현합니다.