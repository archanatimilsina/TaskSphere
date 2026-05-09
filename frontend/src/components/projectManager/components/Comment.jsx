import React from "react";
import '../assets/css/comment.css'; 
import useFetch from "../../hooks/UseFetch";
import styled from 'styled-components';


function Comment({id}) {
        console.log(id);  
        const { data, loading, error } = useFetch("/api/projectIndex/7");
  return (
    <>
      <div className="commentTopBar">
        <h1>Discussion Forum</h1>
        <button className="postComment">Post Comment</button>
      </div>

   
      <div className="comment">
        <div className="commentHead">
          <img src="https://i.pravatar.cc/50" alt="User" className="profile-img" />
          <div className="user-info">
            <div className="user-name">Sita Sharma</div>
            <div className="user-role">Project Manager</div>
          </div>
          <div className="comment-time">April 26, 2025 · 3:00 PM</div>
        </div>

        <div className="commentBody">
          <p>
            This workspace design is amazing! I suggest we also add role-based permissions
            so team leads can monitor task progress without editing tasks.
          </p>
          <p>
            Also, maybe include a section for attaching documents within the comment thread
            itself. That would make it super handy for everyone to collaborate.
          </p>
        </div>
      </div>

 
      <div className="comment">
        <div className="commentHead">
          <img src="https://i.pravatar.cc/50" alt="User" className="profile-img" />
          <div className="user-info">
            <div className="user-name">Sita Sharma</div>
            <div className="user-role">Project Manager</div>
          </div>
          <div className="comment-time">April 26, 2025 · 3:00 PM</div>
        </div>

        <div className="commentBody">
          <p>
            This workspace design is amazing! I suggest we also add role-based permissions
            so team leads can monitor task progress without editing tasks.
          </p>
          <p>
            Here's a second paragraph to test scroll behavior. Keep adding content here
            and the box will scroll only when it exceeds 300px in height. 😊
          </p>
        </div>
      </div>
    </>
  );
}

export default Comment;

const CommentContainer = styled.div`
  
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Baloo 2', sans-serif;
  }

  body {
    background-color: #f1f1f1;
    padding: 2rem;
  }
h1{
  text-align: center;
  margin-bottom: 30px;
  display: inline-block;
  border-bottom: 1px solid gray;
 
}
.commentTopBar
{
position: relative;
}

  .comment {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 98%;
    margin: auto;
    padding: 1rem;
    margin-bottom: 70px;
  }

  .commentHead {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.75rem;
  }

  .profile-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-info {
    flex-grow: 1;
  }

  .user-name {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .user-role {
    font-size: 0.9rem;
    color: #666;
  }

  .comment-time {
    font-size: 0.85rem;
    color: #aaa;
  }

  .commentBody {
    margin-top: 1rem;
    max-height: 300px;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .commentBody::-webkit-scrollbar {
    width: 6px;
  }

  .commentBody::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
.postComment
{
  width: 150px;
  height: 50px;
  background-color: lightblue;
  font-size: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 70px;
}
`;
