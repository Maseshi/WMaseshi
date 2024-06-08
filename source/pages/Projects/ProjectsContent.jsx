import { useState, useEffect, useContext } from 'react'
import {
    Container,
    ButtonGroup,
    ButtonToolbar,
    InputGroup,
    ToggleButton,
    Form,
    Row
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import ProjectsList from '@/components/ProjectsList'

import DataContext from '@/contexts/DataContext'

export default function ProjectsContent() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.ProjectsContent' })
    const { reference } = useContext(DataContext)
    const [query, setQuery] = useState('')
    const [queryType, setQueryType] = useState(t('all'))

    const data = reference.firestore
    const projectTypes = [
        { name: t('all') },
        { name: t('plugin') },
        { name: t('website') },
        { name: t('application') }
    ]

    useEffect(() => {
        setQueryType(t('all'))
    }, [t])

    return (
        <Container as="section">
            <ButtonToolbar className="justify-content-between" aria-label={t('recommend_projects_type')}>
                <ButtonGroup className="mb-3" aria-label={t('recommend_projects')}>
                    {
                        projectTypes.map((radio, id) => (
                            <ToggleButton
                                key={id}
                                className={id === 0 ? 'rounded-start-3' : id === (projectTypes.length - 1) ? 'rounded-end-3' : ''}
                                id={`projectsType${id}`}
                                type="radio"
                                variant="outline-primary"
                                name="projectsType"
                                value={radio.name}
                                checked={queryType === radio.name}
                                onChange={(event) => setQueryType(event.target.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))
                    }
                </ButtonGroup>
                <InputGroup className="mx-auto mx-md-0 mb-3">
                    <InputGroup.Text className="rounded-start-3" id="search">
                        <i className="bi bi-search" />
                    </InputGroup.Text>
                    <Form.Control
                        type="search"
                        className="rounded-end-3"
                        placeholder={t('search_projects')}
                        aria-label="Search"
                        aria-describedby="search"
                        disabled={data.isLoading || data.isError}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </InputGroup>
            </ButtonToolbar>
            <br />
            <Row className="g-4" xs={1} md={3} lg={4}>
                <ProjectsList query={query || (queryType === t('all') ? '' : queryType)} />
            </Row>
        </Container>
    )
}
