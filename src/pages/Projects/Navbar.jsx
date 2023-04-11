import { useState } from "react"

import { translator } from '../../utils/functions/translator'

export default function Navbar({ data, userData, parameter }) {
    const [query, setQuery] = useState()

    const checkSearchResult = () => {
        return data.filter(data => {
            if (query) {
                if (query !== '') {
                    if (data.title.toLowerCase().includes(query.toLowerCase())) {
                        return data
                    } else {
                        return null
                    }
                } else {
                    return data
                }
            } else {
                return data
            }
        })
    }

    const handleHomeButton = () => {
        document.title = translator().translate.pages.Projects.Navbar.website_title

        const url = new URL(window.location)

        url.searchParams.delete('id')
        url.searchParams.delete('tab')
        window.history.pushState({}, '', url)
    }
    const handleNewProject = () => {
        document.title = translator().translate.pages.Projects.Navbar.website_title_new_projects

        const url = new URL(window.location)
        const homeButton = document.getElementById('v-pills-home-tab')

        url.searchParams.set('id', 'new-project')
        window.history.pushState({}, '', url)

        if (homeButton.classList.contains('active')) {
            homeButton.classList.remove('active')
            homeButton.setAttribute('aria-selected', 'false')
        }
    }

    return (
        <nav className="projects-navbar navbar navbar-expand-lg">
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasProjectsNavbar" aria-labelledby="offcanvasProjectsNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                        {translator().translate.pages.Projects.Navbar.options}
                    </h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="projects-offcanvas-navbar">
                        <div className="projects-beta-content mb-3">
                            <span>
                                <i className="bi bi-exclamation-circle"></i> {translator().translate.pages.Projects.Navbar.currently_beta}
                            </span>
                        </div>
                        <div className="projects-search-box form-floating mb-3">
                            <input type="text" className="form-control" id="inputSearchProjects" onChange={event => setQuery(event.target.value)} placeholder={translator().translate.pages.Projects.Navbar.search_projects} disabled={data ? false : true} />
                            <label htmlFor="inputSearchProjects">
                                <i className="bi bi-search"></i> {translator().translate.pages.Projects.Navbar.search_projects}
                            </label>
                        </div>
                        <div className="projects-list">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <div className="projects-list-title mb-3">
                                    <div className="d-flex flex-row">
                                        <span data-bs-dismiss="offcanvas" aria-label="Close">
                                            <button
                                                className={!parameter.id ? "projects-list-title-home active" : "projects-list-title-home"}
                                                id="v-pills-home-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#v-pills-home"
                                                type="button"
                                                role="tab"
                                                aria-controls="v-pills-home"
                                                aria-selected={!parameter.id ? "true" : "false"}
                                                onClick={() => handleHomeButton}
                                            >
                                                <i className="bi bi-house"></i>
                                            </button>
                                        </span>
                                        <h5 className="projects-list-title-name flex-fill align-self-center ms-2 mb-0">
                                            {translator().translate.pages.Projects.Navbar.projects}
                                        </h5>
                                        <div className="projects-list-title-badge align-self-center">
                                            <span className="badge rounded-pill bg-primary">
                                                {
                                                    data.length > 0 ? (
                                                        data.length
                                                    ) : (
                                                        <div className="spinner-border spinner-border-sm" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    userData && userData.user.role === 'owner' ? (
                                        <button
                                            className={parameter.id === 'new-project' ? "projects-list-data card nav-link mb-2 active" : "projects-list-data card nav-link mb-2"}
                                            id="v-pills-new-project-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#v-pills-new-project"
                                            type="button"
                                            role="tab"
                                            aria-controls="v-pills-new-project"
                                            aria-selected={parameter.id === 'new-project' ? "true" : "false"}
                                            onClick={() => handleNewProject}
                                        >
                                            <div className="card-body" data-bs-dismiss="offcanvas" aria-label="Close">
                                                <i className="bi bi-plus"></i>
                                            </div>
                                        </button>
                                    ) : (
                                        ''
                                    )
                                }
                                {
                                    data ? (
                                        data.length > 0 ? (
                                            <>
                                                {
                                                    !checkSearchResult().length ? (
                                                        <div className="projects-list-search-empty">
                                                            <i className="bi bi-exclamation-square"></i>
                                                            <br />
                                                            <p>
                                                                {translator().translate.pages.Projects.Navbar.project_not_found}
                                                            </p>
                                                        </div>
                                                    ) : ''
                                                }
                                                {
                                                    data.sort((a, b) => a.title.localeCompare(b.title))
                                                        .filter(data => {
                                                            if (query) {
                                                                if (query !== '') {
                                                                    if (data.title.toLowerCase().includes(query.toLowerCase())) {
                                                                        return data
                                                                    } else {
                                                                        return null
                                                                    }
                                                                } else {
                                                                    return data
                                                                }
                                                            } else {
                                                                return data
                                                            }
                                                        })
                                                        .map((data, index) => {
                                                            const handleProjects = () => {
                                                                document.title = data.title + ' - ' + translator().translate.pages.Projects.Navbar.website_title

                                                                const url = new URL(window.location)
                                                                const homeButton = document.getElementById('v-pills-home-tab')

                                                                url.searchParams.set('id', data.id)
                                                                window.history.pushState({}, '', url)

                                                                if (homeButton.classList.contains('active')) {
                                                                    homeButton.classList.remove('active')
                                                                    homeButton.setAttribute('aria-selected', 'false')
                                                                }
                                                            }

                                                            return (
                                                                <button
                                                                    className={parameter.id === data.id ? "projects-list-data card nav-link mb-2 active" : "projects-list-data card nav-link mb-2"}
                                                                    id={"v-pills-" + data.id + "-tab"}
                                                                    data-bs-toggle="pill"
                                                                    data-bs-target={"#v-pills-" + data.id}
                                                                    type="button"
                                                                    role="tab"
                                                                    aria-controls={"v-pills-" + data.id}
                                                                    aria-selected={parameter.id === data.id ? "true" : "false"}
                                                                    onClick={() => handleProjects}
                                                                    key={index}
                                                                >
                                                                    <div className="card-body" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        {
                                                                            data.icon ? (
                                                                                <>
                                                                                    <img className="projects-list-icon" src={data.icon} width="30px" height="30px" alt={data.id} /> {data.title} {data.status === 1 ? <span className="badge rounded-pill text-bg-secondary">ปิด</span> : ''}
                                                                                </>
                                                                            ) : (
                                                                                <div className="projects-list-no-icon">
                                                                                    <div className="projects-list-no-icon-image">
                                                                                        <i className="bi bi-archive"></i>
                                                                                    </div>
                                                                                    {data.title}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </button>
                                                            )
                                                        })
                                                }
                                            </>
                                        ) : (
                                            <div className="projects-list-empty">
                                                <div className="projects-list-empty-header">
                                                    <i className="bi bi-journal-x"></i>
                                                    <br />
                                                    <span>
                                                        {translator().translate.pages.Projects.Navbar.no_data}
                                                    </span>
                                                </div>
                                                <span>
                                                    {translator().translate.pages.Projects.Navbar.no_data_information}
                                                </span>
                                            </div>
                                        )
                                    ) : (
                                        Array.from({ length: 8 }, (__, index) => {
                                            return (
                                                <div className="projects-list-loading card nav-link mb-3" aria-hidden="true" key={index}>
                                                    <div className="card-body placeholder-glow">
                                                        <span className="placeholder col-1"></span> <span className="placeholder col-4"></span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </nav >
    )
}
