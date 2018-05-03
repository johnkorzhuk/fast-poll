import React from 'react';
import PropTypes from 'prop-types';

const EyeCircle = ({ color }) => {
  return (
    <g id="icon-eye-circle">
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-19.428.024S7.048 6.857 12 6.857 19.429 12 19.429 12 16.952 17.144 12 17.144s-7.428-5.12-7.428-5.12z"
      />
      <path
        fill={color}
        d="M9.524 12c0-1.263 1.108-2.286 2.476-2.286 1.368 0 2.476 1.023 2.476 2.286 0 1.262-1.109 2.285-2.476 2.285-1.368 0-2.476-1.023-2.476-2.285z"
      />
    </g>
  );
};

EyeCircle.propTypes = {
  color: PropTypes.string.isRequired,
};

export default EyeCircle;
