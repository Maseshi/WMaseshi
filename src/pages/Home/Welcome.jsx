import { Link } from 'react-router-dom'

import { translator } from '../../utils/functions/translator'

export default function Welcome() {
    const SocialMedia = (props) => {
        return (
            <a className="btn btn-link" href={props.href} target="_blank" rel="noreferrer noopener" aria-label={props.label}>
                <i className={'bi bi-' + props.iconName}></i>
            </a>
        )
    }

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
                                <SocialMedia href="https://web.facebook.com/maseshi.fb/" label="Facebook" iconName="facebook" />
                                <SocialMedia href="https://github.com/Maseshi" label="Github" iconName="github" />
                                <SocialMedia href="https://www.instagram.com/chaiwat_itg/" label="Instagram" iconName="instagram" />
                                <SocialMedia href="https://twitter.com/maseshi_twt" label="Twitter" iconName="twitter" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
