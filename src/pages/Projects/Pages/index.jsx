import ContentDetail from './PageContents/ContentDetail'
import ContentTabs from './PageContents/ContentTabs'
import ContentsEditor from './PageEditor/ContentEditor/index'
import PageLoading from './PageLoading'
import PageWelcome from './PageWelcome'

import { translator } from '../../../utils/functions/translator'

export default function Pages(props) {
    const dataProps = props.data
    const userDataProps = props.userData
    const loadedProps = props.loaded
    const parameterProps = props.parameter

    const pagesID = []

    if (loadedProps && userDataProps && userDataProps.user.role === 'owner') pagesID.push('new-project')

    dataProps.forEach((data) => {
        if (parameterProps.id === data.id) document.title = data.title + ' - ' + translator().translate.pages.Projects.Pages.Pages.website_title
        pagesID.push(data.id)
    })

    return (
        <div className="tab-content" id="v-pills-tabContent">
            <div className={!loadedProps && parameterProps.id ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-loading" role="tabpanel" aria-labelledby="v-pills-loading">
                <PageLoading />
            </div>
            <div className={!parameterProps.id ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <PageWelcome />
            </div>
            <div className={parameterProps.id === 'new-project' ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-new-project" role="tabpanel" aria-labelledby="v-pills-new-project-tab">
                <ContentsEditor userData={userDataProps} loaded={loadedProps} parameter={parameterProps} pagesID={pagesID} />
            </div>
            {
                dataProps ? (
                    dataProps.map((data, index) => {
                        return (
                            <div className={parameterProps.id === data.id ? "tab-pane fade show active" : "tab-pane fade"} id={"v-pills-" + data.id} role="tabpanel" aria-labelledby={"v-pills-" + data.id + "-tab"} key={index}>
                                <ContentDetail data={data} />
                                <ContentTabs data={data} userData={userDataProps} parameter={parameterProps} />
                            </div>
                        )
                    })
                ) : ''
            }
            <div className={parameterProps.id && loadedProps && !pagesID.includes(parameterProps.id) ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-empty" role="tabpanel" aria-labelledby="v-pills-empty-tab">
                <div className="projects-empty">
                    <i className="bi bi-journal-x"></i>
                    <br />
                    <h3>{translator().translate.pages.Projects.Pages.Pages.project_not_found} "{parameterProps.id}"</h3>
                    <p>
                        {translator().translate.pages.Projects.Pages.Pages.project_not_found_information}
                    </p>
                </div>
            </div>
        </div>
    )
}
