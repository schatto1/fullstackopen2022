import React from "react";

const Notification: React.FC<{ message: string | null }> = ({ message }) => {

  const notificationStyle: React.CSSProperties = {
    color: 'red'
  };

  if (message === null) {
    return (
      null
    );
  }
  
  return (
    <div>
      <p style={notificationStyle}>{message}</p>
    </div>
  );
};

export default Notification;