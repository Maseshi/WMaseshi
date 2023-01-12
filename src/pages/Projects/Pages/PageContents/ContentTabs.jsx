import GetStarted from './Tabs/GetStarted'
import News from './Tabs/News'
import Documents from './Tabs/Documents'
import Changelog from './Tabs/Changelog'
import SourceCode from './Tabs/SourceCode'

import { translator } from '../../../../utils/functions/translator'

export default function ContentTabs(props) {
    const dataProps = props.data
    const userDataProps = props.userData
    const parameterProps = props.parameter

    const tabID = ["get-start", "news", "documents", "changelog", "source-code"]
    const setParameter = (name, id) => {
        const url = new URL(window.location)

        url.searchParams.set(name, id)
        window.history.pushState({}, '', url)
    }

    return (
        <div className="projects-content-info">
            <ul className="nav nav-tabs nav-justified" id={dataProps.id + "-tab"} role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={
                            parameterProps.tab === tabID[0] ? (
                                "nav-link active"
                            ) : (
                                !tabID.includes(parameterProps.tab) ? (
                                    "nav-link active"
                                ) : (
                                    "nav-link"
                                )
                            )
                        }
                        id={dataProps.id + "-get-start-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + dataProps.id + "-get-start"}
                        type="button"
                        role="tab"
                        aria-controls={dataProps.id + "-get-start"}
                        aria-selected="true"
                        onClick={
                            () => setParameter('tab', tabID[0])
                        }
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.get_started}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={parameterProps.tab === tabID[1] ? "nav-link active" : "nav-link"}
                        id={dataProps.id + "-news-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + dataProps.id + "-news"}
                        type="button"
                        role="tab"
                        aria-controls={dataProps.id + "-news"}
                        aria-selected="false"
                        onClick={() => setParameter('tab', tabID[1])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.news}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={parameterProps.tab === tabID[2] ? "nav-link disabled active" : "nav-link disabled"}
                        id={dataProps.id + "-documents-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + dataProps.id + "-documents"}
                        type="button"
                        role="tab"
                        aria-controls={dataProps.id + "-documents"}
                        aria-selected="false"
                        onClick={() => setParameter('tab', tabID[2])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.documents_coming_soon}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={parameterProps.tab === tabID[3] ? "nav-link active" : "nav-link"}
                        id={dataProps.id + "-changelog-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + dataProps.id + "-changelog"}
                        type="button"
                        role="tab"
                        aria-controls={dataProps.id + "-changelog"}
                        aria-selected="false"
                        onClick={() => setParameter('tab', tabID[3])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.changelog}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={parameterProps.tab === tabID[4] ? "nav-link active" : "nav-link"}
                        id={dataProps.id + "-source-code-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + dataProps.id + "-source-code"}
                        type="button"
                        role="tab"
                        aria-controls={dataProps.id + "-source-code"}
                        aria-selected="false"
                        onClick={() => setParameter('tab', tabID[4])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.source_code}
                    </button>
                </li>
            </ul>
            <div className="tab-content" id={dataProps.id + "-tab-content"}>
                <GetStarted data={dataProps} userData={userDataProps} parameter={parameterProps} tabID={tabID} />
                <News data={dataProps} userData={userDataProps} parameter={parameterProps} tabID={tabID} />
                <Documents data={dataProps} userData={userDataProps} parameter={parameterProps} tabID={tabID} />
                <Changelog data={dataProps} userData={userDataProps} parameter={parameterProps} tabID={tabID} />
                <SourceCode data={dataProps} userData={userDataProps} parameter={parameterProps} tabID={tabID} />
            </div>
        </div>
    )
}
