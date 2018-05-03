import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

export const IconContainer = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: ${({ size }) =>
    size ? (typeof size === 'number' ? `${size}px` : size) : 'auto'};
  width: ${({ size }) =>
    size ? (typeof size === 'number' ? `${size}px` : size) : 'auto'};
`;
