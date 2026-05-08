import React from "react";
import '../assets/css/comment.css'; 
import useFetch from "../../hooks/UseFetch";


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
