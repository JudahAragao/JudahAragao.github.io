import React from "react";

import * as S from './styles'

const SideBarMenu = ({ openMenu }) => {
    return <S.Container openMenu={openMenu}>
        <ul>
            <a href="#home">
                <li>Home</li>
            </a>

            <a href="#sobre-mim">
                <li>Sobre mim</li>
            </a>

            <a href="#meu-perfil">
                <li>Meu Perfil</li>
            </a>

            <a href="#projetos">
                <li>Projetos</li>
            </a>
        </ul>
    </S.Container>
}

export default SideBarMenu