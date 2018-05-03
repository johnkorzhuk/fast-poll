import styled, { css } from 'styled-components';

const HORIZONTAL_PADDING = 25;

export const baseButtonStyles = css`
  padding: 8px ${HORIZONTAL_PADDING}px;
  border: none;
  border-radius: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 1.4rem;
  outline: none;
`;

export const Button = styled.button`
  ${baseButtonStyles};
  font-family: ${({ theme }) => theme.fonts.default};
  font-weight: 600;
  background-image: ${({ theme, type }) => theme.gradients[type]};
  color: white;
  text-transform: uppercase;
  filter: ${({ disabled }) => (disabled ? 'grayscale(1)' : 'hue-rotate(0deg)')};
  z-index: 2;
  position: relative;
  transition: filter 200ms linear;
  ${({ icon, iconSize }) =>
    icon &&
    `padding-right: calc(${
      typeof iconSize === 'number' ? `${iconSize}px` : iconSize
    }`} + ${HORIZONTAL_PADDING}px);
`;
