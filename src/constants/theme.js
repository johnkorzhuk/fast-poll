const white = '#ffffff';
const blue = '#08aeea';
const green = '#2af598';
const purple = '#A213E5';
const black = '#3D3131';
const lightGray = '#f4f4f5';
const gray = '#DADADE';
const darkGray = '#8C8E9B';
const red = '#FF2525';

const primaryGradient = `linear-gradient(100deg, ${blue} 0%, ${green} 100%)`;
const secondaryGradient = `linear-gradient(100deg, ${blue} 0%, ${purple} 100%)`;

export default {
  fonts: {
    heading: `'Lato', sans-serif`,
    primary: `'Open Sans', sans-serif`,
  },
  colors: {
    white,
    blue,
    green,
    purple,
    black,
    lightGray,
    gray,
    darkGray,
    red,
    primary: green,
    secondary: blue,
    positive: green,
    negative: red,
  },
  gradients: {
    primary: primaryGradient,
    secondary: secondaryGradient,
    positive: primaryGradient,
    negative: `linear-gradient(100deg, ${red} 33%, ${purple} 100%)`,
  },
};
