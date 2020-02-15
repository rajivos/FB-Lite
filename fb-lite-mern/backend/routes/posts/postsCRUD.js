const router = require("express").Router();
let Post = require("../../models/post.model");
let Member = require("../../models/member.model");
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

router.route("/").get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/addPost").post((req, res) => {
  const body = req.body.body;
  const authorid = req.body.authorid;
  const authorname = req.body.authorname;
  const newPost = new Post({ body, authorid, authorname });

  newPost
    .save()
    .then(info => res.json(info))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/getHomePagePost/:id").get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/getRelatedPosts/").post((req, res) => {
  const friends = req.body.friends;
  const ownerId = req.body.owner_id;
  const screenName = req.body.screenName;
  //   console.log(ownerId)
  // console.log(screenName)


  Post.aggregate([
    {
      $lookup: {
        let: { userObjId: { $toObjectId: "$authorid" } },
        from: "members",
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$userObjId"] }] } } }
        ],
        as: "member"
      }
    },
    {
      $match: {
        $or: [
          { authorid: ObjectId(ownerId) },
          { "member.visibility": "public" },
          {
            $and: [
              {
                "member.friends": { $in: [ownerId] },
                "member.visibility": "friendsonly"
              }
            ]
          }
        ]
      }
    }
    // ,
    // {
    //   $group : { _id :  { body : "$body", authorid: "$authorid",  authorname: "$authorname", "visibility":"$member.visibility" } }
    // }

    // $match:  {
    //   $or: [
    //     // {  "_id.visibility" : "public" },
    //     // { "_id.body" :  "private post should not be seen by anyone but private ryan" }

    //     // {  "_id.visibility" : "friendsonly" }
    //     // {  _id : { authorname : "user3" }}

    //     {  "_id.authorname" : "user3" }

    //     // {  "_id.visibility" : "friendsonly" },
    //     // {type: {$in: ["TOYS"]}},
    //     // {type: {$nin: ["BARBIE"]}},
    //   ]
    // }

    //  ,
    //      $match : { "_id.visibility":"public" }
    //      }

    // ,
    // { $match : { "_id.authorname":"user2"} }

    // {

    // }

    // // ,
    // //  {
    // //   $match: {
    // //     $or: [
    // //        { "visibility": { $eq: "public" } }
    // //     ]
    // //   }
    // // }
  ]).then(payload1 => {
    console.log(JSON.stringify(payload1));
    res.json(payload1);
  });
});
// Post.aggregate([
//   {
//     $lookup: {
//       let: { userObjId: { $toObjectId: "$authorid" } },
//       from: "members",
//       pipeline: [
//         { $match: { $expr: { $and: [{ $eq: ["$_id", "$$userObjId"] }] } } },
//         { $match: { $expr: { $and: [{ $eq: ["$_id", "$$userObjId"] }] } } }
//       ],
//       as: "member"
//     }
//   },
//   {
//     $project: {
//       authorid: 1,
//       body: 1,
//       authorname: 1,
//       visibility: "$member.visibility"
//     }
//   }

// ,
// {
//   $match: {
//     $or: [
//        { "visibility": { $eq: "public" } }
//     ]
//   }
// }

module.exports = router;
