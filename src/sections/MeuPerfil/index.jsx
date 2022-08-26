import React from "react";
import Profile from "../../components/Profile";

import * as S from './styles'
import { profileData } from "../../data/profile";

const MeuPerfil = () => {
    return <S.Container id="meu-perfil">
        <Profile profileData={profileData}/>
    </S.Container>
}

export default MeuPerfil