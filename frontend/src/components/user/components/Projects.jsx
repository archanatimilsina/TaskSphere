import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

export default function UserProjects() {
    const { data, loading, error } = useFetch("http://localhost:8000/api/projectIndex");
    const navigate = useNavigate();

    const handleOpenProject = (id) => {
        navigate('/projectDash', { state: { selectedProjectId: id } });
    };

    if (loading) return <StatusWrapper>Loading project portfolios...</StatusWrapper>;
    if (error) return <StatusWrapper className="error">Synchronization Error: {error}</StatusWrapper>;

    return (
        <ProjectsContainer>
            <header className="page-header">
                <div className="header-content">
                    <h1>Projects</h1>
                    <p>Manage and track the progress of your active initiatives.</p>
                </div>
                <div className="header-tools">
                    <button className="tool-btn" title="Search Projects">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button className="tool-btn" title="Filter List">
                        <i className="fa-solid fa-arrow-down-wide-short"></i>
                    </button>
                </div>
            </header>

            <div className="project-grid">
                {data?.data?.length > 0 ? (
                    data.data.map((project, index) => (
                        <div key={project.id || index} className="project-row">
                            <div className="project-meta">
                                <span className="project-number">{(index + 1).toString().padStart(2, '0')}</span>
                                <div className="name-box">
                                    <h3 className="project-name">{project.name}</h3>
                                    <span className="project-type">External Project</span>
                                </div>
                            </div>
                            
                            <div className="project-status">
                                <span className={`status-pill ${project.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <i className="fa-solid fa-circle"></i> {project.status}
                                </span>
                            </div>

                            <div className="project-actions">
                                <button className="launch-btn" onClick={() => handleOpenProject(project.id)}>
                                    View Details <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <i className="fa-solid fa-folder-open"></i>
                        </div>
                        <h3>No Projects Found</h3>
                        <p>It looks like you haven't been assigned to any projects yet.</p>
                        <button className="refresh-btn" onClick={() => window.location.reload()}>
                            Refresh Dashboard
                        </button>
                    </div>
                )}
            </div>
        </ProjectsContainer>
    );
}

const StatusWrapper = styled.div`
    text-align: center;
    padding: 100px;
    font-family: 'Baloo 2', cursive;
    font-size: 1.2rem;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const ProjectsContainer = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: 'Baloo 2', cursive;

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 50px;

        h1 {
            font-size: 3rem;
            color: #1e293b;
            margin: 0;
            line-height: 1;
        }

        p {
            color: #94a3b8;
            font-size: 1.1rem;
            margin-top: 10px;
        }

        .header-tools {
            display: flex;
            gap: 12px;
        }

        .tool-btn {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            background: white;
            color: #64748b;
            cursor: pointer;
            transition: 0.2s;
            &:hover {
                color: #10b981;
                border-color: #10b981;
                background: #f0fdf4;
            }
        }
    }

    .project-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .project-row {
        background: white;
        border-radius: 20px;
        padding: 24px 35px;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        align-items: center;
        border: 1px solid #f1f5f9;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.01);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
            border-color: #10b981;
        }

        @media (max-width: 850px) {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
            padding: 30px;
        }
    }

    .project-meta {
        display: flex;
        align-items: center;
        gap: 25px;

        @media (max-width: 850px) { flex-direction: column; gap: 10px; }

        .project-number {
            font-size: 1.5rem;
            font-weight: 800;
            color: #f1f5f9;
            background: #f8fafc;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
        }

        .project-name {
            font-size: 1.4rem;
            color: #1e293b;
            margin: 0;
            font-weight: 700;
        }

        .project-type {
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 600;
        }
    }

    .status-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        border-radius: 50px;
        font-size: 0.9rem;
        font-weight: 700;
        background: #f1f5f9;
        color: #475569;

        i { font-size: 0.5rem; }
        
        &.completed { background: #f0fdf4; color: #10b981; }
        &.in-progress { background: #eff6ff; color: #3b82f6; }
        &.pending { background: #fffbeb; color: #d97706; }
    }

    .launch-btn {
        justify-self: end;
        padding: 12px 24px;
        background: #f8fafc;
        color: #10b981;
        border: 2px solid #f1f5f9;
        border-radius: 14px;
        font-weight: 800;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 0.2s;
        font-family: inherit;

        &:hover {
            background: #10b981;
            color: white;
            border-color: #10b981;
            transform: translateX(5px);
        }

        @media (max-width: 850px) { justify-self: center; width: 100%; }
    }

    .empty-state {
        text-align: center;
        padding: 80px 40px;
        background: white;
        border-radius: 30px;
        border: 2px dashed #e2e8f0;

        .empty-icon {
            font-size: 4rem;
            color: #f1f5f9;
            margin-bottom: 20px;
        }

        h3 { font-size: 1.8rem; color: #64748b; margin: 0; }
        p { color: #94a3b8; margin: 10px 0 30px; }

        .refresh-btn {
            background: #1e293b;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            font-family: inherit;
            &:hover { background: #0f172a; }
        }
    }
`;