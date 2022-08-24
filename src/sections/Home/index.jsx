import React from "react";
import Button from "../../components/Button";

import * as S from './styles'

const Home = () => {
    return <S.Container>
        <S.Im>
            <S.GroupText>
                <p>Oi! Eu sou <span className="destaque">Judah Aragão</span> </p>
                <h3>Desenvolvedor <span className="destaque">Full Stack</span></h3>
            </S.GroupText>

            <S.GroupButtons>
                <Button borderBtn={true}>
                    <p>Contate Me</p>
                </Button>
                <div style={{'marginRight':'20px'}}></div>
                <Button borderBtn={false}>
                    <p>CV completo</p>
                </Button>
            </S.GroupButtons>
        </S.Im>

        <S.Photo>
            <S.MinhaImg />
        </S.Photo>
    </S.Container>
}

export default Home