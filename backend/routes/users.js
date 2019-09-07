const router = require('express').Router();
let User = require('../models/user.model');

//Returns all users found
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//returns an aggregate value of the sum of all particpations across all users
router.route('/state').get((req, res) => {
  User.aggregate([{ $match: {} }, {
    $group:
      { _id: null, sum: { $sum: "$participation" } }
  }]).exec((err, data) => {
    if (err) res.status(400).json({ error: err });
    res.json(data)
  })
});

//Adds a user to the system
router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const participation = req.body.participation;
  const newUser = new User({ firstName, lastName, participation });

  if (participation > 100) {
    res.status(400).json({ error: "particpation cannot be greater than 100%" });
    return;
  }
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;
