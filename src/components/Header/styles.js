import styled from "styled-components";

import logo from '../../assets/img/galaxy-logo.png'

export const Container = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
`
export const Logo = styled.img.attrs({
    src: `${logo}`
})`
    margin: 0 0 0 80px;
    width: 87px;
    height: 40px;
`