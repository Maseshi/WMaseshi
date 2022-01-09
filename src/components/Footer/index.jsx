import './style.css';

export default function Footer() {
    return (
        <>
            <div className="wave-top">
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(240, 240, 250, 0.7)" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(240, 240, 250, 0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(240, 240, 250, 0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(240, 240, 250, 1)" />
                    </g>
                </svg>
            </div>
            <div className="footer footer-light">
                <div className="footer-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <a className="footer-brand" href="/">
                                    <img className="d-inline-block align-middle" src="/favicon-96x96.png" alt="favicon" width="50" height="50" />
                                    Maseshi
                                </a>
                                <br />
                                <br />
                                <p>เว็บไซต์ส่วนตัวของ Chaiwat Suwannarat มีไว้สำหรับกักเก็บและเผยแพร่ผลงานของตน ซึ่งทุกคนสามารถศึกษาหรือนำไปใช้งานได้ฟรี</p>
                                <p>
                                    หากมีข้อสงสัยใดๆ สามารถติดต่อได้ที่:
                                    <br />
                                    <a href="mailto:dermhioasw123@gmail.com">dermhioasw123@gmail.com</a>
                                </p>
                            </div>
                            <div className="col-md-4">
                                <h3>ลิงค์อื่นๆ</h3>
                                <br />
                                <ul className="footer-link">
                                    <li className="footer-link-item">
                                        <a className="footer-link-a" href="/account">บัญชี</a>
                                    </li>
                                    <li className="footer-link-item">
                                        <a className="footer-link-a" href="/privacy-policy">นโยบายความเป็นส่วนตัว</a>
                                    </li>
                                    <li className="footer-link-item">
                                        <a className="footer-link-a" href="/terms-of-service">เงื่อนไขการให้บริการ</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>แหล่งข้อมูล</h3>
                                <br />
                                <ul className="footer-link">
                                    <li className="footer-link-item">
                                        <a className="footer-link-a disabled" href="https://github.com/Maseshi/WMaseshi" target="_blank" rel="noreferrer" aria-disabled="true">โอเพ่นซอร์ส</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-raw text-center">
                    <span>
                        <a href="/privacy-policy">นโยบายความเป็นส่วนตัว</a> • <a href="/terms-of-service">เงื่อนไขการให้บริการ</a>
                    </span>
                    <br />
                    <span>© 2563 - 2565 Chaiwat Suwannarat. สงวนลิขสิทธิ์</span>
                </div>
            </div>
        </>
    )
}
