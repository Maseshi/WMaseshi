import GetStart from './GetStart'
import News from './News'
import Documents from './Documents'
import Changelog from './Changelog'
import SourceCode from './SourceCode'

import { translator } from '../../../../../utils/functions/translator'

export default function ContentTabs({ data, userData, parameter }) {
    const tabs = ["get-start", "news", "documents", "changelog", "source-code"]
    
    const setParameter = (name, id) => {
        const url = new URL(window.location)

        url.searchParams.set(name, id)
        window.history.pushState({}, '', url)
    }

    return (
        <div className="projects-content-info">
            <ul className="nav nav-tabs nav-justified" id={data.id + "-tab"} role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={
                            parameter.tab === tabs[0] ? (
                                "nav-link active"
                            ) : (
                                !tabs.includes(parameter.tab) ? (
                                    "nav-link active"
                                ) : (
                                    "nav-link"
                                )
                            )
                        }
                        id={data.id + "-get-start-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + data.id + "-get-start"}
                        type="button"
                        role="tab"
                        aria-controls={data.id + "-get-start"}
                        aria-selected="true"
                        onClick={() => setParameter('tab', tabs[0])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.get_started}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={parameter.tab === tabs[1] ? "nav-link active" : "nav-link"}
                        id={data.id + "-news-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + data.id + "-news"}
                        type="button"
                        role="tab"
                        aria-controls={data.id + "-news"}
                        aria-selected="false"
                        onClick={() => setParameter('tab', tabs[1])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.news}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={parameter.tab === tabs[2] ? "nav-link disabled active" : "nav-link disabled"}
                        id={data.id + "-documents-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + data.id + "-documents"}
                        type="button"
                        role="tab"
                        aria-controls={data.id + "-documents"}
                        aria-selected="false"
                        onClick={() => setParameter('tab', tabs[2])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.documents_coming_soon}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={parameter.tab === tabs[3] ? "nav-link active" : "nav-link"}
                        id={data.id + "-changelog-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + data.id + "-changelog"}
                        type="button"
                        role="tab"
                        aria-controls={data.id + "-changelog"}
                        aria-selected="false"
                        onClick={() => setParameter('tab', tabs[3])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.changelog}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={parameter.tab === tabs[4] ? "nav-link active" : "nav-link"}
                        id={data.id + "-source-code-tab"}
                        data-bs-toggle="tab"
                        data-bs-target={"#" + data.id + "-source-code"}
                        type="button"
                        role="tab"
                        aria-controls={data.id + "-source-code"}
                        aria-selected="false"
                        onClick={() => setParameter('tab', tabs[4])}
                    >
                        {translator().translate.pages.Projects.Pages.PageContents.ContentTabs.source_code}
                    </button>
                </li>
            </ul>
            <div className="tab-content" id={data.id + "-tab-content"}>
                <GetStart data={data} userData={userData} parameter={parameter} tabs={tabs} />
                <News data={data} userData={userData} parameter={parameter} tabs={tabs} />
                <Documents data={data} userData={userData} parameter={parameter} tabs={tabs} />
                <Changelog data={data} userData={userData} parameter={parameter} tabs={tabs} />
                <SourceCode data={data} userData={userData} parameter={parameter} tabs={tabs} />
            </div>
        </div>
    )
}
