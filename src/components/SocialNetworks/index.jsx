import React from "react";

import * as S from './styles'

const SocialNetworks = () => {
    return <S.Container>
        <a href="https://github.com/judahAragao" target="_blank">
            <S.IconGitHub />
        </a>

        <a href="https://www.linkedin.com/in/judaharagao/" target="_blank">
            <S.IconLinkedin />
        </a>

        <a href="https://dev.to/judaharagao" target="_blank">
            <S.IconDevTo />
        </a>

        <a href="https://www.instagram.com/dev.judah.aragao/" target="_blank">
            <S.IconInstagram />
        </a>
    </S.Container>
}

export default SocialNetworks