import React from "react";
import './Loading.css'
const Loading = ({ status }) => {
  if (!status) return null;
  return (
    <div className="loading-div-container">
      <div id="loading-div"></div>
    </div>
  );
};

export default Loading;
