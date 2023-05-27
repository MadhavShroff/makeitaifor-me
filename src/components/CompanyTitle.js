import React from 'react';

const CompanyTitle = ({ title }) => (
  <div
    title={title}
    className="company-title"
    style={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}
  >
    <span className="company-title-text">
      {title}
    </span>
  </div>
);

export default CompanyTitle;