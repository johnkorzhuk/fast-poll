import styled, { css } from 'styled-components';

export const headingStyles = css`
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.black};
`

export const defaultStyles = css`
  font-family: ${({ theme }) => theme.fonts.default};
  font-size: 1.6rem;
`

export const Heading1 = styled.h1`
  ${headingStyles};
  margin-bottom: 24px;
  font-size: 3.6rem;
`

export const Paragraph = styled.p`
  ${defaultStyles};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 30px;
`