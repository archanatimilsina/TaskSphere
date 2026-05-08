import useFetch from "../../hooks/UseFetch";
import '../assets/css/tasks.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const { data, loading, error } = useFetch("/api/taskIndex");
  const { data: employees, loading: loading1, error: error1 } = useFetch("/api/allUsers");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    employee: [],
    sdate: "",
    edate: "",
    status: "Not started",
    priority: "",
    workspaceId: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "employee") {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, employee: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const assignTask = () => {
    navigate("/react/projectManager/");
  };

  return (
    <>
      <div className="userWorkspacePublicHeaderBar">
        <h1 id="userWorkspacePublicTaskHeading">Tasks</h1>
        <i className="fa-solid fa-filter" id="userWorkspacePublicFilter" title="Filter"></i>
      </div>

      <div className="userWorkspacePublicTableContainer">
        <table>
          <thead >
            <tr className="rowrowrow">
              <th className="userWorkspacePublicTh">S.N</th>
              <th className="userWorkspacePublicTh">Name</th>
              <th className="userWorkspacePublicTh">Description</th>
              <th className="userWorkspacePublicTh">Employee Username</th>
              <th className="userWorkspacePublicTh">Start Date</th>
              <th className="userWorkspacePublicTh">End Date</th>
              <th className="userWorkspacePublicTh">Status</th>
              <th className="userWorkspacePublicTh">Priority</th>
              <th className="userWorkspacePublicTh">Updated At</th>
              <th className="userWorkspacePublicTh">Response</th>
            </tr>
          </thead>
          <tbody id="userWorkspacePublicTaskTableBody">
            {data?.data?.length > 0 && data?.data?.map((task, index) => (
              <tr key={index} className="rowrowrow">
                <td className="userWorkspacePublicTd">{index + 1}</td>
                <td className="userWorkspacePublicTd">{task.name}</td>
                <td className="userWorkspacePublicTd">{task.description}</td>
                <td className="userWorkspacePublicTd">
                  {(() => {
                    let empIds = [];
                    try {
                      empIds = Array.isArray(task.employee)
                        ? task.employee
                        : JSON.parse(task.employee);
                    } catch (e) {
                      console.error("Invalid employee JSON", task.employee);
                      empIds = [];
                    }

                    return empIds.map((empId) => {
                      const emp = employees?.data?.find((e) => e.id === parseInt(empId));
                      return (
                        <span key={empId} style={{ marginRight: '5px' }}>
                          {emp?.fname + " " + emp?.lname || 'Unknown'}
                        </span>
                      );
                    });
                  })()}
                </td>
                <td className="userWorkspacePublicTd">{task.sdate}</td>
                <td className="userWorkspacePublicTd">{task.edate}</td>
                <td className="userWorkspacePublicTd">{task.status}</td>
                <td className="userWorkspacePublicTd">{task.priority}</td>
                <td className="userWorkspacePublicTd">{task.updated_at}</td>
                <td className="userWorkspacePublicResponseTd">
                  <button className="userWorkspacePublicTaskResponseBtn userWorkspacePublicUpdateBtn" onClick={() => setShowUpdateModal(true)}>Update</button>
                  <button className="userWorkspacePublicTaskResponseBtn userWorkspacePublicDeleteBtn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showUpdateModal && (
          <div className="userWorkspacePublicModal">
            <div className="userWorkspacePublicModalContent">
              <span className="userWorkspacePublicClose" onClick={() => setShowUpdateModal(false)}>&times;</span>
              <h3>Update task</h3>
              <form onSubmit={handleUpdate}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />

                <label htmlFor="employee">Employee</label>
                <select name="employee" id="employee" className="userWorkspacePublicFormInput" value={formData.employee} onChange={handleInputChange} multiple required>
                  {employees?.data?.length > 0 && employees.data.map((employee, index) => (
                    <option value={employee.id} key={index}>
                      {employee.fname + " " + employee.lname}
                    </option>
                  ))}
                </select>

                <label htmlFor="sdate">Start Date</label>
                <input type="date" id="sdate" name="sdate" value={formData.sdate} onChange={handleInputChange} required />

                <label htmlFor="edate">End Date</label>
                <input type="date" id="edate" name="edate" value={formData.edate} onChange={handleInputChange} required />

                <label htmlFor="priority">Priority</label>
                <input type="text" id="priority" name="priority" value={formData.priority} onChange={handleInputChange} required />

                <button className="userWorkspacePublicBtn primary" type="submit">Update</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Tasks;
