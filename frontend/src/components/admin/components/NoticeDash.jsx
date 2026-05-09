import React from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import '../assets/css/noticeDash.css';
import bleachImg from '../../../../images/bleach.jpg'; 
import styled from 'styled-components';

function NoticeDash() {
  const location = useLocation();
  const { noticeId } = location.state;
  const { data:notice, loading, error } = useFetch(`http://localhost:8000/api/singleNotice/${noticeId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  return (
    <div className="notice-dashboard">
      <div className="notice-header">
        <h2>{notice.data.noticeHead}</h2>
        <span className="notice-date">{notice.data.created_at}</span>
      </div>
      <div className="notice-description">
        <p>{notice.data.noticeDescription}</p>
      </div>
      {notice.data.image && <img className="notice-image" src={notice.data.image} alt="Image not loading" />}
    </div>
  );
}

export default NoticeDash;

const NoticeDashContainer = styled.div`
  .notice-dashboard {
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .notice-header {
    text-align: center;
  }
  
  .notice-header h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .notice-date {
    font-size: 14px;
    color: #888;
  }
  
  .notice-description {
    font-size: 16px;
    margin-top: 20px;
    line-height: 1.6;
  }
  
  .notice-image {
    margin-top: 20px;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  

`;