import { isMobile } from "../../../utils/functions/isMobile"

export default function Detail(props) {
    const data = props.data

    const dateCreate = (established) => {
        if (!established) return

        const date = new Date(established * 1000)
        const day = date.getUTCDate()
        const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
        const month = months[date.getUTCMonth()]
        const year = date.getFullYear() + 543

        return day + " " + month + " " + year
    }

    const statusStyle = (status) => {
        let style = ""

        if (!status) return

        switch (status) {
            case 0:
                style = <span className="badge rounded-pill bg-primary">ทดสอบ</span>
                break;
            case 1:
                style = <span className="badge rounded-pill bg-secondary">ปิด</span>
                break;
            case 2:
                style = <span className="badge rounded-pill bg-success">ปกติ</span>
                break;
            case 3:
                style = <span className="badge rounded-pill bg-danger">ผิดพลาด</span>
                break;
            case 4:
                style = <span className="badge rounded-pill bg-warning">ปัญหา</span>
                break;
            case 5:
                style = <span className="badge rounded-pill bg-info">พัฒนา</span>
                break;
            case 6:
                style = <span className="badge rounded-pill bg-light">ไม่ทราบ</span>
                break;
            case 7:
                style = <span className="badge rounded-pill bg-dark">ไม่ระบุ</span>
                break;
            default:
                style = <span className="badge rounded-pill bg-light">ไม่รู้จัก</span>
        }

        return style
    }

    const externalLink = (link) => {
        let style = ''

        if (!link) return

        link.forEach((anchor) => {
            style += '<a class="projects-content-link" href="' + anchor + '">' +
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

        button.forEach((data) => {
            const color = data.color
            const disabled = data.disabled
            const link = data.link
            const name = data.name

            switch (color) {
                case 0:
                    style += '<a class="projects-content-button btn btn-primary mb-3 ' + disabled + '" href="' + link + '" target="_blank" rel="noreferrer">' + name + '</a>'
                    break;
                case 1:
                    style += '<a class="projects-content-button btn btn-secondary mb-3 ' + disabled + '" href="' + link + '" target="_blank" rel="noreferrer">' + name + '</a>'
                    break;
                case 2:
                    style += '<a class="projects-content-button btn btn-success mb-3 ' + disabled + '" href="' + link + '" target="_blank" rel="noreferrer">' + name + '</a>'
                    break;
                case 3:
                    style += '<a class="projects-content-button btn btn-danger mb-3 ' + disabled + '" href="' + link + '" target="_blank" rel="noreferrer">' + name + '</a>'
                    break;
                case 4:
                    style += '<a class="projects-content-button btn btn-warning mb-3 ' + disabled + '" href="' + link + '" target="_blank" rel="noreferrer">' + name + '</a>'
                    break;
                case 5:
                    style += '<a class="projects-content-button btn btn-info mb-3 ' + disabled + '" href="' + link + '" target="_blank" rel="noreferrer">' + name + '</a>'
                    break;
                case 6:
                    style += '<a class="projects-content-button btn btn-light mb-3 ' + disabled + '" href="' + link + '" target="_blank" rel="noreferrer">' + name + '</a>'
                    break;
                case 7:
                    style += '<a class="projects-content-button btn btn-dark mb-3 ' + disabled + '" href="' + link + '" target="_blank" rel="noreferrer">' + name + '</a>'
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
                    <img className="projects-content-icon" src={data.icon} width="100px" height="100px" alt={data.id} />
                </div>
                <div className="col-md-8" align="left">
                    <h3 className="projects-content-name">{data.title}</h3>
                    {
                        isMobile() ? (
                            <>
                                <p align="center">{data.type}</p>
                                <span>สร้างเมื่อ: {dateCreate(data.established)}</span>
                                <p>สถานะ: {statusStyle(data.status)}</p>
                            </>
                        ) : (
                            <p>
                                <span>{data.type} • </span>
                                <span>สร้างเมื่อ: {dateCreate(data.established)} • </span>
                                <span>สถานะ: {statusStyle(data.status)}</span>
                            </p>
                        )
                    }
                    <p>{data.description}</p>
                    {externalLink(data.link)}
                    {tagCreator(data.tag)}
                </div>
                <div className="col-md-2" style={{ alignSelf: 'center' }} dangerouslySetInnerHTML={{ __html: buttonCreate(data.button) }} align="center"></div>
            </div >
        </div >
    )
}
