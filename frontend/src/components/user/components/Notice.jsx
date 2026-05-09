import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from "../../hooks/UseFetch";

const Notice = () => {
    const navigate = useNavigate();
    const [selectedNoticeId, setSelectedNoticeId] = useState(null);
    const { data: notice, loading, error } = useFetch("/api/allNotices");

    const handleViewClick = (id) => {
        setSelectedNoticeId(id);
        navigate("/noticeDash", { state: { noticeId: id } });
    };

    if (loading) return <StatusMessage>Fetching notices...</StatusMessage>;
    if (error) return <StatusMessage className="error">Error loading notices: {error}</StatusMessage>;

    return (
        <NoticeContainer>
            <div className="notice-list">
                <div className="header-section">
                    <h2>Notice Board</h2>
                    <p>Stay updated with the latest project announcements</p>
                </div>

                <div className="table-wrapper">
                    <table className="notice-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>SN</th>
                                <th>Notice Head</th>
                                <th style={{ width: '150px', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notice?.data?.length > 0 ? (
                                notice.data.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td className="sn-column">{index + 1}</td>
                                        <td className="notice-title">{item.noticeHead}</td>
                                        <td className="action-column">
                                            <button 
                                                className="view-btn" 
                                                onClick={() => handleViewClick(item.id)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '30px' }}>
                                        No active notices found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </NoticeContainer>
    );
};

export default Notice;

const StatusMessage = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 1.2rem;
    font-family: 'Baloo 2', cursive;
    &.error { color: #ef4444; }
`;

const NoticeContainer = styled.div`
    min-height: 100vh;
    background-color: #f8fafc;
    padding: 40px 20px;
    font-family: 'Baloo 2', cursive;

    .notice-list {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        background-color: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .header-section {
        text-align: center;
        margin-bottom: 30px;
        
        h2 {
            font-size: 2.5rem;
            color: #1e293b;
            margin-bottom: 5px;
        }

        p {
            color: #64748b;
            font-size: 1.1rem;
        }
    }

    .table-wrapper {
        overflow-x: auto;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
    }

    .notice-table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
    }

    .notice-table th {
        background-color: #334155;
        color: white;
        padding: 18px 15px;
        text-align: left;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .notice-table td {
        padding: 15px;
        border-bottom: 1px solid #f1f5f9;
        color: #334155;
        font-size: 1.05rem;
    }

    .notice-table tr:last-child td {
        border-bottom: none;
    }

    .notice-table tr:hover {
        background-color: #f8fafc;
    }

    .sn-column {
        font-weight: 700;
        color: #94a3b8;
    }

    .notice-title {
        font-weight: 500;
    }

    .action-column {
        text-align: center;
    }

    .view-btn {
        padding: 8px 20px;
        background-color: #10b981;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);

        &:hover {
            background-color: #059669;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
        }

        &:active {
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        padding: 20px 10px;
        
        .notice-list {
            padding: 15px;
        }

        .notice-table th, .notice-table td {
            padding: 12px 8px;
            font-size: 0.95rem;
        }
    }
`;