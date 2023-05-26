const router = require('express').Router();

// Example route to test
router.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });
  
module.exports = router;
