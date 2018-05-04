/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

export const ids = {
  primary: 'svg-gradient-primary',
  secondary: 'svg-gradient-secondary',
  positive: 'svg-gradient-positive',
  negative: 'svg-gradient-negative',
};

export const PrimaryGradient = ({ theme }) => (
  <linearGradient
    id={ids.primary}
    x2="1"
    gradientUnits="userSpaceOnUse"
    gradientTransform="matrix(31.4236 19.6198 -25.8872 644.356 5.277 -321.128)">
    <stop stopColor={theme.colors.blue} />
    <stop offset="1" stopColor={theme.colors.green} />
  </linearGradient>
);
PrimaryGradient.propTypes = {
  theme: PropTypes.object.isRequired,
};

export const SecondaryGradient = ({ theme }) => (
  <linearGradient
    id={ids.secondary}
    x2="1"
    gradientUnits="userSpaceOnUse"
    gradientTransform="matrix(31.2619 17.08 -26.9817 543.867 11.67 -275.854)">
    <stop stopColor={theme.colors.purple} />
    <stop offset="1" stopColor={theme.colors.green} />
  </linearGradient>
);
SecondaryGradient.propTypes = {
  theme: PropTypes.object.isRequired,
};

export const PositiveGradient = ({ theme }) => (
  <linearGradient
    id={ids.positive}
    x2="1"
    gradientUnits="userSpaceOnUse"
    gradientTransform="matrix(31.4236 19.6198 -25.8872 644.356 5.277 -321.128)">
    <stop stopColor={theme.colors.blue} />
    <stop offset="1" stopColor={theme.colors.green} />
  </linearGradient>
);
PositiveGradient.propTypes = {
  theme: PropTypes.object.isRequired,
};

export const NegativeGradient = ({ theme }) => (
  <linearGradient
    id={ids.negative}
    x2="1"
    gradientUnits="userSpaceOnUse"
    gradientTransform="matrix(48.7904 -.70711 3.50946 242.152 -3.062 -109.869)">
    <stop stopColor={theme.colors.red} />
    <stop offset="1" stopColor={theme.colors.purple} />
  </linearGradient>
);
NegativeGradient.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default props => {
  return (
    <defs>
      <PrimaryGradient {...props} />
      <SecondaryGradient {...props} />
      <PositiveGradient {...props} />
      <NegativeGradient {...props} />
    </defs>
  );
};
