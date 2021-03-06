export default function Welcome() {
    return (
        <section className="home-welcome">
            <div className="home-welcome-greet">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 home-welcome-creator mb-3">
                            <img className="home-welcome-creator-image" src={require('../../assets/images/maseshi-creator.webp')} width="150px" height="150px" alt="" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <small>สวัสดีครับ</small>
                            <h1>ผม Maseshi</h1>
                            <p>การเรียนรู้และพัฒนาคือสิ่งสำคัญเหมือนกับการฝึกเขียนโปรแกรมแล้วนำไปต่อยอด ในเว็บไซต์นี้จะนำเสนอถึงสิ่งที่ผมจะนำเสนอทั้งหมด</p>
                            <a className="home-btn btn btn-primary" href="/projects">สำรวจโครงการทั้งหมด</a>
                            <button type="button" className="home-btn btn btn-outline-primary ms-1" data-bs-toggle="modal" data-bs-target="#donateModal">สนับสนุนช่วยเหลือ</button>
                            <br />
                            <span className="home-welcome-social-way">
                                <a className="btn btn-link" href="https://web.facebook.com/chaiwat.fb/" target="_blank" rel="noreferrer">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a className="btn btn-link" href="https://github.com/Maseshi" target="_blank" rel="noreferrer">
                                    <i className="bi bi-github"></i>
                                </a>
                                <a className="btn btn-link" href="https://www.instagram.com/chaiwat_itg/" target="_blank" rel="noreferrer">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a className="btn btn-link" href="https://twitter.com/chaiwat_twt" target="_blank" rel="noreferrer">
                                    <i className="bi bi-twitter"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
