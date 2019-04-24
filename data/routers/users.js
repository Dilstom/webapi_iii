const express = require('express');
const db = require('../helpers/userDb');
const router = express.Router();

function upperCase(req, res, next) {
 const name = req.body.name;
 if (name) {
  const newName = name.toUpperCase();
  req.body.name = newName;
  next();
 } else {
  res.status(400).json({ message: 'Please, enter a user name' });
 }
}

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

router.post('/', upperCase, (req, res) => {
 const name = req.body.name;
 db
  .insert({ name })
  .then(user => {
   res.status(201).json(user);
  })
  .catch(err => {
   res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
 const id = req.params.id;
 const { name } = req.body;
 db
  .update(id, { name })
  .then(user => {
   res.status(201).json(user);
  })
  .catch(err => {
   res.status(500).json(err);
  });
});

module.exports = router;
