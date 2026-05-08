import React from "react";
import '../assets/css/workspaceTask.css';
import useFetch from "../../hooks/UseFetch";
import { useLocation } from "react-router-dom";

function UserWorkspaceTask({ id }) {
    const workspaceId = id;

    const { data, loading, error } = useFetch(`/api/workspaceTask/${workspaceId}`);
    return (
        <>
            <h1 id="userWorkspaceHeading">Tasks</h1>

            <div className="userWorkspaceTableWrapper">
                <table className="userWorkspaceTable">
                    <thead className="userWorkspaceTableHead">
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody id="userWorkspaceTableBody" className="userWorkspaceTableBody">
                        {data?.data?.length > 0 && data?.data?.map((task, index) => (
                            <tr key={index} className="userWorkspaceTableRow">
                                <td>{index + 1}</td>
                                <td>{task.name}</td>
                                <td>{task.description}</td>
                                <td>{task.sdate}</td>
                                <td>{task.edate}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserWorkspaceTask;
