import Detail from './Detail'
import GetStart from './GetStart'
import News from './News'
import Documents from './Documents'
import Changelog from './Changelog'
import SourceCode from './SourceCode'

export default function Contents(props) {
    const dataProps = props.data
    const loadedProps = props.loaded
    const parameterProps = props.parameter

    const projectID = []
    const tabID = ["get-start", "news", "documents", "changelog", "source-code"]

    dataProps.forEach((data) => {
        if (parameterProps.project === data.id) document.title = data.title + ' - โครงการ | Maseshi'
        projectID.push(data.id)
    })

    return (
        <div className="tab-content" id="v-pills-tabContent">
            <div className={!loadedProps && parameterProps.project ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-loading" role="tabpanel" aria-labelledby="v-pills-loading">
                <div className="projects-content-detail-loading mb-3">
                    <div className="row">
                        <div className="col-md-2 placeholder-glow" align="center">
                            <span className="projects-loading-content placeholder" style={{ 'width': '100px', 'height': '100px' }}></span>
                        </div>
                        <div className="col-md-8 placeholder-glow" align="left">
                            <h3>
                                <span className="projects-loading-content projects-content-loading-name placeholder" style={{ 'width': '100px', 'height': '30px' }}></span>
                            </h3>
                            <p>
                                <span className="projects-loading-content placeholder" style={{ 'width': '100px', 'height': '20px' }}></span>
                                <span className="projects-loading-content placeholder ms-1" style={{ 'width': '160px', 'height': '20px' }}></span>
                                <span className="projects-loading-content placeholder ms-1" style={{ 'width': '80px', 'height': '20px' }}></span>
                                <span className="projects-loading-content placeholder ms-1" style={{ 'width': '50px', 'height': '20px' }}></span>
                            </p>
                            <p>
                                <span className="projects-loading-content placeholder col-3"></span>
                                <span className="projects-loading-content placeholder col-2 ms-1"></span>
                                <span className="projects-loading-content placeholder col-2 ms-1"></span>
                                <span className="projects-loading-content placeholder col-4 ms-1"></span>
                                <span className="projects-loading-content placeholder col-5 ms-1"></span>
                            </p>
                            <p>
                                <span className="projects-loading-content placeholder col-2"></span>
                                <span className="projects-loading-content placeholder col-1 ms-1"></span>
                                <span className="projects-loading-content placeholder col-1 ms-1"></span>
                                <span className="projects-loading-content placeholder col-2 ms-1"></span>
                            </p>
                        </div>
                        <div className="col-md-2 placeholder-glow" align="center" style={{ 'alignSelf': 'center' }}>
                            <button type="button" tabIndex="-1" className="projects-loading-content btn btn-primary disabled placeholder col-8"></button>
                        </div>
                    </div>
                </div>
                <div className="projects-content-info-loading">
                    <ul className="nav nav-tabs nav-justified" id="loading-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link placeholder-glow disabled active" id="loading-1-tab" data-bs-toggle="tab" data-bs-target="#loading-1" type="button" role="tab" aria-controls="loading-1" aria-selected="true">
                                <span className="projects-loading-content placeholder" style={{ 'width': '80px' }}></span>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link placeholder-glow disabled" id="loading-2-tab" data-bs-toggle="tab" data-bs-target="#loading-2" type="button" role="tab" aria-controls="loading-2" aria-selected="false">
                                <span className="projects-loading-content placeholder" style={{ 'width': '60px' }}></span>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link placeholder-glow disabled" id="loading-3-tab" data-bs-toggle="tab" data-bs-target="#loading-3" type="button" role="tab" aria-controls="loading-3" aria-selected="false">
                                <span className="projects-loading-content placeholder" style={{ 'width': '80px' }}></span>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link placeholder-glow disabled" id="loading-4-tab" data-bs-toggle="tab" data-bs-target="#loading-4" type="button" role="tab" aria-controls="loading-4" aria-selected="false">
                                <span className="projects-loading-content placeholder" style={{ 'width': '60px' }}></span>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link placeholder-glow disabled" id="loading-5-tab" data-bs-toggle="tab" data-bs-target="#loading-5" type="button" role="tab" aria-controls="loading-5" aria-selected="false">
                                <span className="projects-loading-content placeholder" style={{ 'width': '80px' }}></span>
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="loading-tab-content">
                        <div className="tab-pane fade placeholder-glow show active" id="loading-1" role="tabpanel" aria-labelledby="loading-1-tab">
                            <div className="mt-3">
                                <div align="center">
                                    <span className="projects-loading-content placeholder" style={{ width: '100px', height: '100px' }}></span>
                                    <h1>
                                        <span className="projects-loading-content placeholder" style={{ width: '130px' }}></span>
                                    </h1>
                                </div>
                                <span className="projects-loading-content placeholder col-2"></span>
                                <span className="projects-loading-content placeholder col-3 ms-1"></span>
                                <span className="projects-loading-content placeholder col-3 ms-1"></span>
                                <span className="projects-loading-content placeholder col-4 ms-1"></span>
                                <span className="projects-loading-content placeholder col-5 ms-1"></span>
                                <span className="projects-loading-content placeholder col-6 ms-1"></span>
                                <hr />
                                <span className="projects-loading-content placeholder col-8 ms-1"></span>
                                <span className="projects-loading-content placeholder col-7 ms-1"></span>
                                <span className="projects-loading-content placeholder col-6 ms-1"></span>
                                <span className="projects-loading-content placeholder col-5 ms-1"></span>
                                <span className="projects-loading-content placeholder col-8 ms-1"></span>
                                <span className="projects-loading-content placeholder col-7 ms-1"></span>
                                <span className="projects-loading-content placeholder col-6 ms-1"></span>
                                <span className="projects-loading-content placeholder col-5 ms-1"></span>
                                <span className="projects-loading-content placeholder col-8 ms-1"></span>
                                <span className="projects-loading-content placeholder col-7 ms-1"></span>
                                <span className="projects-loading-content placeholder col-6 ms-1"></span>
                                <span className="projects-loading-content placeholder col-5 ms-1"></span>
                                <span className="projects-loading-content placeholder col-8 ms-1"></span>
                                <span className="projects-loading-content placeholder col-7 ms-1"></span>
                                <span className="projects-loading-content placeholder col-6 ms-1"></span>
                                <span className="projects-loading-content placeholder col-5 ms-1"></span>
                                <span className="projects-loading-content placeholder col-8 ms-1"></span>
                                <span className="projects-loading-content placeholder col-7 ms-1"></span>
                                <span className="projects-loading-content placeholder col-6 ms-1"></span>
                                <span className="projects-loading-content placeholder col-5 ms-1"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={!parameterProps.project ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <div className="projects-welcome-title" align="center">
                    <small>
                        <strong>โครงการทั้งหมด</strong>
                    </small>
                    <h1>ยินดีต้อนรับ</h1>
                </div>
                <div className="projects-welcome-info container">
                    <p>
                        ที่นี่คือศูนย์รวมโครงการทั้งหมดของ Maseshi ที่มีทั้งข้อมูลเกี่ยวกับโครงการ ข่าวสาร ข้อมูลอ้างอิงและรายละเอียดที่สำคัญของแต่ละโครงการ ซึ่งข้อมูลบางส่วนอาจจะได้รับการอ้างอิงมาจาก Github ของ Maseshi
                        <br />
                        หากคุณเพิ่งเคยได้ใช้งานหน้านี้เป็นครั้งแรก คุณสามารถเลือกที่แถบโครงการด้านข้างเพื่อดูรายละเอียดของโครงการเพิ่มเติม
                    </p>
                    <h5>ลิงค์ที่อาจเป็นประโยชน์</h5>
                    <ul>
                        <li>
                            <span>Github: <a href="https://github.com/Maseshi" target="_blank" rel="noreferrer">https://github.com/Maseshi</a></span>
                        </li>
                        <li>
                            <span>Translate: <a href="https://translate.google.com" target="_blank" rel="noreferrer">https://translate.google.com</a></span>
                        </li>
                        <li>
                            <span>API (เร็วๆ นี้): <span className="text-secondary">https://maseshi.web.app/api</span></span>
                        </li>
                    </ul>
                    <h5>ภาษาที่รองรับ</h5>
                    <div className="projects-welcome-languages">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card active">
                                    <div className="card-body">
                                        ภาษาไทย
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card disabled">
                                    <div className="card-body disabled">
                                        English (Coming soon)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                dataProps ? (
                    dataProps.map((data, index) => {
                        return (
                            <div className={parameterProps.project === data.id ? "tab-pane fade show active" : "tab-pane fade"} id={"v-pills-" + data.id} role="tabpanel" aria-labelledby={"v-pills-" + data.id + "-tab"} key={index}>
                                <Detail data={data} />
                                <div className="projects-content-info">
                                    <ul className="nav nav-tabs nav-justified" id={data.id + "-tab"} role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className={
                                                parameterProps.tab === tabID[0] ?
                                                    "nav-link active"
                                                    :
                                                    !tabID.includes(parameterProps.tab) ? "nav-link active"
                                                        :
                                                        "nav-link"
                                            } onClick={
                                                () => {
                                                    const url = new URL(window.location)

                                                    url.searchParams.set('tab', tabID[0])
                                                    window.history.pushState({}, '', url)
                                                }
                                            } id={data.id + "-get-start-tab"} data-bs-toggle="tab" data-bs-target={"#" + data.id + "-get-start"} type="button" role="tab" aria-controls={data.id + "-get-start"} aria-selected="true">เริ่มต้นใช้งาน</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className={parameterProps.tab === tabID[1] ? "nav-link active" : "nav-link"} onClick={
                                                () => {
                                                    const url = new URL(window.location)

                                                    url.searchParams.set('tab', tabID[1])
                                                    window.history.pushState({}, '', url)
                                                }
                                            } id={data.id + "-news-tab"} data-bs-toggle="tab" data-bs-target={"#" + data.id + "-news"} type="button" role="tab" aria-controls={data.id + "-news"} aria-selected="false">ข่าวสาร</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className={parameterProps.tab === tabID[2] ? "nav-link disabled active" : "nav-link disabled"} onClick={
                                                () => {
                                                    const url = new URL(window.location)

                                                    url.searchParams.set('tab', tabID[2])
                                                    window.history.pushState({}, '', url)
                                                }
                                            } id={data.id + "-documents-tab"} data-bs-toggle="tab" data-bs-target={"#" + data.id + "-documents"} type="button" role="tab" aria-controls={data.id + "-documents"} aria-selected="false">เอกสาร (เร็วๆ นี้)</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className={parameterProps.tab === tabID[3] ? "nav-link active" : "nav-link"} onClick={
                                                () => {
                                                    const url = new URL(window.location)

                                                    url.searchParams.set('tab', tabID[3])
                                                    window.history.pushState({}, '', url)
                                                }
                                            } id={data.id + "-changelog-tab"} data-bs-toggle="tab" data-bs-target={"#" + data.id + "-changelog"} type="button" role="tab" aria-controls={data.id + "-changelog"} aria-selected="false">การเปลี่ยนแปลง</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className={parameterProps.tab === tabID[4] ? "nav-link active" : "nav-link"} onClick={
                                                () => {
                                                    const url = new URL(window.location)

                                                    url.searchParams.set('tab', tabID[4])
                                                    window.history.pushState({}, '', url)
                                                }
                                            } id={data.id + "-source-code-tab"} data-bs-toggle="tab" data-bs-target={"#" + data.id + "-source-code"} type="button" role="tab" aria-controls={data.id + "-source-code"} aria-selected="false">ซอร์สโค้ด</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id={data.id + "-tab-content"}>
                                        <GetStart data={data} parameter={parameterProps} tabID={tabID} />
                                        <News data={data} parameter={parameterProps} tabID={tabID} />
                                        <Documents data={data} parameter={parameterProps} tabID={tabID} />
                                        <Changelog data={data} parameter={parameterProps} tabID={tabID} />
                                        <SourceCode data={data} parameter={parameterProps} tabID={tabID} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    ''
                )
            }
            <div className={parameterProps.project && loadedProps && !projectID.includes(parameterProps.project) ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-empty" role="tabpanel" aria-labelledby="v-pills-empty-tab">
                <div className="projects-empty">
                    <i className="bi bi-journal-x"></i>
                    <br />
                    <h3>ไม่พบโครงการ "{parameterProps.project}"</h3>
                    <p>อาจจะถูกย้ายหรือถูกลบไปแล้วและอาจเป็นโครงการส่วนตัว</p>
                </div>
            </div>
        </div>
    )
}
