import { useState } from 'react'

import ContentTabs from './PageContents/ContentTabs/index'
import ContentDetail from './PageContents/ContentDetail'
import ContentEditor from './PageEditor/ContentEditor/index'
import PageLoading from './PageLoading'
import PageWelcome from './PageWelcome'

import { translator } from '../../../utils/functions/translator'

export default function Pages({ data, userData, parameter }) {
    const [editor, setEditor] = useState([])
    const pages = []

    if (userData && userData.user.role === 'owner') pages.push('new-project')

    return (
        <div className="projects-content tab-content" id="v-pills-tabContent">
            <div className={!data && parameter.id ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-loading" role="tabpanel" aria-labelledby="v-pills-loading">
                <PageLoading />
            </div>
            <div className={!parameter.id ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <PageWelcome />
            </div>
            <div className={parameter.id === 'new-project' ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-new-project" role="tabpanel" aria-labelledby="v-pills-new-project-tab">
                <ContentEditor userData={userData} parameter={parameter} pagesID={pages} />
            </div>
            {
                data ? (
                    data.map((data, index) => {
                        if (parameter.id === data.id) document.title = data.title + ' - ' + translator().translate.pages.Projects.Pages.Pages.website_title

                        pages.push(data.id)

                        return (
                            <div className={parameter.id === data.id ? "tab-pane fade show active" : "tab-pane fade"} id={"v-pills-" + data.id} role="tabpanel" aria-labelledby={"v-pills-" + data.id + "-tab"} key={index}>
                                {
                                    editor && editor.includes(data.id) ? (
                                        userData && userData.user.role === 'owner' ? (
                                            <>
                                                <ContentEditor data={data} userData={userData} parameter={parameter} pages={pages} />
                                                <div className="projects-content-edit-cancel mt-3">
                                                    <div className="d-grid gap-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-light"
                                                            id={
                                                                data ? (
                                                                    'editorProject' + data.title.replace(' ', '') + 'Cancel'
                                                                ) : (
                                                                    'editorProjectCancel'
                                                                )
                                                            }
                                                            onClick={() => setEditor(editor.length === 1 ? [] : delete editor[data.id])}
                                                        >
                                                            <i className="bi bi-pencil-square"></i> {translator().translate.pages.Projects.Pages.Pages.cancel_changes}
                                                        </button>
                                                    </div >
                                                </div >
                                            </>
                                        ) : (
                                            ''
                                        )
                                    ) : (
                                        <>
                                            {
                                                userData && userData.user.role === 'owner' ? (
                                                    <div className="projects-content-edit mb-3">
                                                        <div className="d-grid gap-2">
                                                            <button
                                                                type="button"
                                                                className="btn btn-light"
                                                                onClick={() => setEditor(editor.concat(data.id))}
                                                            >
                                                                <i className="bi bi-pencil-square"></i> {translator().translate.pages.Projects.Pages.Pages.edit_this_page}
                                                            </button>
                                                        </div >
                                                    </div >
                                                ) : ''
                                            }
                                            <ContentDetail data={data} />
                                            <ContentTabs data={data} userData={userData} parameter={parameter} />
                                        </>
                                    )
                                }
                            </div >
                        )
                    })
                ) : ''
            }
            <div className={data && parameter.id && !pages.includes(parameter.id) ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-empty" role="tabpanel" aria-labelledby="v-pills-empty-tab">
                <div className="projects-empty">
                    <i className="bi bi-journal-x"></i>
                    <br />
                    <h3>{translator().translate.pages.Projects.Pages.Pages.project_not_found} "{parameter.id}"</h3>
                    <p>
                        {translator().translate.pages.Projects.Pages.Pages.project_not_found_information}
                    </p>
                </div>
            </div>
        </div >
    )
}
