import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, Tab, Placeholder } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import ProjectGetStart from './ProjectGetStart'
import ProjectNews from './ProjectNews'
import ProjectDocuments from './ProjectDocuments'
import ProjectChangelog from './ProjectChangelog'
import ProjectSourceCode from './ProjectSourceCode'

import styles from '@/styles/Project.module.css'

export default function ProjectContents({ data, document, id }) {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.pages.Project.ProjectContents' })
    const [searchParams, setSearchParams] = useSearchParams()

    const menuTabs = [
        { key: 'get-start', title: t('get_start'), element: <ProjectGetStart data={data} document={document} id={id} />, disabled: false },
        { key: 'news', title: t('news'), element: <ProjectNews data={data} document={document} />, disabled: false },
        { key: 'documents', title: t('documents'), element: <ProjectDocuments data={data} document={document} />, disabled: true },
        { key: 'changelog', title: t('changelog'), element: <ProjectChangelog data={data} document={document} />, disabled: false },
        { key: 'source-code', title: t('source_code'), element: <ProjectSourceCode data={data} document={document} id={id} />, disabled: false }
    ]

    const [tab, setTab] = useState(
        menuTabs.find((tab) => tab.key === searchParams.get('tab')) ? (
            searchParams.get('tab')
        ) : (
            'get-start'
        )
    )

    return (
        <>
            {
                data.isLoading ? (
                    <Tabs
                        as={Placeholder}
                        animation="glow"
                        defaultActiveKey="loading-1"
                        id="loading-tab"
                        className="mb-3"
                        justify
                    >
                        <Tab
                            as={Placeholder}
                            animation="glow"
                            eventKey="loading-1"
                            tabClassName="rounded-top-4"
                            title={<Placeholder className="rounded-3" style={{ 'width': '80px' }} />}
                            disabled
                        >
                            <div className="text-center">
                                <Placeholder className="rounded-4" style={{ width: '100px', height: '100px' }} />
                                <h1 aria-hidden="true">
                                    <Placeholder className="rounded-3" style={{ width: '130px' }} />
                                </h1>
                            </div>
                            {
                                Array.from({ length: 6 }, (__, index) => (
                                    <Placeholder className="rounded-3 me-1" xs={Math.floor(Math.random() * 12)} key={index} />
                                ))
                            }
                            <hr />
                            {
                                Array.from({ length: 20 }, (__, index) => (
                                    <Placeholder className="rounded-3 me-1" xs={Math.floor(Math.random() * 12)} key={index} />
                                ))
                            }
                        </Tab>
                        <Tab
                            eventKey="loading-2"
                            tabClassName="rounded-top-4"
                            title={<Placeholder className="rounded-3" style={{ 'width': '60px' }} />}
                            disabled
                        />
                        <Tab
                            eventKey="loading-3"
                            tabClassName="rounded-top-4"
                            title={<Placeholder className="rounded-3" style={{ 'width': '80px' }} />}
                            disabled
                        />
                        <Tab
                            eventKey="loading-4"
                            tabClassName="rounded-top-4"
                            title={<Placeholder className="rounded-3" style={{ 'width': '60px' }} />}
                            disabled
                        />
                        <Tab
                            eventKey="loading-5"
                            tabClassName="rounded-top-4"
                            title={<Placeholder className="rounded-3" style={{ 'width': '80px' }} />}
                            disabled
                        />
                    </Tabs>
                ) : data.isError ? (
                    ''
                ) : (
                    <Tabs
                        id="projectTabs"
                        activeKey={tab}
                        onSelect={
                            (key) => {
                                setTab(key)
                                setSearchParams({ 'tab': key })
                            }
                        }
                        className={`${styles['tabs-title']} mb-3`}
                        justify
                    >
                        {
                            menuTabs.map((data, index) => {
                                return (
                                    <Tab
                                        eventKey={data.key}
                                        tabClassName="rounded-top-4"
                                        title={data.title}
                                        disabled={data.disabled}
                                        key={index}
                                    >
                                        {data.element}
                                    </Tab>
                                )
                            })
                        }
                    </Tabs>
                )
            }
        </>
    )
}
ProjectContents.propTypes = {
    data: PropTypes.object,
    document: PropTypes.object,
    id: PropTypes.string
}
