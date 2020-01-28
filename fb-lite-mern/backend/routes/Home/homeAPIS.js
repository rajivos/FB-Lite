const router = require('express').Router();
let Member = require('../../models/member.model');

router.route('/').get((req, res) => {
    console.log("something else")
    Member.find()
    .then(members => res.json(members))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;

   const newMember = new Member({email});

  newMember.save()
    .then(() => res.json('Member added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;