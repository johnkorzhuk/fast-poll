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
`;

const renderIcon = (icon, props) => {
  switch (icon) {
    case 'add-circle':
      return <AddCircle {...props} />;

    case 'check-circle':
      return <CheckCircle {...props} />;

    case 'eye-circle':
      return <EyeCircle {...props} />;

    case 'drag':
      return <Drag {...props} />;

    default:
      // eslint-disable-next-line no-console
      throw new Error(`No such icon of type: ${icon} passed to renderIcon`);
  }
};

const Icon = ({ icon, color, size, aspectRatio, gradient, ...props }) => {
  const [width, height] = aspectRatio;
  const hasAR = aspectRatio.length === 2;

  if (!hasAR) {
    return (
      <SVG {...props} size={size} viewBox="0 0 24 24">
        {renderIcon(icon, { color, size, gradient })}
      </SVG>
    );
  }

  return (
    <SVG
      {...props}
      size={size}
      width={size}
      height={height / width * size}
      viewBox={`0 0 ${width} ${height}`}>
      {renderIcon(icon, { color, size, gradient })}
    </SVG>
  );
};

Icon.defaultProps = {
  color: '#fff',
  size: 24,
  aspectRatio: [],
  gradient: [],
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  aspectRatio: PropTypes.arrayOf(PropTypes.number.isRequired),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gradient: PropTypes.arrayOf(PropTypes.string),
};

export default Icon;
