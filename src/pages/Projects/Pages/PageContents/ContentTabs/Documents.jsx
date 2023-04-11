export default function Documents({ data, parameter, tabs }) {
  return (
    <div className={parameter.tab === tabs[2] ? "tab-pane fade show active" : "tab-pane fade"} id={data.id + "-documents"} role="tabpanel" aria-labelledby={data.id + "-documents-tab"}>

    </div>
  )
}
