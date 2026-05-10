import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

function UserComment({ id }) {
    const navigate = useNavigate();
    
    // Dynamically fetching comments for the specific workspace
    const { data: commentsData, loading, error } = useFetch(`http://localhost:8000/api/workspaceComments/${id}`);

    const handlePostClick = () => {
        navigate("/react/projectManager/commentForm", { state: { workspaceId: id } });
    };

    if (loading) return <StatusMessage>Loading team discussions...</StatusMessage>;
    if (error) return <StatusMessage className="error">Unable to synchronize discussions.</StatusMessage>;

    const comments = commentsData?.data || [];

    return (
        <CommentContainer>
            <div className="comment-wrapper">
                <header className="comment-header">
                    <div className="title-group">
                        <h1>Collaboration Thread</h1>
                        <p>Real-time updates and team communications for this workspace.</p>
                    </div>
                    <button className="post-btn" onClick={handlePostClick}>
                        <i className="fas fa-paper-plane"></i> Contribute
                    </button>
                </header>

                <div className="comments-feed">
                    {comments.length > 0 ? (
                        comments.map((item, index) => (
                            <div className="comment-card" key={item.id || index}>
                                <div className="card-top">
                                    <div className="author-meta">
                                        <div className="avatar-wrapper">
                                            <img 
                                                src={item.profile || `https://ui-avatars.com/api/?name=${item.username}&background=random`} 
                                                alt="User Avatar" 
                                            />
                                            <div className="status-indicator"></div>
                                        </div>
                                        <div className="identity">
                                            <span className="username">{item.username}</span>
                                            <span className="badge">{item.role || 'Member'}</span>
                                        </div>
                                    </div>
                                    <div className="timestamp">
                                        <i className="far fa-clock"></i>
                                        {new Date(item.created_at).toLocaleDateString()} · {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>

                                <div className="card-content">
                                    <p>{item.comment}</p>
                                </div>
                                
                                <div className="card-footer">
                                    <button className="footer-action"><i className="far fa-thumbs-up"></i> Acknowledge</button>
                                    <button className="footer-action"><i className="far fa-comment-dots"></i> Reply</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-thread">
                            <div className="empty-icon">
                                <i className="far fa-comments"></i>
                            </div>
                            <h3>Silence is golden, but communication is better.</h3>
                            <p>No messages have been logged in this thread yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </CommentContainer>
    );
}

export default UserComment;

const StatusMessage = styled.div`
    text-align: center;
    padding: 60px;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const CommentContainer = styled.div`
    font-family: 'Baloo 2', cursive;

    .comment-wrapper {
        max-width: 900px;
        margin: 0 auto;
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 35px;
        padding-bottom: 20px;
        border-bottom: 2px solid #f1f5f9;

        h1 { font-size: 2rem; color: #0f172a; margin: 0; }
        p { color: #94a3b8; margin: 5px 0 0; font-size: 1rem; }
    }

    .post-btn {
        background: #10b981;
        color: white;
        padding: 12px 28px;
        border-radius: 12px;
        border: none;
        font-weight: 800;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 0.3s;
        box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);

        &:hover {
            background: #059669;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
        }
    }

    .comments-feed {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .comment-card {
        background: white;
        border-radius: 20px;
        padding: 25px;
        border: 1px solid #f1f5f9;
        transition: 0.2s ease-in-out;

        &:hover {
            border-color: #10b981;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
    }

    .author-meta {
        display: flex;
        align-items: center;
        gap: 15px;

        .avatar-wrapper {
            position: relative;
            img {
                width: 50px;
                height: 50px;
                border-radius: 15px;
                object-fit: cover;
                background: #f8fafc;
            }
            .status-indicator {
                position: absolute;
                bottom: -2px;
                right: -2px;
                width: 12px;
                height: 12px;
                background: #10b981;
                border: 2px solid white;
                border-radius: 50%;
            }
        }

        .identity {
            display: flex;
            flex-direction: column;
            .username { font-weight: 800; color: #1e293b; font-size: 1.1rem; }
            .badge { 
                font-size: 0.75rem; 
                color: #10b981; 
                text-transform: uppercase; 
                font-weight: 900;
                letter-spacing: 0.5px;
            }
        }
    }

    .timestamp {
        font-size: 0.85rem;
        color: #94a3b8;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .card-content {
        color: #475569;
        line-height: 1.6;
        font-size: 1.05rem;
        margin-bottom: 20px;
        p { margin: 0; white-space: pre-wrap; }
    }

    .card-footer {
        display: flex;
        gap: 20px;
        padding-top: 15px;
        border-top: 1px solid #f8fafc;

        .footer-action {
            background: none;
            border: none;
            color: #94a3b8;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: 0.2s;
            &:hover { color: #10b981; }
        }
    }

    .empty-thread {
        text-align: center;
        padding: 80px 0;
        .empty-icon {
            font-size: 3rem;
            color: #e2e8f0;
            margin-bottom: 20px;
        }
        h3 { color: #64748b; margin: 0; }
        p { color: #cbd5e1; margin-top: 5px; }
    }

    @media (max-width: 600px) {
        .card-top { flex-direction: column; gap: 15px; }
        .timestamp { align-self: flex-start; }
    }
`;