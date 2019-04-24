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

router.get('/:id', (req, res) => {
 const { id } = req.params;
 db
  .getById(id)
  .then(user => {
   user
    ? res.json(user)
    : res.status(404).json({ message: "This user doesn't exist" });
  })
  .catch(err => {
   res.status(500).json(err);
  });
});
router.delete('/:id', (req, res) => {
 const { id } = req.params;
 db
  .remove(id)
  .then(user => {
   user
    ? res.json(user)
    : res
       .status(404)
       .json({ message: `The user with id:  ${id} does not exist` });
  })
  .catch(err => {
   res.status(500).json(err);
  });
});
  });
});

module.exports = router;
