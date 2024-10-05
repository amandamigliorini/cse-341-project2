const express = require('express');
const router = express.Router();
const readersController = require("../controllers/readers.js");
const readersValidator = require("../validators/readers.js");

router.get('/', readersController.getAll);
router.get('/:id', readersController.getSingle)

router.post('/', 
    readersValidator.validateCreateReader,
    readersValidator.checkValidation,
    readersController.createReader);

router.put('/:id', 
    readersValidator.validateUpdateReader,
    readersValidator.checkValidation,
    readersController.updateReader);

router.delete('/:id', readersController.deleteReader);

module.exports = router;