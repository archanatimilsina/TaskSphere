import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

const Notice = () => {
    const navigate = useNavigate();
    const { data: notice, loading, error } = useFetch("http://localhost:8000/api/allNotices");

    const handleViewClick = (id) => {
        // Navigating to the detailed view and passing the ID via state
        navigate("/admin/noticeDash", { state: { noticeId: id } });
    };

    if (loading) return <StatusMessage>Loading Notice Board...</StatusMessage>;
    if (error) return <StatusMessage className="error">Error: {error}</StatusMessage>;

    const noticesList = notice?.data || [];

    return (
        <NoticeContainer>
            <div className="header-section">
                <div className="icon-box">
                    <i className="fas fa-bullhorn"></i>
                </div>
                <h2>Notice Board</h2>
                <p>View and manage all official announcements and broadcasted updates</p>
            </div>

            <div className="table-wrapper">
                <table className="notice-table">
                    <thead>
                        <tr>
                            <th className="sn-col">SN</th>
                            <th className="head-col">Notice Headline</th>
                            <th className="date-col">Published Date</th>
                            <th className="action-col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticesList.length > 0 ? (
                            noticesList.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td className="sn-col">{index + 1}</td>
                                    <td className="head-col">
                                        <span className="notice-title">{item.noticeHead}</span>
                                    </td>
                                    <td className="date-col">
                                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : "---"}
                                    </td>
                                    <td className="action-col">
                                        <button className="view-btn" onClick={() => handleViewClick(item.id)}>
                                            <i className="fas fa-eye"></i> View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="empty-row">No active notices found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </NoticeContainer>
    );
};

export default Notice;

const StatusMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 1.2rem;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const NoticeContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Baloo 2', cursive;

    .header-section {
        text-align: center;
        margin-bottom: 40px;

        .icon-box {
            width: 60px;
            height: 60px;
            background: #f1f5f9;
            color: #3b82f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            font-size: 1.5rem;
        }

        h2 {
            font-size: 2.5rem;
            color: #1e293b;
            margin: 0;
            font-weight: 800;
        }

        p {
            color: #64748b;
            font-size: 1.1rem;
            margin-top: 5px;
        }
    }

    .table-wrapper {
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        border: 1px solid #f1f5f9;
    }

    .notice-table {
        width: 100%;
        border-collapse: collapse;
        
        th {
            background-color: #f8fafc;
            color: #475569;
            font-size: 1.1rem;
            font-weight: 700;
            padding: 20px;
            text-align: left;
            border-bottom: 2px solid #f1f5f9;
        }

        td {
            padding: 18px 20px;
            color: #334155;
            font-size: 1.05rem;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
        }

        tr:last-child td {
            border-bottom: none;
        }

        tr:hover {
            background-color: #fcfdfe;
        }

        .sn-col { width: 80px; text-align: center; font-weight: 700; color: #94a3b8; }
        .head-col { font-weight: 600; }
        .date-col { width: 180px; color: #64748b; }
        .action-col { width: 180px; text-align: center; }

        .notice-title {
            display: block;
            color: #1e293b;
        }

        .view-btn {
            padding: 8px 18px;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: inherit;

            &:hover {
                background-color: #2563eb;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            }

            i { font-size: 0.9rem; }
        }

        .empty-row {
            text-align: center;
            padding: 50px;
            color: #94a3b8;
            font-style: italic;
        }
    }

    @media (max-width: 768px) {
        .date-col { display: none; }
        .sn-col { width: 50px; }
    }
`;