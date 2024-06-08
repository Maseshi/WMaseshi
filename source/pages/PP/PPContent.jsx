import { useMemo } from 'react'

import PrivacyPolicyMarkdown from '@/assets/documents/privacy-policy.mdx?raw'

import Markdown from '@/libs/Markdown'

export default function PPContent() {
    const privacyPolicy = useMemo(() => <Markdown text={PrivacyPolicyMarkdown} />, [])

    return privacyPolicy
}
