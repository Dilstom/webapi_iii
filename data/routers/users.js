const express = require('express');
const db = require('../helpers/userDb');
const router = express.Router();

router.get('/', (req, res) => {
 db
  .get()
  .then(users => {
   res.json(users);
  })
  .catch(err => {
   res.status(500).json(err);
  });
});

router.get('/posts/:id', (req, res) => {
 const { id } = req.params;
 db
  .getUserPosts(id)
  .then(userPosts => {
   userPosts.length
    ? res.json(userPosts)
    : res
       .status(404)
       .json({ message: 'There are no any posts created by this user' });
  })
  .catch(err => {
   res.status(500).json(err);
  });
});

  });
});

module.exports = router;
