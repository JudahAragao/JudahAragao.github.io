import React from "react";

import * as S from './styles'

const Header = ({ setOpenMenu, openMenu }) => {
    return <S.Container>
        <S.BodyLeft>
            <S.Logo />
        </S.BodyLeft>
        <S.BodyRight>
            <S.BtnMenu onClick={()=> setOpenMenu(!openMenu)} openmenu={openMenu}/>
        </S.BodyRight>
    </S.Container>
}

export default Header