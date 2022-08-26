import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FilterProjects = styled.div`
    width: 900px;
    height: 50px;
    margin: 25px 100px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    
    ul {
        display: flex;
        list-style: none;
    }

    li {
        margin: 0 20px 0 20px;
        cursor: pointer;
    }

    ul li:nth-child(${props => props.opencategory}) p {
        color: #FFB800;
        text-decoration: 2px underline;
        text-decoration-color: #FFB800;
    }

    ul li p {
        color: #E8BF55;
    }
`

export const ContentProject = styled.div`
    width: 900px;
    height: 500px;
    margin: 0 100px 25px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

export const ProjectItem = styled.div`
    width: 290px;
    height: 350px;
    margin: 10px auto;
    border-radius: 15px 0 15px 0;
    background-color: #26292F;
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
        font-size: 30px;
        margin: 0 20px;
    }
`