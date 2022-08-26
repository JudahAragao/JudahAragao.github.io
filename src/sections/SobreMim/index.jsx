import React from "react";
import Button from "../../components/Button";

import * as S from './styles'

const SobreMim = () => {
    return <S.Container id="sobre-mim">
        <S.BodyLeft>
            <S.MyPhotoField>

            </S.MyPhotoField>
        </S.BodyLeft>
        <S.BodyRight>
            <S.TextAboutMefield>
                <h3>Oi! Meu nome é <span className="destaque">Judah Ben-Hur Freire de Aragão.</span></h3><br />
                <p>Sou um entusiasta de tecnologia voltada para a área de <span className="destaque">análise e desenvolvimento de sistemas</span> e <span className="destaque">design UI/UX</span>.</p><br />
                <p>Meu contato inicial com a área foi através da linguagem <span className="destaque">HTML</span> e <span className="destaque">CSS</span> aos meus <span className="destaque">10 anos de idade</span>,
                    porém eu amadureci esse interesse quando entrei no <span className="destaque">Instituto Federal de Sergipe em 2019 </span>
                    onde atualmente estudo no <span className="destaque">5° período</span> do curso de graduação de <span className="destaque"> Tecnologia em Análise e Desenvolvimento de Sistemas.</span></p><br />
                <p>Atualmente estou realizando meu trabalho de conclusão de curso e em breve estarei publicando aqui os detalhes.</p>
            </S.TextAboutMefield>
            <br /><br />
            <S.GroupButtons>
                <Button borderBtn={true}>
                    <p>Contate Me</p>
                </Button>
                <div style={{ 'marginRight': '20px' }}></div>
                <Button borderBtn={false}>
                    <p>CV completo</p>
                </Button>
            </S.GroupButtons>
        </S.BodyRight>
    </S.Container>
}

export default SobreMim