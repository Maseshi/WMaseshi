import useMarkDown from '../../hooks/useMarkDown'

import tos from './terms-of-service.md'

export default function Content() {
    const xmlString = useMarkDown(tos);

    return (
        <section className="tos-content">
            <div className="container" dangerouslySetInnerHTML={{ __html: xmlString }}></div>
        </section>
    )
}
