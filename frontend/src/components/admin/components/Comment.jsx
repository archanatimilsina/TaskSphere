import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

function AdminComment() {
    const navigate = useNavigate();
    
    // Fetching comments from your API
    // Replace the URL with your specific endpoint if needed
    const { data: commentsData, loading, error } = useFetch("http://localhost:8000/api/allComments");

    const handlePostClick = () => {
        // Navigate to the create comments form
        navigate("/user/createComments");
    };

    if (loading) return <StatusMessage>Loading discussion thread...</StatusMessage>;
    if (error) return <StatusMessage className="error">Error loading comments: {error}</StatusMessage>;

    const comments = commentsData?.data || [];

    return (
        <CommentContainer>
            <div className="commentTopBar">
                <h1>Discussion Forum</h1>
                <button className="postComment" onClick={handlePostClick}>
                    <i className="fas fa-plus"></i> Post Comment
                </button>
            </div>

            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map((item, index) => (
                        <div className="comment" key={item.id || index}>
                            <div className="commentHead">
                                <img 
                                    src={item.profile || `https://i.pravatar.cc/150?u=${item.id}`} 
                                    alt="User" 
                                    className="profile-img" 
                                />
                                <div className="user-info">
                                    <div className="user-name">{item.username}</div>
                                    <div className="user-role">{item.role}</div>
                                </div>
                                <div className="comment-time">
                                    {item.created_at ? new Date(item.created_at).toLocaleString() : "Recent"}
                                </div>
                            </div>

                            <div className="commentBody">
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-comments">
                        <p>No comments found. Be the first to start the discussion!</p>
                    </div>
                )}
            </div>
        </CommentContainer>
    );
}

export default AdminComment;

// Helper styles for feedback
const StatusMessage = styled.div`
    text-align: center;
    padding: 50px;
    font-family: 'Baloo 2', sans-serif;
    font-size: 1.2rem;
    &.error { color: #dc2626; }
`;

const CommentContainer = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Baloo 2', sans-serif;

    .commentTopBar {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
        min-height: 60px;

        h1 {
            text-align: center;
            display: inline-block;
            border-bottom: 2px solid #3b82f6;
            color: #1e293b;
            padding-bottom: 5px;
        }
    }

    .postComment {
        width: 160px;
        height: 50px;
        background-color: #3b82f6;
        color: white;
        font-size: 1.1rem;
        font-weight: 600;
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: absolute;
        right: 0;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;

        &:hover {
            background-color: #2563eb;
            transform: translateY(-2px);
        }

        i { margin-right: 8px; }
    }

    .comments-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .comment {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        width: 100%;
        padding: 1.5rem;
        border: 1px solid #f1f5f9;
    }

    .commentHead {
        display: flex;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 1rem;
    }

    .profile-img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #e2e8f0;
    }

    .user-info {
        flex-grow: 1;

        .user-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: #0f172a;
        }

        .user-role {
            font-size: 0.9rem;
            color: #3b82f6;
            font-weight: 600;
        }
    }

    .comment-time {
        font-size: 0.85rem;
        color: #94a3b8;
    }

    .commentBody {
        margin-top: 1.2rem;
        max-height: 400px;
        overflow-y: auto;
        padding-right: 0.75rem;
        color: #475569;
        line-height: 1.6;
        font-size: 1.05rem;

        p { margin-bottom: 1rem; }
        
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 10px;
        }
    }

    .no-comments {
        text-align: center;
        color: #64748b;
        padding: 40px;
        background: #f8fafc;
        border-radius: 12px;
        border: 2px dashed #e2e8f0;
    }

    @media (max-width: 768px) {
        .commentTopBar {
            flex-direction: column;
            gap: 20px;
            h1 { font-size: 1.5rem; }
        }
        .postComment {
            position: static;
            width: 100%;
        }
    }
`;