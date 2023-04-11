export default function Documents({ data }) {
    return (
        <div
            className="tab-pane fade"
            id={
                data ? (
                    'v-pills-' + data.id + '-documents'
                ) : (
                    'v-pills-documents'
                )
            }
            role="tabpanel"
            aria-labelledby={
                data ? (
                    'v-pills-' + data.id + '-documents-tab'
                ) : (
                    'v-pills-documents-tab'
                )
            }
            tabIndex="0"
        >

        </div>
    )
}
