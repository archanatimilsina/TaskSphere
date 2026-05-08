import React, { useState } from 'react';
import '../assets/css/notices.css';
import { useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/UseFetch";

const Notice = () => {
    const navigate=useNavigate();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const {data:notice,loading,error}=useFetch("/api/allNotices");


  const handleViewClick = async(id) => {
    setSelectedNotice(id);
  navigate("/noticeDash",{state:{noticeId:id}});
  };

  return (
    <div className="notice-list">
      <h2>Notice Board</h2>
      <table className="notice-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Notice Head</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notice?.data?.map((notice, index) => (
            <tr key={notice.id}>
              <td>{index + 1}</td>
              <td>{notice.noticeHead}</td>
              <td>
                <button onClick={() => handleViewClick(notice.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Notice;
