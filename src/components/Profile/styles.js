import styled from "styled-components";

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

// Component Profile

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const Line = styled.div`
    width: 5px;
    margin: 0 100px 20px 0;
    background-color: #E8BF55;
`

// Global Style

export const FieldProfile = styled.div`
    width: 100%;
    margin: 0 0 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HeaderProfile = styled.div`
    width: 915px;
    height: 30px;
    background-color: #E8BF55;
    box-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    
    h3, p {
        color: #191D20;
    }

    .margin {
        margin: 0 400px 0 400px;
    }
`

export const BodyProfile = styled.div`
    width: 915px;
    background-color: #26292F;
    box-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 0 0 20px 0;
`

export const YearField = styled.div`
    height: 20px;
    padding: 0 22px 0 22px;
    margin: 10px;
    background-color: #E8BF55;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        color: #191D20;
        font-size: 13px;
        font-weight: 700;
    }
`

export const TopicTrace = styled.div`
    width: 4px;
    background: #E8BF55;
    border-radius: 3px 0px;
    padding: 10px 0 10px 0;
    margin: 0 10px 0 0;
`

export const TextField = styled.div`
    margin: 0 0 0 10px;

    p {
        margin: 10px 0 0 0;
    }
`

export const TitleField = styled.div`
    flex: 1;
    display: flex;
    margin: 10px 10px 10px 0;
`

export const GeneralField = styled.div`
    width: ${props => props.width};
`

export const ProfileItem = styled.div`
    flex: 1;
    display: flex;
    margin: 10px 10px 10px;

    h3 {
        font-weight: 500;
    }
`

export const TimeEObs = styled.div`
    display: flex;
    align-items: center;
`

// Component Skills

export const ContentProfile = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`

export const BtnPrevSlide = styled(BiChevronLeft)`
    color: #191D20;
    font-size: 25px;
    cursor: pointer;
`

export const BtnNextSlide = styled(BiChevronRight)`
    color: #191D20;
    font-size: 25px;
    cursor: pointer;
`

// Component WorkExperience


export const Assignments = styled.div`
    width: 100%;

    p {
        margin: 0 0 0 10px;
    }
`