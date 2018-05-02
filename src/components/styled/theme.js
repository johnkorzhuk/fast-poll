import styled, { css } from 'styled-components';

export const baseButtonStyles = css`
  padding: 5px 25px;
  border: none;
  border-radius: 17px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:focus {
    outline: 0;
  }
`;

export const Button = styled.button`
  ${baseButtonStyles} background-image: linear-gradient(116deg, #08aeea 0%, #2af598 100%);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-family: sans-serif;
  filter: ${({ disabled }) => (disabled ? 'grayscale(1)' : 'hue-rotate(0deg)')};
  transition: filter 300ms linear;

  &:focus,
  &:hover {
    filter: ${({ disabled }) => !disabled && 'hue-rotate(45deg)'};
  }
`;
