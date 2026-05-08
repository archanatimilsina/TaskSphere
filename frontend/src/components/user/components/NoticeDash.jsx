import React from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import '../assets/css/noticeDash.css';
import bleachImg from '../../../../images/bleach.jpg'; 

function NoticeDash() {
  const location = useLocation();
  const { noticeId } = location.state;
  const { data:notice, loading, error } = useFetch(`/api/singleNotice/${noticeId}`);

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
