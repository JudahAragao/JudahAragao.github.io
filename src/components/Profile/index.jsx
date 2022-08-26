import React, { useRef } from "react";

import * as S from './styles'

const Skills = ({ profile }) => {

    const slideRef = useRef(null)

    const handleScroll = () => {
        if (slideRef.current.scrollLeft > 0) {
            slideRef.current.scrollLeft -= slideRef.current.offsetWidth
        } else if (slideRef.current.scrollLeft === 0) {
            slideRef.current.scrollLeft += slideRef.current.offsetWidth
        }
    };

    return <S.FieldProfile>
        <S.HeaderProfile>
            <S.BtnPrevSlide onClick={handleScroll}/>

            <h3 className="margin">{profile.header}</h3>

           <S.BtnNextSlide onClick={handleScroll}/>
        </S.HeaderProfile>
        <S.BodyProfile>
            <S.ContentProfile 
                style={{ 'flexWrap': 'nowrap', 'overflowX': 'hidden' }} 
                ref={slideRef}
            >
                {
                    profile.body?.map((skill, index) => (
                        <S.GeneralField key={index}>
                            <S.YearField>
                                <p><nobr>{skill.time}</nobr></p>
                            </S.YearField>
                            <S.ProfileItem>
                                <S.TopicTrace></S.TopicTrace>
                                <h3> <nobr>{skill.title}</nobr> </h3>
                            </S.ProfileItem>
                        </S.GeneralField>
                    ))
                }
            </S.ContentProfile>
        </S.BodyProfile>
    </S.FieldProfile>
}

const WorkExperience = ({ profile }) => {
    return <S.FieldProfile>
        <S.HeaderProfile>
            <h3>{profile.header}</h3>
        </S.HeaderProfile>
        <S.BodyProfile>
            <S.ContentProfile>
                {
                    profile.body?.map((wE, index) => (
                        <S.GeneralField key={index}>
                            <S.TimeEObs>
                                <S.YearField>
                                    <p><nobr>{wE.time}</nobr></p>
                                </S.YearField>
                                <p><span className="destaque">-</span> {wE.obs}</p>
                            </S.TimeEObs>
                            <S.ProfileItem>
                                <S.TextField>
                                    <S.TitleField>
                                        <S.TopicTrace></S.TopicTrace>
                                        <h3>{wE.title}</h3>
                                    </S.TitleField>
                                    <p>{wE.subtitle}</p>
                                    <S.Assignments>
                                        {
                                            wE.attrs?.map((assignment, index) => (
                                                <p key={index}><span className="destaque"><strong>-</strong></span> {assignment}</p>
                                            ))
                                        }
                                    </S.Assignments>
                                </S.TextField>
                            </S.ProfileItem>
                        </S.GeneralField>
                    ))
                }
            </S.ContentProfile>
        </S.BodyProfile>
    </S.FieldProfile>
}

const AcademicBackground = ({ profile }) => {
    return <S.FieldProfile>
        <S.HeaderProfile>
            <h3>{profile.header}</h3>
        </S.HeaderProfile>
        <S.BodyProfile>
            <S.ContentProfile>
                {
                    profile.body?.map((aB, index) => (
                        <S.GeneralField key={index}>
                            <S.TimeEObs>
                                <S.YearField>
                                    <p><nobr>{aB.time}</nobr></p>
                                </S.YearField>
                                <p><span className="destaque">-</span> {aB.obs}</p>
                            </S.TimeEObs>
                            <S.ProfileItem>
                                <S.TopicTrace></S.TopicTrace>
                                <div>
                                    <h3>{aB.title}</h3>
                                    <p>{aB.subtitle}</p>
                                </div>
                            </S.ProfileItem>
                        </S.GeneralField>
                    ))
                }
            </S.ContentProfile>
        </S.BodyProfile>
    </S.FieldProfile>
}

// const Courses = ({ profile }) => {
//     return <S.FieldProfile>
//         <S.HeaderProfile>
//             <h3>{profile.header}</h3>
//         </S.HeaderProfile>
//         <S.BodyProfile>
//             <S.ContentProfile>
//                 {
//                     profile.body?.map(course => (
//                         <S.GeneralField width={'50%'}>
//                             <S.TimeEObs>
//                                 <S.YearField>
//                                     <p><nobr>{course.time}</nobr> <strong>-</strong> {course.obs}</p>
//                                 </S.YearField>
//                             </S.TimeEObs>
//                             <S.ProfileItem>
//                                 <S.TopicTrace></S.TopicTrace>
//                                 <div>
//                                     <h3>{course.title}</h3>
//                                     <div style={{ 'display': 'flex', 'alignItems': 'center' }}>
//                                         <p>{course.subtitle}</p>
//                                     </div>
//                                 </div>
//                             </S.ProfileItem>
//                         </S.GeneralField>
//                     ))
//                 }
//             </S.ContentProfile>
//         </S.BodyProfile>
//     </S.FieldProfile>
// }

const Profile = ({ profileData }) => {
    return <S.Container>
        <S.Line>
            {
                profileData?.map((profile, index) => {
                    if (profile.header === 'Skills') {
                        return <Skills profile={profile} key={index} />
                    } else if (profile.header === 'Experiência Profissional') {
                        return <WorkExperience profile={profile} key={index} />
                    } else if (profile.header === 'Formação') {
                        return <AcademicBackground profile={profile} key={index} />
                    }
                    // else if (profile.header === 'Cursos e Certificações') {
                    //     return <Courses profile={profile} key={index} />
                    // }
                })
            }
        </S.Line>
    </S.Container>
}

export default Profile