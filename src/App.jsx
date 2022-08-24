import React from "react";

import * as S from './App.styles'
import Header from "./components/Header";

import Home from "./sections/Home";

function App() {
  return (
    <S.GlobalContainer>
      <Header />
      <Home />
    </S.GlobalContainer>
  );
}

export default App;
