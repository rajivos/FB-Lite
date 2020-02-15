const router = require('express').Router();
let Comment = require('../../models/comment.model');
let Post = require("../../models/post.model");


router.route("/getComments/:postid").delete((req, res) => {
    const postId = req.body.postId;
    const ownerId = req.body.owner_id;
   
    Post.aggregate([
    {
        $match: {
          $or: [
            // { authorid: ObjectId(ownerId) },
            // { "member.visibility": "public" },
            // {
            //   $and: [
            //     {
            //       "member.friends": { $in: [ownerId] },
            //       "member.visibility": "friendsonly"
            //     }
            //   ]
            // }
          ]
        }
      } ]).then(payload1 => {
        console.log(JSON.stringify(payload1));
        res.json(payload1);
      });
});

router.route("/addComment").post((req, res) => {
  const postId = req.body.postId;
  const malatang = req.body.body;
  const memberId = req.body._owner_id;

  const global = { 
    postId : postId,
    body : malatang,
    memberId: memberId
  }
  Post.findOneAndUpdate({'_id': postId}, {  $addToSet: {'comments': global } }) 
  .then((info) => console.log(info))
});


module.exports = router;