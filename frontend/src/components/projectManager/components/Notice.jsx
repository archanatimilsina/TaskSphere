import React, { useState } from 'react';
import '../assets/css/notices.css';
import { useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/UseFetch";
import styled from 'styled-components';

const Notice = () => {
    const navigate=useNavigate();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const {data:notice,loading,error}=useFetch("http://localhost:8000/api/allNotices");


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

const NoticeContainer = styled.div`
  
.notice-list {
  width: 80%;
  margin: 20px auto;
}

.notice-list h2 {
  text-align: center;
  font-size: 24px;
}

.notice-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.notice-table th, .notice-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  color: black;
}

.notice-table th {
  background-color: #334155;
  color: white;
    font-size: 23px;
}

button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.notice-detail {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

.notice-detail h3 {
  font-size: 22px;
}

.notice-detail p {
  font-size: 16px;
}

.notice-detail img {
  margin-top: 20px;
  max-width: 100%;
  height: auto;
}

`;