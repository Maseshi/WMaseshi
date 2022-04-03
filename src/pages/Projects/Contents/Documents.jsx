export default function Documents(props) {
  const dataProps = props.data
  const parameterProps = props.parameter
  const tabIDProps = props.tabID

  return (
    <div className={parameterProps.tab === tabIDProps[2] ? "tab-pane fade show active" : "tab-pane fade"} id={dataProps.id + "-documents"} role="tabpanel" aria-labelledby={dataProps.id + "-documents-tab"}>

    </div>
  )
}
