import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useFetch from "../../hooks/UseFetch";

function Comment() {
    const navigate = useNavigate();
    // Fetching all comments - adjust the endpoint if you need project-specific comments
    const { data: commentsData, loading, error } = useFetch("/api/allComments");

    const handlePostClick = () => {
        navigate("/react/projectManager/commentForm");
    };

    if (loading) return <StatusMessage>Loading discussions...</StatusMessage>;
    if (error) return <StatusMessage className="error">Error: {error}</StatusMessage>;

    const comments = commentsData?.data || [];

    return (
        <CommentContainer>
            <div className="comment-wrapper">
                <div className="commentTopBar">
                    <h1>Discussion Forum</h1>
                    <button className="postComment" onClick={handlePostClick}>
                        <i className="fa-solid fa-plus"></i> Post Comment
                    </button>
                </div>

                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((item, index) => (
                            <div className="comment-card" key={item.id || index}>
                                <div className="commentHead">
                                    <img 
                                        src={item.profile || "https://i.pravatar.cc/150?u=" + item.id} 
                                        alt="User" 
                                        className="profile-img" 
                                    />
                                    <div className="user-info">
                                        <div className="user-name">{item.username}</div>
                                        <div className="user-role">{item.role}</div>
                                    </div>
                                    <div className="comment-time">
                                        {new Date(item.created_at).toLocaleDateString()} · {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>

                                <div className="commentBody">
                                    <p>{item.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-comments">
                            <p>No discussions yet. Be the first to start a conversation!</p>
                        </div>
                    )}
                </div>
            </div>
        </CommentContainer>
    );
}

export default Comment;

const StatusMessage = styled.div`
    text-align: center;
    padding: 50px;
    font-family: 'Baloo 2', cursive;
    font-size: 1.2rem;
    &.error { color: #ef4444; }
`;

const CommentContainer = styled.div`
    min-height: 100vh;
    background-color: #f8fafc;
    padding: 20px;
    font-family: 'Baloo 2', cursive;

    .comment-wrapper {
        max-width: 1000px;
        margin: 0 auto;
    }

    .commentTopBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e2e8f0;

        h1 {
            font-size: 2.5rem;
            color: #1e293b;
            margin: 0;
        }
    }

    .postComment {
        padding: 12px 24px;
        background-color: #10b981;
        color: white;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);

        &:hover {
            background-color: #059669;
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(16, 185, 129, 0.3);
        }
    }

    .comments-list {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .comment-card {
        background-color: #ffffff;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        border: 1px solid #f1f5f9;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.01);
        }
    }

    .commentHead {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #f1f5f9;
    }

    .profile-img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #10b981;
    }

    .user-info {
        flex-grow: 1;

        .user-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: #1e293b;
        }

        .user-role {
            font-size: 0.9rem;
            color: #10b981;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    }

    .comment-time {
        font-size: 0.85rem;
        color: #94a3b8;
    }

    .commentBody {
        color: #334155;
        font-size: 1.1rem;
        line-height: 1.6;
        
        p {
            margin: 0;
            white-space: pre-wrap;
        }
    }

    .no-comments {
        text-align: center;
        padding: 100px 0;
        color: #94a3b8;
        font-size: 1.2rem;
    }

    @media (max-width: 768px) {
        .commentTopBar {
            flex-direction: column;
            gap: 20px;
            text-align: center;
        }
        
        .commentHead {
            flex-wrap: wrap;
        }
        
        .comment-time {
            width: 100%;
            margin-top: 5px;
        }
    }
`;