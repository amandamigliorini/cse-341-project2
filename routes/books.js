const express = require('express');
const router = express.Router();
const booksController = require("../controllers/books.js");
const booksValidator = require("../validators/books.js");

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle)

router.post('/', 
    booksValidator.validateAddBook,
    booksValidator.checkValidation,
    booksController.addBook);

router.put('/:id', 
    booksValidator.validateUpdateBook,
    booksValidator.checkValidation,
    booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;