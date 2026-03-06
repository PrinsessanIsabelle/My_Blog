const router = require('express').Router();
const db = require('../models/');
const validate = require('validate.js');
const postService = require('../services/postService');


const constraints = { 
title: {
    length: {
        minimum: 2,
        maximum: 100,
        tooShort: "^Titeln måste vara minst %{count} tecken lång",
        tooLong: "^Titeln får inte vara längre än %{count} tecken"
    }
    }
}

router.get('/', (req, res) => {
  postService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  })
    // res.send('Get posts');
});

router.post ('/', (req, res) => {
   const post = req.body;
    const invalidData = validate(req.body, constraints);
   if(invalidData) {
    res.status(400).json(invalidData);
   } else {
    db.post.create(post).then((result) => {
   res.send(result);
   });
    }
});

router.put('/', (req, res) => {
     const post = req.body;
    const invalidData = validate(req.body, constraints);
    const id = post.id;
    if(invalidData || !id) {
        res.status(400).json(invalidData || {id: "Id krävs."});
    } else {
  db.post.update(post, {
    where: {
      id: post.id
    }
  }).then((result) => {
    res.send(result);
  });
  }
  // res.send('Put posts');
});

router.delete('/', (req, res) => {
 db.post.destroy({ where: {
    id: req.body.id
  }}).then(() => {
    res.json('Inlägget raderades');
  });
    // res.send('Delete post');
});


module.exports = router;