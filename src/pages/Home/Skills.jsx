import Waves from '../../components/Waves/index'

import { translator } from '../../utils/functions/translator'

// Assets
import htmlLogo from '../../assets/icons/html-5.webp'
import cssLogo from '../../assets/icons/css-3.webp'
import jsLogo from '../../assets/icons/js.webp'
import bootstrapLogo from '../../assets/icons/bootstrap.webp'
import batchLogo from '../../assets/icons/batch.webp'
import gitLogo from '../../assets/icons/git.webp'
import javaLogo from '../../assets/icons/java.webp'
import jsonLogo from '../../assets/icons/json.webp'
import nodeJsLogo from '../../assets/icons/node-js.webp'
import reactJsLogo from '../../assets/icons/react-js.svg'
import visualBasicLogo from '../../assets/icons/visual-studio.webp'

export default function Skills() {
    return (
        <>
            <Waves position={'top'} r={240} g={240} b={250} />
            <section className="home-skills" id="skills">
                <div className="container">
                    <div className="home-skills-title">
                        <div className="container text-center">
                            <small>
                                {translator().translate.pages.Home.Skills.skills}
                            </small>
                            <h2>
                                <i className="bi bi-journal-code"></i> {translator().translate.pages.Home.Skills.ability}
                            </h2>
                            <p>
                                {translator().translate.pages.Home.Skills.ability_subject}
                            </p>
                        </div>
                    </div>
                    <br />
                    <div className="home-skills-content">
                        <div id="carouselSkillsControls" className="carousel carousel-dark slide py-5" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselSkillsControls" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselSkillsControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <div className="row row-cols-3 row-cols-md-4 g-4">
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={htmlLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={cssLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={jsLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={bootstrapLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={batchLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={gitLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={javaLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={jsonLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="10000">
                                    <div className="row row-cols-3 row-cols-md-4 g-4">
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={nodeJsLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={reactJsLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="home-skills-icon">
                                                <img src={visualBasicLogo} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselSkillsControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">
                                    {translator().translate.pages.Home.Skills.previous}
                                </span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselSkillsControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">
                                    {translator().translate.pages.Home.Skills.next}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Waves position={'bottom'} r={240} g={240} b={250} />
        </>
    )
}
