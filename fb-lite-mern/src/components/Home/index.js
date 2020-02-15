import React, { useState, useEffect } from "react";
import _ from "lodash";
import auth from "../auth";
import axios from "axios";

var moment = require("moment");

const HomeContainer = props => {
  const [memberInfo, setMemberInfo] = useState(props.location.state.memberInfo);
  const [friends, setFriends] = useState(props.location.state.memberInfo.friends); // userInfo
  const [friendReqs, setFriendReqs] = useState(props.location.state.memberInfo.friendRequests);
  const [friendRequested, setFriendRequested] = useState(props.location.state.memberInfo.friendRequested);
  const [posts, setPosts] = useState([]);
  const [postQuote, setPostQuote] = useState({});
  const [allMembers, setAllMembers] = useState([]);

  useEffect(() => {
    getAllMembers();
    getPosts();
  }, []);

  const getAllMembers = () => {
    axios
      .get("http://localhost:5000/members/")
      .then(res => {
        setAllMembers(res.data);
      })
      .catch(erro => {
        console.log("get posts error for user: " + erro);
      });
  };

  const AddFriend = objectId => {
    const request = {
      _id: objectId,
      _ownerId: memberInfo._id,
      currentFriends: friends,
      friendRequests: friendReqs,
      friendRequested: friendRequested
    };

    setFriendRequested(oldArray => [...oldArray, objectId]);  
    axios
      .post("http://localhost:5000/members/addFriend", request)
      .catch(erro => {
        console.log("erro : :" + erro);
      });
  };

  const DeleteFriend = objectId => {
    const request = {
      _id: objectId,
      _ownerId: memberInfo._id,
      currentFriends: friends,
      friendRequests: friendReqs,
      friendRequested: friendRequested
    };
    axios
      .post("http://localhost:5000/members/deleteFriend", request)
      .then(res => {
      })
      .catch(erro => {
        console.log("get posts error for user: " + erro);
      });
  };


  const acceptRequest = objectId => {
    const acceptRequest = {
      _id: objectId,
      _ownerId: memberInfo._id,
      currentFriends: friends,
      friendRequests: friendReqs,
      friendRequested: friendRequested
    };
    setFriendReqs(friendReqs.filter(item => item !== objectId));
    setFriends(oldArray => [...oldArray, objectId]); 
    axios
      .post("http://localhost:5000/members/acceptFriend", acceptRequest)
      .then(res => {
      })
      .catch(erro => {
        console.log("erro : :" + erro);
      });
  };

  const PostQuotePostQuote = e => {
    e.preventDefault();
    const post = {
      body: postQuote,
      authorid: memberInfo._id,
      authorname: memberInfo.screenName
    };

    
    axios
      .post("http://localhost:5000/posts/addPost", post)
      .then(res => {
        if (res.statusText === "OK") {
          getPosts();
        }
      })
      .catch(erro => {
        console.log("shoud redirect to register| Details: :" + erro);
      });
  };

  const onChangeInputPost = e => {
    setPostQuote(e.target.value);
  };

  const searchFriend = () => {};

  
  const getPosts = () => {
    const getPosts = {
      friends: friends,
      owner_id: memberInfo._id,
      screenName: memberInfo.screenName
    };
    axios
      .post("http://localhost:5000/posts/getRelatedPosts", getPosts)
      .then(res => {
        // console.log("get my friends-> get their posts-> get my posts-> get users which are public and their posts "+ JSON.stringify(res.data));
        console.log(res)
        setPosts(res.data); 

      })
      .catch(erro => {
        console.log("get posts error for user: " + erro);
      });
  };
  const logout = () => {
    auth.logout(() => {
      props.history.push("/login");
    });
  };

  const postComment =(postId) => {
    console.log("this post belong to postId " + postId)
    const post = {
      body: document.getElementById(postId).value,
      authorid: memberInfo._id,
      postId: postId,
      _owner_id: memberInfo._id,
      authorname: memberInfo.screenName
    };

    axios
    .post("http://localhost:5000/comments/addComment", post)
    .then(res =>  {
      // console.log("get my friends-> get their posts-> get my posts-> get users which are public and their posts "+ JSON.stringify(res.data));

    })
    .catch(erro => {
      console.log("get posts error for user: " + erro);
    });
  }
  return (
    <div>
      <h1>Profile Details</h1>
      {[memberInfo].map(member => (
        <div key={member.objectId}>
          <div>{member._id}</div>
          <div>{member.screenName}</div>
          <div>{member.email}</div>
          <div>{member.visibility}</div>
          <div>{member.password}</div>
        </div>
      ))}

      <hr></hr>
      <h1>Friend Search</h1>

      {allMembers.map(
        member => (
          <div>
            {member._id !== memberInfo._id &&
              !friends.some(friend => friend === member._id) &&
              !friendReqs.some(friend => friend === member._id) &&
              !friendRequested.some(friend => friend === member._id) && (
                <div>
                  {member.screenName}{" "}
                  <button onClick={() => AddFriend(member._id)}>
                    Add Friend
                  </button>
                </div>
              )}
            {member._id !== memberInfo._id &&
              friends.some(friend => friend === member._id) &&
              !friendReqs.some(friend => friend === member._id) &&
              !friendRequested.some(friend => friend === member._id) && (
                <div>
                <div>{member.screenName} Is Already a Friend</div>
                <button onClick={() => DeleteFriend(member._id)}>
                Delete Friend
              </button>
              </div>
              )}
            {member._id !== memberInfo._id &&
              !friends.some(friend => friend === member._id) &&
              friendReqs.some(friend => friend === member._id) &&
              !friendRequested.some(friend => friend === member._id) && (
                <div>
                  {member.screenName}{" "}
                  <button onClick={() => acceptRequest(member._id)}>
                    Confirm
                  </button>
                  {/* <button >
          Reject
        </button> */}
                </div>
              )}
            {member._id !== memberInfo._id &&
              !friends.some(friend => friend === member._id) &&
              !friendReqs.some(friend => friend === member._id) &&
              friendRequested.some(friend => friend === member._id) && (
                <div>
                  {member.screenName}
                  <button disabled>Pending Friend Request</button>
                </div>
              )}
          </div>
        )
        // ))
      )}

      <hr></hr>
      <h1>Friend Requests</h1>
      {allMembers.map(member => (
        <div>
          {member._id !== memberInfo._id &&
            !friends.some(friend => friend === member._id) &&
            friendReqs.some(friend => friend === member._id) &&
            !friendRequested.some(friend => friend === member._id) && (
              <div>
                {member.screenName}{" "}
                <button onClick={() => acceptRequest(member._id)}>
                  Confirm
                </button>
                {/* <button>Reject</button> */}
              </div>
            )}
        </div>
      ))}

      <hr></hr>
      <h1>Posts</h1>
      <textarea
        name="inputPost"
        onChange={onChangeInputPost}
        rows="4"
        cols="50"
      ></textarea>
      <button onClick={PostQuotePostQuote}>Post</button>

      {posts.map(post => (
        <div>
         <div> <div>{JSON.stringify(post.body)}</div>
          <div>{JSON.stringify(post.visibility)}</div>
          <div>by: {JSON.stringify(post.authorname)}</div>
          <div>At: {moment(post.createdAt).format("HH:mm DD-MM-YYYY")}</div></div>
          {/* {post.comments} */}
          <input  name="comment" id={post._id} type="text" placeholder="Comment Post..." aria-label="Comment Post..." aria-describedby="basic-addon2"/>
          <button onClick={()=> postComment(post._id)}>Comment</button>
        </div>
      ))}
      <button onClick={logout}>Log out</button>
      <button onClick={searchFriend}>search Friend</button>
    </div>
  );
};

export default HomeContainer;
