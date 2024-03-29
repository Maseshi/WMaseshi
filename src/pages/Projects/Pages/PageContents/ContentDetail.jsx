import { isMobile } from "../../../../utils/functions/isMobile"
import { translator } from "../../../../utils/functions/translator"

export default function ContentDetail({ data }) {
    const dateCreate = (established) => {
        if (!established) return translator().translate.pages.Projects.Pages.PageContents.ContentDetail.unknown

        const date = new Date((established.seconds || established) * 1000)
        const day = date.getDate()
        const months = [
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.january,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.february,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.march,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.april,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.may,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.june,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.july,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.august,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.september,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.october,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.november,
            translator().translate.pages.Projects.Pages.PageContents.ContentDetail.december
        ]
        const month = months[date.getMonth()]
        const year = date.getFullYear() + 543

        return day + " " + month + " " + year
    }
    const statusStyle = (status) => {
        let style = ""

        switch (status) {
            case 0:
                style = <span className="badge rounded-pill bg-primary">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.test}
                </span>
                break;
            case 1:
                style = <span className="badge rounded-pill bg-secondary">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.closed}
                </span>
                break;
            case 2:
                style = <span className="badge rounded-pill bg-success">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.normal}
                </span>
                break;
            case 3:
                style = <span className="badge rounded-pill bg-danger">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.error}
                </span>
                break;
            case 4:
                style = <span className="badge rounded-pill bg-warning">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.problem}
                </span>
                break;
            case 5:
                style = <span className="badge rounded-pill bg-info">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.development}
                </span>
                break;
            case 6:
                style = <span className="badge rounded-pill bg-light">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.unknown}
                </span>
                break;
            case 7:
                style = <span className="badge rounded-pill bg-dark">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.unspecified}
                </span>
                break;
            default:
                style = <span className="badge rounded-pill bg-light">
                    {translator().translate.pages.Projects.Pages.PageContents.ContentDetail.unknown}
                </span>
        }

        return style
    }
    const externalLink = (link) => {
        let style = ''

        if (!link) return

        link.forEach((anchor) => {
            style += '<a class="projects-content-link" href="' + anchor + '" target="_blank" rel="noreferrer noopener">' +
                '<i class="bi bi-link-45deg"></i> ' + anchor +
                '</a>'
        })

        return <p dangerouslySetInnerHTML={{ __html: style }}></p>
    }
    const tagCreator = (tags) => {
        let style = ''

        if (!tags) return

        tags.forEach((text) => {
            style += '<span class="badge rounded-pill bg-primary">' + text + '</span> '
        })

        return <p dangerouslySetInnerHTML={{ __html: style }}></p>
    }
    const buttonCreate = (button) => {
        let style = ""

        if (!button) return

        button.forEach((info) => {
            const color = info.color
            const disabled = info.disabled
            const link = info.link
            const name = info.name

            if (!link && !name) return style = ''
            if (link && !name) return style = ''

            switch (color) {
                case 0:
                    style += '<a class="btn btn-primary mb-3 ' + (disabled ? "disabled" : "") + '" href="' + link + '" target="_blank" rel="noreferrer noopener" role="button" aria-disabled="' + disabled + '">' + name + '</a>'
                    break;
                case 1:
                    style += '<a class="btn btn-secondary mb-3 ' + (disabled ? "disabled" : "") + '" href="' + link + '" target="_blank" rel="noreferrer noopener" role="button" aria-disabled="' + disabled + '">' + name + '</a>'
                    break;
                case 2:
                    style += '<a class="btn btn-success mb-3 ' + (disabled ? "disabled" : "") + '" href="' + link + '" target="_blank" rel="noreferrer noopener" role="button" aria-disabled="' + disabled + '">' + name + '</a>'
                    break;
                case 3:
                    style += '<a class="btn btn-danger mb-3 ' + (disabled ? "disabled" : "") + '" href="' + link + '" target="_blank" rel="noreferrer noopener" role="button" aria-disabled="' + disabled + '">' + name + '</a>'
                    break;
                case 4:
                    style += '<a class="btn btn-warning mb-3 ' + (disabled ? "disabled" : "") + '" href="' + link + '" target="_blank" rel="noreferrer noopener" role="button" aria-disabled="' + disabled + '">' + name + '</a>'
                    break;
                case 5:
                    style += '<a class="btn btn-info mb-3 ' + (disabled ? "disabled" : "") + '" href="' + link + '" target="_blank" rel="noreferrer noopener" role="button" aria-disabled="' + disabled + '">' + name + '</a>'
                    break;
                case 6:
                    style += '<a class="btn btn-light mb-3 ' + (disabled ? "disabled" : "") + '" href="' + link + '" target="_blank" rel="noreferrer noopener" role="button" aria-disabled="' + disabled + '">' + name + '</a>'
                    break;
                case 7:
                    style += '<a class="btn btn-dark mb-3 ' + (disabled ? "disabled" : "") + '" href="' + link + '" target="_blank" rel="noreferrer noopener" role="button" aria-disabled="' + disabled + '">' + name + '</a>'
                    break;
                default:
                    style += ''
            }
        })

        return style
    }

    return (
        <div className="projects-content-detail">
            <div className="row">
                <div className="col-md-2" align="center">
                    {
                        data.icon ? (
                            <img className="projects-content-icon" src={data.icon} width="100px" height="100px" alt={data.id} />
                        ) : (
                            <div className="projects-content-no-icon">
                                <span className="bi bi-archive"></span>
                            </div>
                        )
                    }
                </div>
                <div className="col-md-8" align="left">
                    <h3 className="projects-content-name">
                        {data.title}
                    </h3>
                    {
                        isMobile() ? (
                            <>
                                <p align="center">{data.type}</p>
                                <span>{translator().translate.pages.Projects.Pages.PageContents.ContentDetail.create_at}: {dateCreate(data.established)}</span>
                                <p>{translator().translate.pages.Projects.Pages.PageContents.ContentDetail.status}: {statusStyle(data.status)}</p>
                            </>
                        ) : (
                            <p>
                                <span>{data.type} • </span>
                                <span>{translator().translate.pages.Projects.Pages.PageContents.ContentDetail.create_at}: {dateCreate(data.established)} • </span>
                                <span>{translator().translate.pages.Projects.Pages.PageContents.ContentDetail.status}: {statusStyle(data.status)}</span>
                            </p>
                        )
                    }
                    <p>{data.description}</p>
                    {externalLink(data.link)}
                    {tagCreator(data.tag)}
                </div>
                <div className="col-md-2" style={{ alignSelf: 'center' }} dangerouslySetInnerHTML={{ __html: buttonCreate(data.button) }} align="center"></div>
            </div>
        </div>
    )
}
