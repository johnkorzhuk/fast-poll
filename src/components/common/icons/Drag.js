import React from 'react';
import PropTypes from 'prop-types';

const Drag = ({ color }) => {
  return (
    <g id="icon-drag" fill={color}>
      <ellipse cx="1.333" cy="1.286" rx="1.333" ry="1.286" />
      <ellipse
        cx="1.333"
        cy="1.286"
        rx="1.333"
        ry="1.286"
        transform="translate(6.667)"
      />
      <ellipse
        cx="1.333"
        cy="1.286"
        rx="1.333"
        ry="1.286"
        transform="translate(13.333)"
      />
      <ellipse
        cx="1.333"
        cy="1.286"
        rx="1.333"
        ry="1.286"
        transform="translate(0 6.429)"
      />
      <ellipse
        cx="1.333"
        cy="1.286"
        rx="1.333"
        ry="1.286"
        transform="translate(6.667 6.429)"
      />
      <ellipse
        cx="1.333"
        cy="1.286"
        rx="1.333"
        ry="1.286"
        transform="translate(13.333 6.429)"
      />
    </g>
  );
};

Drag.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Drag;
