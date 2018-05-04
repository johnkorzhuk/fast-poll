import React from 'react';
import PropTypes from 'prop-types';

const CheckCircle = ({ gradient }) => {
  const [color1, color2] = gradient;

  return (
    <g
      id="icon-check-circle"
      fill={gradient.length === 2 ? 'url(#icon-check-circle_linear)' : null}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12c0 6.627-5.372 12-12 12S0 18.627 0 12 5.372 0 12 0s12 5.373 12 12zm-5.83-2.245l-1.615-1.617-5.657 5.658-2.425-2.425-1.616 1.616 4.04 4.04 7.274-7.272z"
      />

      {gradient && (
        <defs>
          <linearGradient
            id="icon-check-circle_linear"
            x2="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(31.4236 19.6198 -25.8872 644.356 5.277 -321.128)">
            <stop stopColor={color1} />
            <stop offset="1" stopColor={color2} />
          </linearGradient>
        </defs>
      )}
    </g>
  );
};

CheckCircle.defaultProps = {
  gradient: [],
};

CheckCircle.propTypes = {
  gradient: PropTypes.arrayOf(PropTypes.string),
};

export default CheckCircle;
