import styled from "styled-components";

export const Container = styled.div`
    width: 670px;
    height: 100vh;
    background: ${props => 
        props.openMenu === false
        ? 'rgba(31, 35, 39, 0.5)'
        : 'rgb(31, 35, 39)'
    };
    backdrop-filter: ${props => 
        props.openMenu === false
        ? 'blur(10px)'
        : 'blur(0px)'
    };
    display: flex;
    align-items: center;
    position: fixed;
    left: 100%;
    transform: ${props =>
        props.openMenu === false 
            ? 'translateX(-89%) skewX(-12deg)' 
            : 'translateX(-26%) skewX(-5deg)'};
    transition: .3s;

    ul {
        list-style: none;
        margin: 0 0 0 15px;
    }

    ul a {
        font-size: 24px;
        text-decoration: none;
    }

    a, li {
        color: #E8BF55;
        display: ${props => 
        props.openMenu === false
            ? 'block'
            : 'none'
        };
        transform: ${props =>
        props.openMenu === false 
            ? 'skewX(6.5deg)' 
            : 'skewX(5deg)'
        };
        margin: 50px 0 50px 0;
    }
`