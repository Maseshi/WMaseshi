import Waves from '../../components/Waves/index'

import { translator } from '../../utils/functions/translator'

// Assets
import htmlLogo from '../../assets/icons/html-5.webp'
import cssLogo from '../../assets/icons/css-3.webp'
import jsLogo from '../../assets/icons/js.webp'
import bootstrapLogo from '../../assets/icons/bootstrap.svg'
import batchLogo from '../../assets/icons/batch.webp'
import gitLogo from '../../assets/icons/git.webp'
import javaLogo from '../../assets/icons/java.webp'
import jsonLogo from '../../assets/icons/json.webp'
import nodeJsLogo from '../../assets/icons/node-js.webp'
import reactJsLogo from '../../assets/icons/react-js.svg'
import visualBasicLogo from '../../assets/icons/visual-studio.webp'
import unityLogo from '../../assets/icons/unity.webp'
import cLogo from '../../assets/icons/c-program.svg'
import googleCloudLogo from '../../assets/icons/google-cloud-platform.svg'
import googleColaboratoryLogo from '../../assets/icons/google-colaboratory.svg'
import herokuLogo from '../../assets/icons/heroku.svg'
import jqueryLogo from '../../assets/icons/jquery.svg'
import jupyterNotebookLogo from '../../assets/icons/jupyter-notebook.svg'
import markdownLogo from '../../assets/icons/markdown.svg'
import npmLogo from '../../assets/icons/npm.svg'
import powershellLogo from '../../assets/icons/powershell.svg'
import pythonLogo from '../../assets/icons/python.svg'
import reactRouterLogo from '../../assets/icons/react-router.svg'
import replItLogo from '../../assets/icons/repl-it.svg'
import viteLogo from '../../assets/icons/vite.svg'
import wixLogo from '../../assets/icons/wix.svg'

export default function Skills() {
    const SkillIcons = ({ src, width, height, alt }) => {
        return (
            <div className="home-skills-icon">
                <img src={src} width={width} height={height} alt={alt} />
            </div>
        )
    }

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
                                            <SkillIcons src={htmlLogo} width="100px" height="100px" alt="HTML" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={cssLogo} width="100px" height="100px" alt="CSS" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={jsLogo} width="100px" height="100px" alt="JavaScript" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={bootstrapLogo} width="110px" height="100px" alt="Bootstrap" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={batchLogo} width="100px" height="100px" alt="Batch" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={gitLogo} width="100px" height="100px" alt="Git" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={javaLogo} width="100px" height="100px" alt="Java" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={jsonLogo} width="100px" height="100px" alt="Json" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={unityLogo} width="100px" height="100px" alt="Unity" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={cLogo} width="100px" height="100px" alt="C" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={googleCloudLogo} width="100px" height="100px" alt="Google Cloud Platform" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={googleColaboratoryLogo} width="100px" height="100px" alt="Google Colab" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={herokuLogo} width="100px" height="100px" alt="Heroku" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={jqueryLogo} width="100px" height="100px" alt="JQuery" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={jupyterNotebookLogo} width="100px" height="100px" alt="Jupyter Notebook" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={markdownLogo} width="100px" height="100px" alt="Markdown" />
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="10000">
                                    <div className="row row-cols-3 row-cols-md-4 g-4">
                                        <div className="col">
                                            <SkillIcons src={nodeJsLogo} width="100px" height="100px" alt="Node.js" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={reactJsLogo} width="100px" height="100px" alt="React.js" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={visualBasicLogo} width="100px" height="100px" alt="Visual Basic" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={npmLogo} width="100px" height="100px" alt="NPM" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={powershellLogo} width="100px" height="100px" alt="Powershell" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={pythonLogo} width="100px" height="100px" alt="Python" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={reactRouterLogo} width="100px" height="100px" alt="React Router" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={replItLogo} width="100px" height="100px" alt="Repl.it" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={viteLogo} width="100px" height="100px" alt="Vite" />
                                        </div>
                                        <div className="col">
                                            <SkillIcons src={wixLogo} width="100px" height="100px" alt="Wix" />
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
