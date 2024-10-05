const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get("/", (req, res) => {
    res.send('Hello World');
  });

router.use('/readers', require('./readers'))
router.use('/books', require('./books'))

module.exports = router;