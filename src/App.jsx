import React, { useState } from "react";

import * as S from './App.styles'
import Header from "./components/Header";
import SideBarMenu from "./components/SideBarMenu";
import SocialNetworks from "./components/SocialNetworks";

import Home from "./sections/Home";
import MeuPerfil from "./sections/MeuPerfil";
import Projetos from "./sections/Projetos";
import SobreMim from "./sections/SobreMim";

const App = () => {

  const [openMenu, setOpenMenu] = useState(true)

  return (
    <S.GlobalContainer>
      <Header setOpenMenu={setOpenMenu} openMenu={openMenu}/>
      <SocialNetworks />
      <SideBarMenu openMenu={openMenu}/>
      <Home />
      <SobreMim />
      <MeuPerfil />
      <Projetos />
    </S.GlobalContainer>
  );
}

export default App;
