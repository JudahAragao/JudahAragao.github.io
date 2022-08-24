import styled from "styled-components";

import foto from '../../assets/img/foto.png'

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`

// ------------------ //
//   Lado Esquerdo    //
// ------------------ //

export const Im = styled.div`
    width: 100%;
    margin: 0 0 0 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    
`

export const GroupText = styled.div`
    p {
        font-size: 24px;
        font-weight: 500;
    }

    h3 {
        font-size: 36px;
        font-weight: bold;
        margin: 0 0 25px 0;
    }
`

export const GroupButtons = styled.div`
    width: 100%;
    display: flex;
`

// ------------------ //
//    Lado Direito    //
// ------------------ //

export const Photo = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 160px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MinhaImg = styled.img.attrs({
    src: `${foto}`
})`
    width: 424px;
    height: 439px;
`