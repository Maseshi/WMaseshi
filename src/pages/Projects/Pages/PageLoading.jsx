export default function PageLoading() {
    return (
        <>
            <div className="projects-content-detail-loading mb-3">
                <div className="row">
                    <div className="col-md-2 placeholder-glow" align="center">
                        <span className="placeholder" style={{ 'width': '100px', 'height': '100px' }}></span>
                    </div>
                    <div className="col-md-8 placeholder-glow" align="left">
                        <h3>
                            <span className="projects-content-loading-name placeholder" style={{ 'width': '100px', 'height': '30px' }}></span>
                        </h3>
                        <p>
                            <span className="placeholder" style={{ 'width': '100px', 'height': '20px' }}></span>
                            <span className="placeholder ms-1" style={{ 'width': '160px', 'height': '20px' }}></span>
                            <span className="placeholder ms-1" style={{ 'width': '80px', 'height': '20px' }}></span>
                            <span className="placeholder ms-1" style={{ 'width': '50px', 'height': '20px' }}></span>
                        </p>
                        <p>
                            <span className="placeholder col-3"></span>
                            <span className="placeholder col-2 ms-1"></span>
                            <span className="placeholder col-2 ms-1"></span>
                            <span className="placeholder col-4 ms-1"></span>
                            <span className="placeholder col-5 ms-1"></span>
                        </p>
                        <p>
                            <span className="placeholder col-2"></span>
                            <span className="placeholder col-1 ms-1"></span>
                            <span className="placeholder col-1 ms-1"></span>
                            <span className="placeholder col-2 ms-1"></span>
                        </p>
                    </div>
                    <div className="col-md-2 placeholder-glow" align="center" style={{ 'alignSelf': 'center' }}>
                        <button type="button" tabIndex="-1" className="btn btn-primary disabled placeholder col-8"></button>
                    </div>
                </div>
            </div>
            <div className="projects-content-info-loading">
                <ul className="nav nav-tabs nav-justified" id="loading-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link placeholder-glow disabled active" id="loading-1-tab" data-bs-toggle="tab" data-bs-target="#loading-1" type="button" role="tab" aria-controls="loading-1" aria-selected="true">
                            <span className="placeholder" style={{ 'width': '80px' }}></span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link placeholder-glow disabled" id="loading-2-tab" data-bs-toggle="tab" data-bs-target="#loading-2" type="button" role="tab" aria-controls="loading-2" aria-selected="false">
                            <span className="placeholder" style={{ 'width': '60px' }}></span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link placeholder-glow disabled" id="loading-3-tab" data-bs-toggle="tab" data-bs-target="#loading-3" type="button" role="tab" aria-controls="loading-3" aria-selected="false">
                            <span className="placeholder" style={{ 'width': '80px' }}></span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link placeholder-glow disabled" id="loading-4-tab" data-bs-toggle="tab" data-bs-target="#loading-4" type="button" role="tab" aria-controls="loading-4" aria-selected="false">
                            <span className="placeholder" style={{ 'width': '60px' }}></span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link placeholder-glow disabled" id="loading-5-tab" data-bs-toggle="tab" data-bs-target="#loading-5" type="button" role="tab" aria-controls="loading-5" aria-selected="false">
                            <span className="placeholder" style={{ 'width': '80px' }}></span>
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="loading-tab-content">
                    <div className="tab-pane fade placeholder-glow show active" id="loading-1" role="tabpanel" aria-labelledby="loading-1-tab">
                        <div className="mt-3">
                            <div align="center">
                                <span className="placeholder" style={{ width: '100px', height: '100px' }}></span>
                                <h1>
                                    <span className="placeholder" style={{ width: '130px' }}></span>
                                </h1>
                            </div>
                            <span className="placeholder col-2"></span>
                            <span className="placeholder col-3 ms-1"></span>
                            <span className="placeholder col-3 ms-1"></span>
                            <span className="placeholder col-4 ms-1"></span>
                            <span className="placeholder col-5 ms-1"></span>
                            <span className="placeholder col-6 ms-1"></span>
                            <hr />
                            <span className="placeholder col-8 ms-1"></span>
                            <span className="placeholder col-7 ms-1"></span>
                            <span className="placeholder col-6 ms-1"></span>
                            <span className="placeholder col-5 ms-1"></span>
                            <span className="placeholder col-8 ms-1"></span>
                            <span className="placeholder col-7 ms-1"></span>
                            <span className="placeholder col-6 ms-1"></span>
                            <span className="placeholder col-5 ms-1"></span>
                            <span className="placeholder col-8 ms-1"></span>
                            <span className="placeholder col-7 ms-1"></span>
                            <span className="placeholder col-6 ms-1"></span>
                            <span className="placeholder col-5 ms-1"></span>
                            <span className="placeholder col-8 ms-1"></span>
                            <span className="placeholder col-7 ms-1"></span>
                            <span className="placeholder col-6 ms-1"></span>
                            <span className="placeholder col-5 ms-1"></span>
                            <span className="placeholder col-8 ms-1"></span>
                            <span className="placeholder col-7 ms-1"></span>
                            <span className="placeholder col-6 ms-1"></span>
                            <span className="placeholder col-5 ms-1"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
