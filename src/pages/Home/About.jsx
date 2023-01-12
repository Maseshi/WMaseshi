import Waves from '../../components/Waves/index'

import { translator } from '../../utils/functions/translator'

import AboutHeader from '../../assets/images/about-header.webp'

export default function About() {
    const getAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        const month = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();
        
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    }

    return (
        <>
            <Waves class={'home-wave'} r={255} g={255} b={255} />
            <section className="home-about" id="about">
                <div className="container">
                    <div className="home-about-title">
                        <div className="container text-center">
                            <small>
                                {translator().translate.pages.Home.About.introduce_yourself}
                            </small>
                            <h2>
                                <i className="bi bi-card-heading"></i> {translator().translate.pages.Home.About.about_me}
                            </h2>
                            <p>
                                {translator().translate.pages.Home.About.about_me_subject}
                            </p>
                        </div>
                    </div>
                    <br />
                    <div className="home-about-content">
                        <div className="row">
                            <div className="col-md-6 mb-3 text-center">
                                <img className="home-about-image" src={AboutHeader} width="400px" height="100%" alt="" />
                            </div>
                            <div className="col-md-6 home-about-content">
                                <h2>
                                    {translator().translate.pages.Home.About.personal}
                                </h2>
                                <p>
                                    {translator().translate.pages.Home.About.personal_subject}
                                </p>
                                <br />
                                <div className="row">
                                    <p className="col text-center">
                                        {translator().translate.pages.Home.About.nickname}
                                    </p>
                                    <p className="col text-center">
                                        {translator().translate.pages.Home.About.nickname_name}
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="col text-center">
                                        {translator().translate.pages.Home.About.alias}
                                    </p>
                                    <p className="col text-center">
                                        {translator().translate.pages.Home.About.alias_name}
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="col text-center">
                                        {translator().translate.pages.Home.About.birthday}
                                    </p>
                                    <p className="col text-center">
                                        {translator().translate.pages.Home.About.birthday_at} ({ getAge("2005/01/12") } {translator().translate.pages.Home.About.years_old})
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="col text-center">
                                        {translator().translate.pages.Home.About.hobby}
                                    </p>
                                    <p className="col text-center">
                                        {translator().translate.pages.Home.About.write_a_program}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <h2>
                                    {translator().translate.pages.Home.About.why}
                                </h2>
                                <p>
                                    {translator().translate.pages.Home.About.why_description}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <h2>
                                    {translator().translate.pages.Home.About.difficult}
                                </h2>
                                <p>
                                    {translator().translate.pages.Home.About.difficult_description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
