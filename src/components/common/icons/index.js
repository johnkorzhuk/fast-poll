import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import AddCircle from './AddCircle'

const SVG = styled.svg`
  width: ${({ size }) => typeof size === 'number' ? `${size}px` : size};
  height: ${({ size }) => typeof size === 'number' ? `${size}px` : size};
  vertical-align: middle;
`;

const renderIcon = (icon, props) => {
  switch (icon) {
    case 'add-circle':
      return <AddCircle {...props}/>
  
    default:
      // eslint-disable-next-line no-console
      console.error(`No such icon of type: ${icon} passed to renderIcon`)
      return null
  }
}

const Icon = ({
  icon,
  color,
  ...props
}) => {
  return (
    <SVG {...props} viewBox="0 0 24 24">
      {renderIcon(icon, { color })}
    </SVG>
  )
}

Icon.defaultProps = {
  color: '#fff',
  size: 24,
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
}

export default Icon