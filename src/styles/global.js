import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    background-image: url('https://i.postimg.cc/RV90qXJk/bg-aut-res.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    font-family: Roboto, Arial, Helvetica, sans-serif
  }
`;

export default GlobalStyle;