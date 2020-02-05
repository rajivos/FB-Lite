const router = require('express').Router();
let Member = require('../../models/member.model');


router.route('/').get((req, res) => {
    Member.find()
    .then(members => res.json(members))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const visibility = req.body.visibility;
  const gender = req.body.gender;
  const screenName = req.body.screenName;
  const friend = req.body.friends;
  const friendReqs = req.body.friendReqs;
  const friendRequested = req.body.friendRequested;

  const newMember = new Member({email, password, visibility, gender, screenName, friend, friendReqs, friendRequested});

  newMember.save()
    .then((info) => res.json(info))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addFriend').post((req, res) => {
  const id = req.body._id;
  const requesterId =  req.body._ownerId; 
  const currentFriends = req.body.currentFriends;
  const friendRequests  = req.body.friendReqs;
  Member.findOneAndUpdate({'_id': requesterId}, {  $addToSet: {'friendRequested': id } }) 
  .then((info) => 
    {
      res.json(info)

      Member.findOneAndUpdate({'_id': id}, {  $addToSet: {'friendRequests': requesterId } }) 
      .then((info1) => 
        {
        })
    })
});

router.route('/acceptFriend').post((req, res) => {
  const id = req.body._id;
  const requesterId =  req.body._ownerId; 
  const currentFriends = req.body.currentFriends;
  const friendRequests  = req.body.friendReqs;

  Member.findOneAndUpdate({'_id': requesterId}, {  $addToSet: {'friends': id}, 'friendRequests': [] }) 
  .then((info) => 
    {
      Member.findOneAndUpdate({'_id': id},  {  $addToSet: {'friends': requesterId}, 'friendRequested': [] }) 
      .then((info) => 
        {
          console.log(id + " " + requesterId)
          res.json(info)
        })
    })

});

router.route('/ifTheyAreFriends').get((req, res) => {
  const object_Id = req.body.email;
  const password = req.body.password;
  const newMember = new Member({email, password, visibility, gender, screenName});

    res.json(newMember)
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



  router.route('/deleteFriend').post((req, res) => {
    const id = req.body._id;
    const requesterId =  req.body._ownerId; 
    const currentFriends = req.body.currentFriends;
    const friendRequests  = req.body.friendReqs;
  
    Member.findOneAndUpdate({'_id': requesterId}, {  $pull: {'friends': id}, 'friendRequests': [] }) 
    .then((info) => 
      {
        Member.findOneAndUpdate({'_id': id},  {  $pull: {'friends': requesterId}, 'friendRequested': [] }) 
        .then((info) => 
          {
            console.log(id + " " + requesterId)
            res.json(info)
          })
      })
  });
  

  
module.exports = router;