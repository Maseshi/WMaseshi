import { translator } from '../../../utils/functions/translator'

export default function PageWelcome() {
    return (
        <>
            <div className="projects-welcome-title" align="center">
                <small>
                    <strong>
                        {translator().translate.pages.Projects.Pages.PageWelcome.all_projects}
                    </strong>
                </small>
                <h1>
                    {translator().translate.pages.Projects.Pages.PageWelcome.welcome}
                </h1>
            </div>
            <div className="projects-welcome-info">
                <p>
                    {translator().translate.pages.Projects.Pages.PageWelcome.subject_section_one}
                    <br />
                    {translator().translate.pages.Projects.Pages.PageWelcome.subject_section_two}
                </p>
                <h5>
                    {translator().translate.pages.Projects.Pages.PageWelcome.useful_link}
                </h5>
                <ul>
                    <li>
                        <span>Github: <a href="https://github.com/Maseshi" target="_blank" rel="noreferrer noopener">https://github.com/Maseshi</a></span>
                    </li>
                    <li>
                        <span>Translate: <a href="https://translate.google.com" target="_blank" rel="noreferrer noopener">https://translate.google.com</a></span>
                    </li>
                </ul>
                <h5>
                    {translator().translate.pages.Projects.Pages.PageWelcome.support_languages}
                </h5>
                <div className="projects-welcome-languages">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="card active">
                                <div className="card-body">
                                    ภาษาไทย
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card disabled">
                                <div className="card-body disabled">
                                    English (Coming Soon)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
