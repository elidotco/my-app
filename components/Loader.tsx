import React from "react";
import "../app/Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Loader;
