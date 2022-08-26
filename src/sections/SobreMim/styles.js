import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`

export const BodyLeft = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
`

export const MyPhotoField = styled.div`
    width: 450px;
    height: 550px;
    margin: 0 0 0 120px;
    background-color: #26292F;
    border-radius: 30px 0 30px 0;
    box-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.25);
`

export const BodyRight = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const TextAboutMefield = styled.div`
    width: 460px;
    text-align: justify;

    h3 {
        font-size: 24px;
    }

    p {
        font-size: 18px;
    }
`

export const GroupButtons = styled.div`
    width: 100%;
    display: flex;
`