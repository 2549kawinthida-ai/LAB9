import express from 'express';
import path from 'path';
import * as bookController from './controllers/bookControllers';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for forms)
app.use(express.json()); // Parse JSON bodies

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
// Home page
app.get('/', bookController.home);

// Book routes
app.get('/books', bookController.listBooks);
app.get('/books/search', bookController.searchBooks);
app.post('/books', bookController.addBook);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});