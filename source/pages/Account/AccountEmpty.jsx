import { Container, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

export default function AccountEmpty() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.AccountEmpty' })
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <Container className="text-center">
            <i className="bi bi-x-circle text-warning display-3 mb-3" />
            <h2 className="d-inline-block text-warning text-truncate" style={{ maxWidth: '200px'}}>
                {t('not_found', { query: searchParams.get('tab') })}
            </h2>
            <p className="mb-3">
                {t('page_is_missing')}
                <br />
                {t('suggestions')}
            </p>
            <small>
                ERR: PAGE_NOT_FOUND
            </small>
            <br />
            <Button
                className="mt-3"
                onClick={() => setSearchParams({ 'tab': 'personal' })}
            >
                {t('back')}
            </Button>
        </Container>
    )
}
