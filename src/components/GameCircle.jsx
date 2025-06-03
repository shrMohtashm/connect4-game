import React from "react";

export default function GameCircle({ id, children, handleClick ,className }) {
  return (
    <div
      className={`gameCircle ${className}`}
      onClick={() => handleClick(id)}
    >
      {children}
    </div>
  );
}
