import styled, { css } from 'styled-components';

import { primary, primaryBold } from './typography';

const HORIZONTAL_BUTTON_PADDING = 25;

export const baseButtonStyles = css`
  padding: 8px ${HORIZONTAL_BUTTON_PADDING}px;
  border: none;
  border-radius: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  outline: none;
`;

export const Selection = styled.div`
  ${primary()};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  width: 100%;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.lightGray};
  border: 1px solid
    ${({ active, theme }) => (active ? theme.colors.gray : 'transparent')};
  padding: 6px 0;
  padding-left: ${({ newest, created }) =>
    newest || created ? '20px' : '50px'};
  padding-right: ${({ newest, created, active, result }) =>
    newest || (created && active && result) || (!created && active)
      ? '130px'
      : '34px'};
  position: relative;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  ${baseButtonStyles};
  ${primary('1.3rem')};
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
    }`} + ${HORIZONTAL_BUTTON_PADDING}px);
`;

export const Input = styled.input`
  ${primary()};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  padding: 4px 16px;
  transition: border-color 200ms linear;

  &:hover,
  &:active,
  &:focus {
    border-color: ${({ theme }) => theme.colors.darkGray};
  }
`;

export const Label = styled.label`
  ${primaryBold()};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.6rem;
  margin-bottom: 12px;
`;
