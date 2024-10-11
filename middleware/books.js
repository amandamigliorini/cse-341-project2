const { body, validationResult } = require('express-validator');

// New reader Validation Rules
// reader body:  {
    // title: req.body.title,
    // author: req.body.author,
    // description: req.body.description,
    // releaseYear: req.body.releaseYear,
    // pages: req.body.pages,
    // ISBN10: req.body.ISBN10,
    // ISBN13: req.body.ISBN13 };
const validateAddBook = [
    body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Please, add a valid title'),

body('author')
    .notEmpty().withMessage('Author name is required')
    .isString()
    .isLength({ min: 3 }).withMessage('Please, add an author name with at least 3 characters long'),

body('description')
    .optional()
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

body('releaseYear')
    .notEmpty().withMessage('Release year is required')
    .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Release year must be a valid number'),

body('pages')
    .optional()
    .isInt({ min: 1 }).withMessage("Please, add the book's page number"),

body('ISBN10')
    .optional()
    .isLength({ min: 10, max: 10 }).withMessage('ISBN10 must be exactly 10 digits')
    .matches(/^\d+$/).withMessage('ISBN10 must contain only digits'),

body('ISBN13')
    .optional()
    .isLength({ min: 13, max: 13 }).withMessage('ISBN13 must be exactly 13 digits')
    .matches(/^\d+$/).withMessage('ISBN13 must contain only digits'),

body().custom(body => {
    if (!body.ISBN10 && !body.ISBN13) {
        throw new Error('At least one of ISBN10 or ISBN13 is required');
    }
    return true;
}),
];

const validateUpdateBook = [
    body('title')
    .optional()
    .isLength({ min: 3 }).withMessage('Please, add a valid title'),

body('author')
    .optional()
    .isString()
    .isLength({ min: 3 }).withMessage('Please, add an author name with at least 3 characters long'),

body('description')
    .optional()
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

body('releaseYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Release year must be a valid number'),

body('pages')
    .optional()
    .isInt({ min: 1 }).withMessage("Please, add the book's page number"),

body('ISBN10')
    .optional()
    .isLength({ min: 10, max: 10 }).withMessage('ISBN10 must be exactly 10 digits')
    .matches(/^\d+$/).withMessage('ISBN10 must contain only digits'),

body('ISBN13')
    .optional()
    .isLength({ min: 13, max: 13 }).withMessage('ISBN13 must be exactly 13 digits')
    .matches(/^\d+$/).withMessage('ISBN13 must contain only digits'),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateAddBook,
  validateUpdateBook,
  checkValidation
};