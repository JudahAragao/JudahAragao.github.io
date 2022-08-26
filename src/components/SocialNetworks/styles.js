import styled from "styled-components";

import { FaInstagram } from 'react-icons/fa'
import { FaDev } from 'react-icons/fa'
import { FiLinkedin } from 'react-icons/fi'
import { FiGithub } from 'react-icons/fi'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 100%;
    transform: translate(-140%, -50%);
    z-index: 2;

    a {
        font-size: 25px;
        margin: 10px;
    }

    svg {
        color: #E8BF55;
    }

    svg:hover {
        color: #FFB800;
    }
`

export const IconInstagram = styled(FaInstagram)`

`

export const IconDevTo = styled(FaDev)`

`

export const IconLinkedin = styled(FiLinkedin)`

`

export const IconGitHub = styled(FiGithub)`

`