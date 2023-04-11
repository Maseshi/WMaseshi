import { translator } from '../../../../../utils/functions/translator'

export default function NewsEditor({ onSubmit, onCancel, userData }) {
    const handleDateCreate = (event) => {
        event.target.classList.remove('is-invalid')
    }
    const handleTextareaCreate = (event) => {
        if (event.target.value.length > event.target.minLength) event.target.classList.remove('is-invalid')
    }

    return (
        <form className="projects-news-detail card mt-3 mb-3">
            <div className="row">
                <div className="col-md-3" align="center">
                    <img className="projects-news-author-avatar" src={userData.auth.photoURL} width="80px" height="80px" alt="" />
                    <br />
                    <h3 className="projects-news-author-title">{userData.auth.displayName}</h3>
                    <span className="badge rounded-pill bg-primary">{userData.user.role.toUpperCase()}</span>
                </div>
                <div className="col-md-9" align="left">
                    <div className="card-body">
                        <div className="projects-news-create">
                            <label htmlFor="NewsCreateTextarea" className="form-label">
                                {translator().translate.pages.Projects.Pages.PageEditor.NewsEditor.post_at}:
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="create-at"
                                aria-describedby="NewsCreateTextarea"
                                id="NewsCreateTextarea"
                                required
                                onKeyUp={(event) => handleDateCreate(event)}
                            />
                            <div id="NewsCreateTextarea" className="invalid-feedback">
                                {translator().translate.pages.Projects.Pages.PageEditor.NewsEditor.date_is_invalid}
                            </div>
                        </div>
                        <br />
                        <div className="projects-news-message">
                            <label htmlFor="NewsMessageTextarea" className="form-label">
                                {translator().translate.pages.Projects.Pages.PageEditor.NewsEditor.content_of_news}:
                            </label>
                            <textarea
                                className="form-control"
                                aria-describedby="NewsMessageTextarea"
                                rows="5"
                                minLength="10"
                                maxLength="5000"
                                id="NewsMessageTextarea"
                                required
                                onKeyUp={(event) => handleTextareaCreate(event)}
                            ></textarea>
                            <small id="passwordHelpInline" className="text-muted">
                                {translator().translate.pages.Projects.Pages.PageEditor.NewsEditor.content_support_markdown} <a href="https://www.markdownguide.org/" target="_blank" rel="noreferrer noopener">https://www.markdownguide.org/</a>
                            </small>
                            <div id="NewsMessageTextarea" className="invalid-feedback">
                                {translator().translate.pages.Projects.Pages.PageEditor.NewsEditor.need_more_content}
                            </div>
                        </div>
                        <br />
                        <div className="projects-news-action d-grid gap-2 d-md-flex justify-content-md-center">
                            <button className="btn btn-primary me-md-2" onClick={(event) => onSubmit(event)} type="button">
                                {translator().translate.pages.Projects.Pages.PageEditor.NewsEditor.save}
                            </button>
                            <button className="btn btn-secondary" onClick={(event) => onCancel(event)} type="button" id="NewsCancel">
                                {translator().translate.pages.Projects.Pages.PageEditor.NewsEditor.cancel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
