const router = require('express').Router();
let Member = require('../../models/member.model');


router.route('/').get((req, res) => {
    console.log("getting all members")
    Member.find()
    .then(members => res.json(members))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const visibility = req.body.visibility;
  const gender = req.body.gender;

  const newMember = new Member({email, password, visibility, gender});

  newMember.save()
    .then((info) => res.json(info))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Member.findByIdAndDelete(req.params.id)
      .then(() => res.json('Member deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/getFriends/:id').get((req, res) => {
    Member.findById(req.params.id)
      .then((info) => res.json(info))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/getMember/:id').get((req, res) => {
    Member.findById(req.params.id)
      .then((info) => res.json(info))
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;