import styled from "styled-components";

export const Container = styled.button`
    width: 140px;
    height: 40px;
    background-color: ${props => props.borderBtn === true ? '#191D20' : '#E8BF55'};
    border: 2px solid #E8BF55;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.borderBtn === true ? '#282f34' : '#ebc76b'};
    }

    p {
        font-size: 18px;
        font-weight: 600;
        color: ${props => props.borderBtn === false ? '#191D20' : '#E8BF55'};
    }
`