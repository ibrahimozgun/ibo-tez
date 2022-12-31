import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
