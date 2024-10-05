const { body, validationResult } = require('express-validator');

// New reader Validation Rules
// reader body:  {
        //firstName: req.body.firstName,
        //lastName: req.body.lastName,
        //email: req.body.email,
        //birthday: req.body.birthday    };
const validateCreateReader = [
  body('firstName')
  .notEmpty().withMessage('First Name required')
  .isLength({ min: 3 }).withMessage('Please, add your first name'),
  
  body('lastName')
  .notEmpty().withMessage('Last Name required')
  .isLength({ min: 3 }).withMessage('Please, add your last name'),
  
  body('email')
  .isEmail().withMessage('Email inválido'),
  
  body('birthday')
  .notEmpty().withMessage('please add your birthday')
  .isDate({ format: 'YYYY-MM-DD' }).withMessage('The birthday date should follow this format: YYYY-MM-DD')
];

// Validações para atualizar um leitor (PUT /reader/:id)
const validateUpdateReader = [
    body('firstName')
    .notEmpty().withMessage('First Name required')
    .isLength({ min: 3 }).withMessage('Please, add your first name'),
    
    body('lastName')
    .notEmpty().withMessage('Last Name required')
    .isLength({ min: 3 }).withMessage('Please, add your last name'),
    
    body('email')
    .isEmail().withMessage('Email inválido'),
    
    body('birthday')
    .optional().isDate({ format: 'YYYY-MM-DD' }).withMessage('The birthday date should follow this format: YYYY-MM-DD')
];

// Função para verificar se houve erros de validação
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateCreateReader,
  validateUpdateReader,
  checkValidation
};