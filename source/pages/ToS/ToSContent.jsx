import { useMemo } from 'react'

import TermsOfServiceMarkdown from '@/assets/documents/terms-of-service.mdx?raw'

import Markdown from '@/libs/Markdown'

export default function ToSContent() {
    const termsOfService = useMemo(() => <Markdown text={TermsOfServiceMarkdown} />, [])

    return termsOfService
}