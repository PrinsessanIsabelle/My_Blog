const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');

const constraints = { 
email: {
    length: {
        minimum: 4,
        maximum: 200,
        tooShort: "^Adressen måste vara minst %{count} tecken lång",
        tooLong: "^Adressen får inte vara längre än %{count} tecken"
    },
    email: {
        message: "^Adressen måste vara en giltig e-postadress."
    }
},
username: {
    length: {
        minimum: 4,
        maximum: 50,
        tooShort: "^Användarnamnet måste vara minst %{count} tecken lång",
        tooLong: "^Användarnamnet får inte vara längre än %{count} tecken"
}
},
imageUrl: {
    url: {
      message: "^Bild-URL måste vara en giltig URL."  
    }
}
};

router.get('/', (req, res) => {
  db.user.findAll().then((result) => {
    res.send(result);
  })
    // res.send('Get posts');
});

router.post ('/', (req, res) => {
   const post = req.body;
    const invalidData = validate(req.body, constraints);
   if(invalidData) {
    res.status(400).json(invalidData);
   } else {
    db.user.create(post).then((result) => {
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
  db.user.update(post, {
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
 db.user.destroy({ where: {
    id: req.body.id
  }}).then(() => {
    res.json('Inlägget raderades');
  });
    // res.send('Delete post');
});


module.exports = router;