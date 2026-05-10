import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

function PmProjects() {
    const { data, loading, error } = useFetch("http://localhost:8000/api/projectIndex");
    const navigate = useNavigate(); 

    const handleOpenProject = (id) => {
        navigate('/projectDash', { state: { selectedProjectId: id } });
    };

    const goToProjectForm = () => {
        navigate('/projectCreateForm');
    };

    if (loading) return <StatusBox>Loading project directory...</StatusBox>;
    if (error) return <StatusBox className="error">Error: {error}</StatusBox>;

    return (
        <ProjectsContainer>
            <div className="header-section">
                <div className="title-area">
                    <h1>Enterprise Projects</h1>
                    <p>Manage and monitor all active initiatives from a single dashboard.</p>
                </div>
                <button className="create-project-btn" onClick={goToProjectForm}>
                    <i className="fas fa-plus"></i> Initialize Project
                </button>
            </div>

            <div className="filter-bar">
                <div className="search-meta">
                    <span>Showing {data?.data?.length || 0} Projects</span>
                </div>
                <div className="action-icons">
                    <i className="fas fa-filter" title="Filter Projects"></i>
                    <i className="fas fa-th-large" title="Grid View"></i>
                </div>
            </div>

            <div className="project-list">
                {data?.data?.length > 0 ? (
                    data.data.map((project, index) => (
                        <div key={project.id} className="project-card-item">
                            <div className="project-index">{(index + 1).toString().padStart(2, '0')}</div>
                            <div className="project-info">
                                <h3>{project.name}</h3>
                                <span className="project-id-tag">ID: PROJ-{project.id}</span>
                            </div>
                            <div className="project-status">
                                <span className={`status-pill ${project.status.toLowerCase()}`}>
                                    {project.status}
                                </span>
                            </div>
                            <div className="project-actions">
                                <button className="open-btn" onClick={() => handleOpenProject(project.id)}>
                                    View Details <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <i className="fas fa-folder-open"></i>
                        <p>No projects found in the database.</p>
                    </div>
                )}
            </div>
        </ProjectsContainer>
    );
}

export default PmProjects;

const StatusBox = styled.div`
    text-align: center;
    padding: 100px;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const ProjectsContainer = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: 'Baloo 2', cursive;

    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 50px;
        
        .title-area {
            h1 { font-size: 2.8rem; color: #0f172a; margin: 0; }
            p { color: #64748b; font-size: 1.1rem; margin-top: 5px; }
        }

        .create-project-btn {
            background: #22c55e;
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);

            &:hover { background: #16a34a; transform: translateY(-2px); }
        }
    }

    .filter-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px 15px;
        border-bottom: 2px solid #f1f5f9;
        margin-bottom: 20px;

        .search-meta { color: #94a3b8; font-weight: 700; font-size: 0.9rem; }
        .action-icons {
            display: flex;
            gap: 20px;
            color: #64748b;
            i { cursor: pointer; transition: 0.2s; &:hover { color: #3b82f6; } }
        }
    }

    .project-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .project-card-item {
        background: white;
        padding: 20px 30px;
        border-radius: 20px;
        display: grid;
        grid-template-columns: 50px 1fr 150px 180px;
        align-items: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.03);
        border: 1px solid #f1f5f9;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.01);
            border-color: #dbeafe;
            box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }

        .project-index {
            font-weight: 800;
            color: #cbd5e1;
            font-size: 1.2rem;
        }

        .project-info {
            h3 { margin: 0; color: #1e293b; font-size: 1.3rem; }
            .project-id-tag { color: #94a3b8; font-size: 0.85rem; font-weight: 600; }
        }

        .status-pill {
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            text-transform: uppercase;
            background: #f1f5f9;
            color: #64748b;

            &.completed { background: #dcfce7; color: #15803d; }
            &.pending { background: #fef9c3; color: #a16207; }
            &.active { background: #dbeafe; color: #1d4ed8; }
        }

        .project-actions {
            text-align: right;
            .open-btn {
                background: none;
                border: 2px solid #f1f5f9;
                color: #3b82f6;
                padding: 10px 20px;
                border-radius: 12px;
                font-weight: 700;
                cursor: pointer;
                transition: 0.2s;
                display: flex;
                align-items: center;
                gap: 8px;
                justify-content: center;
                width: 100%;

                &:hover {
                    background: #3b82f6;
                    color: white;
                    border-color: #3b82f6;
                }
            }
        }
    }

    .empty-state {
        text-align: center;
        padding: 80px;
        color: #94a3b8;
        i { font-size: 3rem; margin-bottom: 20px; }
        p { font-size: 1.2rem; }
    }

    @media (max-width: 768px) {
        .project-card-item {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 15px;
            .project-actions { text-align: center; }
            .project-index { display: none; }
        }
        .header-section { flex-direction: column; align-items: center; text-align: center; gap: 20px; }
    }
`;