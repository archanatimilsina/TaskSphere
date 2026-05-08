import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import '../assets/css/workspaces.css'; // <-- updated CSS import
import { useState } from "react";

function UserWorkspaces() {
    const { data, loading, error } = useFetch("/api/workspaceIndex");
    const [workspaceId, setWorkspaceId] = useState(null);
    const navigate = useNavigate();

    const WorkspaceDash = (id) => {
        setWorkspaceId(id);
        navigate('/workspaceDash', { state: { workspaceId: id } });
    }

    return (
        <>
            <h1 id="userWorkspaceHeading">Workspaces</h1>
            <div className="userWorkspaceIndex">
                {data?.data?.length > 0 && data?.data?.map((workspace, index) => {
                    return (
                        <div key={index} className="userWorkspaceCard">
                            <ul>
                                <li>{workspace?.name}</li>
                                <li><button className="userWorkspaceBtn" onClick={() => WorkspaceDash(workspace.id)}>Open</button></li>
                            </ul>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default UserWorkspaces;
