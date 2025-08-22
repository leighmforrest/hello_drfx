import React from 'react';


const TitleDisplay = ({ title, className = "" }) => {
  return (
    <p className={` ${className} whitespace-pre-wrap border-transparent`}>
      {title}
    </p>
  );
};

export default TitleDisplay;
