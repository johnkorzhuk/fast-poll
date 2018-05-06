import styled, { css } from 'styled-components';

export const heading = (fontSize = '3.6rem') => css`
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${fontSize};
`;

export const primary = (fontSize = '1.6rem') => css`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${fontSize};
`;

export const primarySemiBold = fontSize => css`
  ${primary(fontSize)};
  font-weight: 600;
`;

export const primaryBold = fontSize => css`
  ${primary(fontSize)};
  font-weight: 700;
`;

export const link = css`
  ${primaryBold()};
  font-size: 1.6rem;
  text-decoration: none;
`;

export const Heading1 = styled.h1`
  ${heading()};
  margin-bottom: 24px;
`;

export const Heading2 = styled.h2`
  ${heading('2.4rem')};
  margin-bottom: 18px;
`;

export const Paragraph = styled.p`
  ${primary()};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 30px;
`;
