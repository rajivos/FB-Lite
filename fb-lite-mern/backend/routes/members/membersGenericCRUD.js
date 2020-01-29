const router = require('express').Router();
let Member = require('../../models/member.model');


router.route('/').get((req, res) => {
    console.log("getting all members")
    Member.find()
    .then(members => res.json(members))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    Member.findByIdAndDelete(req.params.id)
      .then(() => res.json('Member deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;