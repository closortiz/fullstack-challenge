const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/state').get((req, res) => {
  User.aggregate([ { $match: {} }, { $group:
    { _id : null, sum : { $sum: "$participation" } }
  }]).exec((err, data) => {
    if (err) res.status(400).json('Error') + err;
    console.log(data);
    res.json(data)
  })
});

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const participation = req.body.participation;
  const newUser = new User({ firstName, lastName, participation });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
