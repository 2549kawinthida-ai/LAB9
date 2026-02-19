import { Request, Response } from 'express';
import * as fileDb from '../services/fileDb';
import { Book } from '../models/Book';

export const home = (req: Request, res: Response) => {
  res.render('home');
};

export const listBooks = (req: Request, res: Response) => {
  const books = fileDb.readBooks();
  res.render('list', { books });
};

export const searchBooks = (req: Request, res: Response) => {
  const query = req.query.name as string;
  const books = fileDb.readBooks();
  
  if (query) {
    const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    res.render('list', { books: filteredBooks, searchQuery: query });
  } else {
    res.render('list', { books });
  }
};

export const addBook = (req: Request, res: Response) => {
  const { title, author, price } = req.body;
  
  // Basic validation (optional but good practice)
  if (!title || !author || !price) {
     // In a real app we'd show an error. Here we just redirect or ignore.
     // Let's assume valid input for now or just redirect back.
     return res.redirect('/books');
  }

  const newBook: Book = {
      id: 0, // ID will be handled by service
      title,
      author,
      price: parseFloat(price)
  };

  fileDb.addBook(newBook);
  res.redirect('/books');
};