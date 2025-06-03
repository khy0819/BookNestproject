import React from "react";
import { Book } from "../api/bookApi";

interface BookDetailProps {
  book: Book;
  onLoan: () => void;
  onReturn: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onLoan, onReturn }) => {
  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p>저자: {book.author}</p>
      <p>상태: {book.available ? "대출 가능" : "대출 중"}</p>
      {book.available ? (
        <button onClick={onLoan}>대출하기</button>
      ) : (
        <button onClick={onReturn}>반납하기</button>
      )}
    </div>
  );
};

export default BookDetail;
