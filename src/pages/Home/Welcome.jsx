import { Link } from 'react-router-dom'

import { translator } from '../../utils/functions/translator'

export default function Welcome() {
    return (
        <section className="home-welcome">
            <div className="home-welcome-greet">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 home-welcome-creator mb-3">
                            <div className="home-welcome-creator-image"></div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <small>
                                {translator().translate.pages.Home.Welcome.hello}
                            </small>
                            <h1>
                                {translator().translate.pages.Home.Welcome.i_am_maseshi}
                            </h1>
                            <p>
                                {translator().translate.pages.Home.Welcome.subject}
                            </p>
                            <div className="d-grid gap-2 d-md-block">
                                <Link className="home-btn btn btn-primary mx-1" to="/projects">
                                    {translator().translate.pages.Home.Welcome.explore_all_projects}
                                </Link>
                                <button className="home-btn btn btn-light mx-1" type="button" data-bs-toggle="modal" data-bs-target="#donateModal">
                                    {translator().translate.pages.Home.Welcome.support}
                                </button>
                            </div>
                            <span className="home-welcome-social-way">
                                <a className="btn btn-link" href="https://web.facebook.com/chaiwat.fb/" target="_blank" rel="noreferrer" aria-label="Facebook">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a className="btn btn-link" href="https://github.com/Maseshi" target="_blank" rel="noreferrer" aria-label="Github">
                                    <i className="bi bi-github"></i>
                                </a>
                                <a className="btn btn-link" href="https://www.instagram.com/chaiwat_itg/" target="_blank" rel="noreferrer" aria-label="Instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a className="btn btn-link" href="https://twitter.com/maseshi_twt" target="_blank" rel="noreferrer" aria-label="Twitter">
                                    <i className="bi bi-twitter"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
