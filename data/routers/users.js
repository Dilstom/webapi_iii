const express = require('express');
const db = require('../helpers/userDb');
const router = express.Router();

router.get('/api/users', (req, res) => {
 db
  .get()
  .then(users => {
   res.json(users);
  })
  .catch(err => {
   return errorHelper(500, 'Server error', err);
  });
});

module.exports = router;
