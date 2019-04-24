const express = require('express');
const db = require('../helpers/postDb');
const router = express.Router();

router.get('/', (req, res) => {
 db
  .get()
  .then(post => res.status(200).json(post))
  .catch(err => {
   res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
 const id = req.params.id;
 db
  .getById(id)
  .then(post => {
   post
    ? res.status(200).json(post)
    : res.status(404).json({ message: 'There is no any post with this id' });
  })
  .catch(err => {
   res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
 const id = req.params.id;
 const body = req.body;
 if (body.id || body.text) {
  db
   .update(id, body)
   .then(post => res.status(200).json(post))
   .catch(err => {
    res.status(500).json(err);
   });
 } else {
  res
   .status(400)
   .json({ message: 'Please, include a text or user_id information' });
 }
});

router.post('/', (req, res) => {
 const body = req.body;
 if (body.text) {
  db
   .insert(body)
   .then(post => res.status(200).json(post))
   .catch(err => {
    res.status(500).json(err);
   });
 } else {
  res.status(400).json({ message: 'Please include post text and user ID' });
 }
});

router.delete('/:id', (req, res) => {
 const id = req.params.id;
 db
  .remove(id)
  .then(post => {
   post
    ? res.status(200).json(post)
    : res.status(400).json({ message: 'There is no any post with this id' });
  })
  .catch(err => {
   res.status(500).json(err);
  });
});

module.exports = router;
