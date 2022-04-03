import useMarkDown from '../../utils/hooks/useMarkDown'

import pp from './privacy-policy.md'

export default function Content() {
    const xmlString = useMarkDown(pp);

    return (
        <section className="pp-content">
            <div className="container" dangerouslySetInnerHTML={{ __html: xmlString }}></div>
        </section>
    )
}
