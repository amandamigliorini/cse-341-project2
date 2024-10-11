const express = require('express');
const router = express.Router();
const readersController = require("../controllers/readers.js");
const readersValidator = require("../middleware/readers.js");
const auth = require('../middleware/authenticate.js');

router.get('/', readersController.getAll);
router.get('/:id', readersController.getSingle)

router.post('/', 
    auth.isAuthenticated,
    readersValidator.validateCreateReader,
    readersValidator.checkValidation,
    readersController.createReader);

router.put('/:id', 
    auth.isAuthenticated,
    readersValidator.validateUpdateReader,
    readersValidator.checkValidation,
    readersController.updateReader);

router.delete('/:id', auth.isAuthenticated, readersController.deleteReader);

module.exports = router;