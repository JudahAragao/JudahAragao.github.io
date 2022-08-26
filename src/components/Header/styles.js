import styled from "styled-components";
import { BsThreeDotsVertical } from 'react-icons/bs'

import logo from '../../assets/img/galaxy-logo.png'

export const Container = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    z-index: 2;
`

export const BodyLeft = styled.div`
    width: 100%;
    display: flex;
`

export const Logo = styled.img.attrs({
    src: `${logo}`
})`
    margin: 0 0 0 80px;
    width: 87px;
    height: 40px;
`

export const BodyRight = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 0 80px 0 0;
`

export const BtnMenu = styled(BsThreeDotsVertical)`
    font-size: 26px;
    color: #E8BF55;
    transform: ${props => props.openmenu === false ? 'rotate(0deg)' : 'rotate(90deg)'};
    transition: .2s;
    position: fixed;
    top: 22px;
`