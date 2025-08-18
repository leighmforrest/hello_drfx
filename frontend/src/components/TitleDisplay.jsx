import React from 'react';

export const commonTextStyles =
  'w-full border rounded p-2 text-base leading-relaxed';

const TitleDisplay = ({ title, className = "" }) => {
  return (
    <p className={`${commonTextStyles} whitespace-pre-wrap border-transparent ${className}`}>
      {title}
    </p>
  );
};

export default TitleDisplay;
