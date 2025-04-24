import React from "react";
import ReactDOM from "react-dom/client";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { createGlobalStyle } from "styled-components";
import { App } from "./App";

// Estilos globales
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto Slab';
    src: url('./assets/fonts/RobotoSlab.woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: Roboto;
    background-color: #faf4ec;
  }
  
  ::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color:rgb(232, 93, 93);
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  opacity: 0;
}
`;

const Root = ReactDOM.createRoot(document.getElementById("root"))
Root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);