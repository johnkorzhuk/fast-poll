import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AddCircle from './AddCircle';
import CheckCircle from './CheckCircle';
import EyeCircle from './EyeCircle';
import Drag from './Drag';

const SVG = styled.svg`
  width: ${({ size, width }) =>
    width ? `${width}px` : typeof size === 'number' ? `${size}px` : size};
  height: ${({ size, height }) =>
    height ? `${height}px` : typeof size === 'number' ? `${size}px` : size};

  > g {
    ${({ color, gradient }) => !gradient && `fill: ${color};`};
  }
`;

const Icon = ({ icon, color, size, gradient, ...props }) => {
  switch (icon) {
    case 'add-circle':
      return (
        <SVG {...props} size={size} viewBox="0 0 24 24" color={color}>
          <AddCircle />
        </SVG>
      );

    case 'check-circle':
      return (
        <SVG
          {...props}
          gradient={gradient.length === 2}
          size={size}
          viewBox="0 0 24 24"
          color={color}>
          <CheckCircle gradient={gradient} />
        </SVG>
      );

    case 'eye-circle':
      return (
        <SVG {...props} size={size} viewBox="0 0 24 24" color={color}>
          <EyeCircle />
        </SVG>
      );

    case 'drag':
      return (
        <SVG
          {...props}
          gradient={gradient.length === 2}
          color={color}
          size={size}
          width={size}
          height={9 / 16 * size}
          viewBox="0 0 16 9">
          <Drag gradient={gradient} />
        </SVG>
      );

    default:
      // eslint-disable-next-line no-console
      throw new Error(`No such icon of type: ${icon} passed to renderIcon`);
  }
};

Icon.defaultProps = {
  color: '#fff',
  size: 24,
  gradient: [],
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gradient: PropTypes.arrayOf(PropTypes.string),
};

export default Icon;
