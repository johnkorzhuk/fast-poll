import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import AddCircle from './AddCircle';
import CheckCircle from './CheckCircle';
import EyeCircle from './EyeCircle';
import Drag from './Drag';
import Poll from './Poll';
import PowerCircle from './PowerCircle';
import GradientDefs, { ids } from './GradientDefs';

const Svg = styled.svg`
  width: ${({ size, width }) =>
    width ? `${width}px` : typeof size === 'number' ? `${size}px` : size};
  height: ${({ size, height }) =>
    height ? `${height}px` : typeof size === 'number' ? `${size}px` : size};

  > g {
    fill: ${({ gradient, color }) =>
      gradient ? `url(#${ids[gradient]})` : color};
  }
`;

const SvgContainer = withTheme(({ color, size, children, theme, ...props }) => {
  return (
    <Svg size={size} color={color} {...props}>
      {children}
      <GradientDefs theme={theme} />
    </Svg>
  );
});

const Icon = ({ icon, size, ...props }) => {
  switch (icon) {
    case 'add-circle':
      return (
        <SvgContainer viewBox="0 0 24 24" size={size} {...props}>
          <AddCircle />
        </SvgContainer>
      );

    case 'check-circle':
      return (
        <SvgContainer viewBox="0 0 24 24" size={size} {...props}>
          <CheckCircle />
        </SvgContainer>
      );

    case 'eye-circle':
      return (
        <SvgContainer viewBox="0 0 24 24" size={size} {...props}>
          <EyeCircle />
        </SvgContainer>
      );

    case 'power-circle':
      return (
        <SvgContainer viewBox="0 0 24 24" size={size} {...props}>
          <PowerCircle />
        </SvgContainer>
      );

    case 'drag':
      return (
        <SvgContainer
          size={size}
          width={size}
          height={9 / 16 * size}
          viewBox="0 0 16 9"
          {...props}>
          <Drag />
        </SvgContainer>
      );

    case 'poll':
      return (
        <SvgContainer
          size={size}
          width={size}
          height={14 / 20 * size}
          viewBox="0 0 20 14"
          {...props}>
          <Poll />
        </SvgContainer>
      );

    default:
      // eslint-disable-next-line no-console
      throw new Error(`No such icon of type: ${icon} passed to renderIcon`);
  }
};

Icon.defaultProps = {
  color: '#fff',
  size: 24,
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gradient: PropTypes.oneOf(Object.keys(ids)),
};

export default Icon;
