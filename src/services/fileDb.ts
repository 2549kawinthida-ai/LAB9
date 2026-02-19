import fs from 'fs';
import path from 'path';
import { Book } from '../models/Book';

const dataFile = path.join(__dirname, '../../books.json');

export const readBooks = (): Book[] => {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
};

export const writeBooks = (books: Book[]): void => {
  fs.writeFileSync(dataFile, JSON.stringify(books, null, 2), 'utf-8');
};

export const addBook = (book: Book): void => {
  const books = readBooks();
  // Generate a simple ID if not provided (though in this exercise we might construct it in controller or here)
  // Let's just push it. The requirement says "add a new book into books.json".
  // Note: Validation or ID generation might be needed. 
  // Let's auto-increment ID to be safe if strictly following "database" behavior.
  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const newBook = { ...book, id: newId };
  
  books.push(newBook);
  writeBooks(books);
};