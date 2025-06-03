import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

export async function fetchBooks(query?: string): Promise<Book[]> {
  const response = await axios.get(`${API_BASE}/books`, { params: { q: query } });
  return response.data;
}

export async function loanBook(bookId: number, userId: number): Promise<void> {
  await axios.post(`${API_BASE}/books/${bookId}/loan`, { userId });
}

export async function returnBook(bookId: number, userId: number): Promise<void> {
  await axios.post(`${API_BASE}/books/${bookId}/return`, { userId });
}
