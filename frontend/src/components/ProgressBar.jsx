import React from 'react';

const ProgressBar = ({ progress }) => (
  <div style={{ marginTop: '1rem' }} data-testid="progressbar">
    <progress value={progress} max="100" style={{ width: '100%' }} />
    <div>{progress}%</div>
  </div>
);

export default ProgressBar;
