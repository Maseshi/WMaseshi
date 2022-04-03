import { useState } from "react"

export default function Navbar(props) {
    const [query, setQuery] = useState()
    const [active, setActive] = useState(false)

    const dataProps = props.data
    const loadedProps = props.loaded
    const parameterProps = props.parameter

    return (
        <>
            <nav className="projects-navbar navbar navbar-expand-lg">
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasProjectsNavbar" aria-labelledby="offcanvasProjectsNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">ตัวเลือก</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="projects-offcanvas-navbar">
                            <div className="projects-beta-content">
                                <span>อยู่ในช่วงทดสอบ</span>
                            </div>
                            <br />
                            <div className="projects-search-box form-floating mb-3">
                                <input type="text" className="form-control" id="inputSearchProjects" onChange={event => setQuery(event.target.value)} placeholder="ค้นหาโครงการ" disabled={loadedProps ? dataProps ? false : true : true} />
                                <label htmlFor="inputSearchProjects"><i className="bi bi-search"></i> ค้นหาโครงการ</label>
                            </div>
                            <div className="projects-list">
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <div className="projects-list-title mb-3">
                                        <div className="d-flex flex-row">
                                            <button className="projects-list-title-home" onClick={
                                                () => {
                                                    if (!active) {
                                                        document.title = 'โครงการ | Maseshi'

                                                        const url = new URL(window.location)

                                                        url.searchParams.delete('project')
                                                        url.searchParams.delete('tab')
                                                        window.history.pushState({}, '', url)

                                                        setActive(true)
                                                    }
                                                }
                                            } id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="false">
                                                <i className="bi bi-house"></i>
                                            </button>
                                            <h5 className="projects-list-title-name flex-fill align-self-center ms-2 mb-0">โครงการ</h5>
                                            <div className="projects-list-title-badge align-self-center">
                                                <span className="badge rounded-pill bg-primary">
                                                    {
                                                        dataProps ? (
                                                            loadedProps ? dataProps.length : (
                                                                <div className="spinner-border spinner-border-sm" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            )
                                                        ) : 0
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        dataProps ? (
                                            loadedProps ? (
                                                dataProps
                                                    .sort((a, b) => a.title.localeCompare(b.title))
                                                    .filter(data => query ? query === '' ? data : data.title.toLowerCase().includes(query.toLowerCase()) ? data : null : data)
                                                    .map((data, index) => {
                                                        return (
                                                            <button className={parameterProps.project === data.id ? "projects-list-data card nav-link mb-3 active" : "projects-list-data card nav-link mb-3"} onClick={
                                                                () => {
                                                                    document.title = data.title + ' - โครงการ | Maseshi'

                                                                    const url = new URL(window.location)
                                                                    const homeButton = document.getElementById('v-pills-home-tab')

                                                                    url.searchParams.set('project', data.id)
                                                                    window.history.pushState({}, '', url)
                                                                    
                                                                    if (homeButton.classList.contains('active')) {
                                                                        homeButton.classList.remove('active')
                                                                        homeButton.setAttribute('aria-selected', 'false')

                                                                        setActive(false)
                                                                    }
                                                                }
                                                            } id={"v-pills-" + data.id + "-tab"} data-bs-toggle="pill" data-bs-target={"#v-pills-" + data.id} type="button" role="tab" aria-controls={"v-pills-" + data.id} aria-selected={parameterProps.project === data.id ? "true" : "false"} key={index}>
                                                                <div className="card-body">
                                                                    <img className="projects-list-icon" src={data.icon} width="30px" height="30px" alt={data.id} /> {data.title}
                                                                </div>
                                                            </button>
                                                        )
                                                    })
                                            ) : (
                                                <>
                                                    <div className="projects-list-loading card nav-link mb-3" aria-hidden="true">
                                                        <div className="card-body placeholder-glow">
                                                            <span className="placeholder col-1"></span> <span className="placeholder col-4"></span>
                                                        </div>
                                                    </div>
                                                    <div className="projects-list-loading card nav-link mb-3" aria-hidden="true">
                                                        <div className="card-body placeholder-glow">
                                                            <span className="placeholder col-1"></span> <span className="placeholder col-4"></span>
                                                        </div>
                                                    </div>
                                                    <div className="projects-list-loading card nav-link mb-3" aria-hidden="true">
                                                        <div className="card-body placeholder-glow">
                                                            <span className="placeholder col-1"></span> <span className="placeholder col-4"></span>
                                                        </div>
                                                    </div>
                                                    <div className="projects-list-loading card nav-link mb-3" aria-hidden="true">
                                                        <div className="card-body placeholder-glow">
                                                            <span className="placeholder col-1"></span> <span className="placeholder col-4"></span>
                                                        </div>
                                                    </div>
                                                    <div className="projects-list-loading card nav-link mb-3" aria-hidden="true">
                                                        <div className="card-body placeholder-glow">
                                                            <span className="placeholder col-1"></span> <span className="placeholder col-4"></span>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        ) : (
                                            <div className="projects-list-empty">
                                                <div className="projects-list-empty-header">
                                                    <i className="bi bi-journal-x"></i>
                                                    <br />
                                                    <span>ไม่มีข้อมูล</span>
                                                </div>
                                                <span>นี่อาจเป็นข้อผิดพลาดบางอย่าง เราขอแนะนำให้คุณลองโหลดหน้านี้ใหม่อีกครั้ง</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
