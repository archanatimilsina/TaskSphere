import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

const UserNotice = () => {
    const navigate = useNavigate();
    const { data: notice, loading, error } = useFetch("http://localhost:8000/api/allNotices");

    const handleViewClick = (id) => {
        navigate("/noticeDash", { state: { noticeId: id } });
    };

    if (loading) return <StatusMessage>Synchronizing latest announcements...</StatusMessage>;
    if (error) return <StatusMessage className="error">Connectivity error: Unable to retrieve notices.</StatusMessage>;

    return (
        <NoticeContainer>
            <div className="notice-wrapper">
                <header className="notice-header">
                    <div className="header-icon">
                        <i className="fa-solid fa-bullhorn"></i>
                    </div>
                    <div className="header-text">
                        <h2>Official Notices</h2>
                        <p>Important updates and project-wide announcements from management.</p>
                    </div>
                </header>

                <div className="notice-grid">
                    {notice?.data?.length > 0 ? (
                        notice.data.map((item, index) => (
                            <div className="notice-card" key={item.id || index}>
                                <div className="card-index">{(index + 1).toString().padStart(2, '0')}</div>
                                <div className="card-main">
                                    <div className="card-meta">
                                        <span className="category-tag">Announcement</span>
                                        <span className="timestamp">
                                            <i className="far fa-calendar-alt"></i> {new Date().toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="notice-title">{item.noticeHead}</h3>
                                    <p className="notice-preview">
                                        Click below to read the full details and context of this official notice.
                                    </p>
                                </div>
                                <div className="card-actions">
                                    <button 
                                        className="view-btn" 
                                        onClick={() => handleViewClick(item.id)}
                                    >
                                        Read Notice <i className="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-notices">
                            <i className="fa-solid fa-clipboard-list"></i>
                            <h3>No Active Notices</h3>
                            <p>The notice board is currently clear. Check back later for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </NoticeContainer>
    );
};

export default UserNotice;

const StatusMessage = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.2rem;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const NoticeContainer = styled.div`
    font-family: 'Baloo 2', cursive;
    max-width: 1100px;
    margin: 0 auto;

    .notice-wrapper {
        padding: 20px 0;
    }

    .notice-header {
        display: flex;
        align-items: center;
        gap: 25px;
        margin-bottom: 50px;
        background: white;
        padding: 40px;
        border-radius: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.03);

        .header-icon {
            width: 70px;
            height: 70px;
            background: #f0fdf4;
            color: #10b981;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
        }

        .header-text {
            h2 { font-size: 2.2rem; color: #1e293b; margin: 0; }
            p { color: #64748b; font-size: 1.1rem; margin-top: 5px; }
        }
    }

    .notice-grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .notice-card {
        background: white;
        border-radius: 20px;
        padding: 30px;
        display: grid;
        grid-template-columns: 60px 1fr 180px;
        align-items: center;
        gap: 30px;
        border: 1px solid #f1f5f9;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.01);
            box-shadow: 0 10px 30px rgba(0,0,0,0.04);
            border-color: #10b981;
        }

        .card-index {
            font-size: 2rem;
            font-weight: 800;
            color: #f1f5f9;
            text-align: center;
        }

        .card-meta {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;

            .category-tag {
                background: #eff6ff;
                color: #3b82f6;
                padding: 4px 12px;
                border-radius: 8px;
                font-size: 0.8rem;
                font-weight: 800;
                text-transform: uppercase;
            }

            .timestamp {
                font-size: 0.85rem;
                color: #94a3b8;
                i { margin-right: 5px; }
            }
        }

        .notice-title {
            font-size: 1.4rem;
            color: #1e293b;
            margin: 0;
            font-weight: 800;
        }

        .notice-preview {
            color: #64748b;
            margin-top: 5px;
            font-size: 1rem;
        }
    }

    .view-btn {
        width: 100%;
        padding: 12px;
        background: #f8fafc;
        color: #10b981;
        border: 2px solid #f1f5f9;
        border-radius: 14px;
        font-weight: 800;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: 0.2s;
        font-family: inherit;

        &:hover {
            background: #10b981;
            color: white;
            border-color: #10b981;
        }
    }

    .empty-notices {
        text-align: center;
        padding: 100px 0;
        color: #cbd5e1;
        i { font-size: 4rem; margin-bottom: 20px; }
        h3 { color: #64748b; margin: 0; }
        p { margin-top: 10px; }
    }

    @media (max-width: 900px) {
        .notice-card {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 15px;
            .card-index { display: none; }
            .card-meta { justify-content: center; }
            .card-actions { margin-top: 10px; }
        }
        
        .notice-header {
            flex-direction: column;
            text-align: center;
            padding: 30px 20px;
        }
    }
`;