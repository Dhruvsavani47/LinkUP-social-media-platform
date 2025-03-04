import React from "react";
import GlobalCard from "./GlobalCard";

const FollowingCard = ({ user }) => {
  const containerStyle = {
    width: "100%",
    maxWidth: "1000px",
    margin: "1rem auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "16px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  };

  const noDataStyle = {
    textAlign: "center",
    color: "#666",
    fontSize: "18px",
    fontWeight: "500",
    padding: "20px",
  };

  return (
    <>
      <div style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "20px auto",
        background: "white",
        minHeight: "20px",
        padding: "1rem",
        border: "2px solid white",
        borderRadius: "12px"
      }}>
        <h4 style={{ textAlign: "center" }}>
          {user.length} <span>Following</span>
        </h4>
      </div>
      <div style={containerStyle}>
        {user.length > 0 ? (
          user.map((fol, index) => (
              <GlobalCard user={fol} key={index}/>

          ))
        ) : (
          <div style={noDataStyle}>No following to display</div>
        )}
      </div>
    </>
  );
};

export default FollowingCard;