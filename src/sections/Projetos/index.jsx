import React, { useState } from "react";

import * as S from './styles'

import { projects } from "../../data/projects";

const Projetos = () => {

    const [currentCategory, setCurrentCategory] = useState("Front-End")
    const [openCategory, setOpenCategory] = useState(1)

    return <S.Container id="projetos">
        <S.FilterProjects opencategory={openCategory}>
            <ul>
                <li onClick={() => {
                    setCurrentCategory('Front-End')
                    setOpenCategory(1)
                }}>
                    <p>Front-End</p>
                </li>
                <li onClick={() => {
                    setCurrentCategory('Back-End')
                    setOpenCategory(2)
                }}>
                    <p>Back-End</p>
                </li>
                <li onClick={() => {
                    setCurrentCategory('Mobile')
                    setOpenCategory(3)
                }}>
                    <p>Modile</p>
                </li>
                <li onClick={() => {
                    setCurrentCategory('Full-Stack')
                    setOpenCategory(4)
                }}>
                    <p>Full-Stack</p>
                </li>
                <li onClick={() => {
                    setCurrentCategory('Design UI/UX')
                    setOpenCategory(5)
                }}>
                    <p>Design UI/UX</p>
                </li>
            </ul>
        </S.FilterProjects>

        <S.ContentProject>
            {
                projects?.map((project, index) => {

                    if (project.urlThumb === '' && project.linkToProject === '') {
                        if (project.category === currentCategory) {
                            return <S.ProjectItem key={index} style={{'flexDirection':'column'}}>
                            <h3>{project.title}</h3>
                            <p>Em Breve</p>
                        </S.ProjectItem>
                        }
                    } else {
                        if (project.category === currentCategory) {
                            return <S.ProjectItem key={index}>
                                <h3>{project.title}</h3>
                            </S.ProjectItem>
                        }
                    }

                    
                })
            }
        </S.ContentProject>
    </S.Container>
}

export default Projetos