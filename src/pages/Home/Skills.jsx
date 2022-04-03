import Waves from '../../components/Waves/index'

export default function Skills() {
    return (
        <>
            <Waves position={'top'} r={240} g={240} b={250} />
            <section className="home-skills" id="skills">
                <div className="container">
                    <div className="home-skills-title">
                        <div className="container text-center">
                            <small>สกิล</small>
                            <h2><i className="bi bi-journal-code"></i> ความสามารถ</h2>
                            <p>ความสามารถในส่วนของในด้านการพัฒนา การเขียนโค้ด เครื่องมือและภาษา</p>
                        </div>
                    </div>
                    <br />
                    <div className="home-skills-content">
                        <div className="carousel py-5 carousel-dark slide" data-bs-ride="carousel" data-bs-touch="false" data-bs-interval="false" id="carouselExampleControls">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="row justify-content-center">
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/html-5.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/css-3.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/js.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/bootstrap.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row justify-content-center">
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/batch.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/git.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/java.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/json.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="row justify-content-center">
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/node-js.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/react-js.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="home-skills-icon">
                                                <img src={require('../../assets/icons/visual-studio.webp')} width="100px" height="100px" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Waves position={'bottom'} r={240} g={240} b={250} />
        </>
    )
}
