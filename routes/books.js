const express = require('express');
const router = express.Router();
const booksController = require("../controllers/books.js");
const booksValidator = require("../middleware/books.js");
const auth = require('../middleware/authenticate.js');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle)

router.post('/', 
    auth.isAuthenticated,
    booksValidator.validateAddBook,
    booksValidator.checkValidation,
    booksController.addBook);

router.put('/:id', 
    auth.isAuthenticated,
    booksValidator.validateUpdateBook,
    booksValidator.checkValidation,
    booksController.updateBook);

    router.delete('/:id', auth.isAuthenticated, booksController.deleteBook);

module.exports = router;