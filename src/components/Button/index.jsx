import React from "react";

import * as S from './styles'

const Button = ({borderBtn, children}) => {
    console.log(borderBtn)
    return <S.Container borderBtn={borderBtn}>
        {children}
    </S.Container>
}

export default Button