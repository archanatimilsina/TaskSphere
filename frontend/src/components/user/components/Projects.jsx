import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from "../../hooks/UseFetch";

function Projects() {
    const { data, loading, error } = useFetch("/api/projectIndex");
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const navigate = useNavigate();

    const handleOpenProject = (id) => {
        setSelectedProjectId(id);
        navigate('/projectDash', { state: { selectedProjectId: id } });
    };

    if (loading) return <LoadingText>Loading projects...</LoadingText>;
    if (error) return <ErrorText>Error loading projects: {error}</ErrorText>;

    return (
        <ProjectsContainer>
            <h1 id="projectHeading">Projects</h1>
            
            <div className="topBar">
                <i className="fa-solid fa-filter btn btn-link" id="filter" title="Filter Projects"></i>
            </div>

            <div className="projectList">
                {data?.data?.length > 0 ? (
                    data.data.map((project, index) => (
                        <div key={project.id || index} className="projectCard">
                            <ul>
                                <li className="projectIndex">{index + 1}</li>
                                <li className="projectName">{project.name}</li>
                                <li className="projectStatus">
                                    <span className={`statusBadge ${project.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {project.status}
                                    </span>
                                </li>
                                <li>
                                    <button className="projectBtn" onClick={() => handleOpenProject(project.id)}>
                                        Open
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="noData">
                        <p>No projects found in your workspace.</p>
                    </div>
                )}
            </div>
        </ProjectsContainer>
    );
}

const LoadingText = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 1.5rem;
    color: #64748b;
`;

const ErrorText = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 1.2rem;
    color: #ef4444;
`;

const ProjectsContainer = styled.div`
    padding: 20px;
    min-height: 100vh;
    font-family: 'Baloo 2', sans-serif;

    #projectHeading {
        color: #1e293b;
        font-size: 3rem;
        text-align: center;
        margin: 40px 0;
        font-weight: 700;
    }

    .topBar {
        display: flex;
        justify-content: flex-end;
        width: 85%;
        max-width: 1200px;
        margin: 0 auto 20px auto;
    }

    #filter {
        font-size: 1.5rem;
        color: #64748b;
        cursor: pointer;
        transition: color 0.3s;
        &:hover { color: #1e293b; }
    }

    .projectList {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .projectCard {
        background-color: white;
        border-radius: 16px;
        width: 85%;
        max-width: 1200px;
        height: auto;
        min-height: 90px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            list-style: none;
            margin: 0;

            @media (max-width: 600px) {
                flex-direction: column;
                gap: 15px;
                text-align: center;
                padding: 20px;
            }
        }
    }

    .projectIndex {
        font-weight: 700;
        color: #94a3b8;
        width: 40px;
    }

    .projectName {
        flex: 1;
        font-weight: 600;
        font-size: 1.4rem;
        color: #1e293b;
        margin-left: 20px;
    }

    .statusBadge {
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        background: #f1f5f9;
        color: #475569;
        
        &.completed { background: #dcfce7; color: #166534; }
        &.in-progress { background: #dbeafe; color: #1e40af; }
        &.pending { background: #fef9c3; color: #854d0e; }
    }

    .projectBtn {
        width: 110px;
        height: 42px;
        color: white;
        background-color: #10b981;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        margin-left: 20px;

        &:hover {
            background-color: #059669;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
    }

    .noData {
        background: #f8fafc;
        padding: 40px;
        border-radius: 12px;
        border: 2px dashed #e2e8f0;
        color: #94a3b8;
        font-size: 1.2rem;
    }
`;

export default Projects;