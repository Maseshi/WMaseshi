import { Link } from 'react-router-dom'

import Waves from '../../components/Waves/index'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function Footer() {
    return (
        <footer>
            <Waves position={'top'} r={240} g={240} b={250} />
            <div className="footer footer-light">
                <div className="footer-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <a className="footer-brand" href="/">
                                    <img className="d-inline-block align-middle" src={process.env.PUBLIC_URL + '/static/media/favicon-96x96.png'} alt="Maseshi" width="50" height="50" />
                                    Maseshi
                                </a>
                                <br />
                                <br />
                                <p>
                                    {translator().translate.layouts.Footer.website_info}
                                </p>
                                <p>
                                    {translator().translate.layouts.Footer.need_to_contact}
                                    <br />
                                    <a href="mailto:dermhioasw123@gmail.com">dermhioasw123@gmail.com</a>
                                </p>
                                <p>
                                    {translator().translate.layouts.Footer.currently + (' v' + require('../../../package.json').version + ' ') + translator().translate.layouts.Footer.code_licensed} <a href="https://github.com/Maseshi/WMaseshi/blob/main/LICENSE" rel="noreferrer noopener" target="_blank">MIT</a>
                                </p>
                            </div>
                            <div className="col-md-4 mb-3">
                                <h3>
                                    {translator().translate.layouts.Footer.other_links}
                                </h3>
                                <br />
                                <ul className="footer-link">
                                    <li className="footer-link-item">
                                        <Link className="footer-link-a" to="/projects">
                                            {translator().translate.layouts.Footer.all_projects}
                                        </Link>
                                    </li>
                                    <li className="footer-link-item">
                                        <Link className="footer-link-a" to="/account">
                                            {translator().translate.layouts.Footer.account}
                                        </Link>
                                    </li>
                                    <li className="footer-link-item">
                                        <Link className="footer-link-a" to="/privacy-policy">
                                            {translator().translate.layouts.Footer.privacy_policy}
                                        </Link>
                                    </li>
                                    <li className="footer-link-item">
                                        <Link className="footer-link-a" to="/terms-of-service">
                                            {translator().translate.layouts.Footer.terms_of_services}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>
                                    {translator().translate.layouts.Footer.resources}
                                </h3>
                                <br />
                                <ul className="footer-link">
                                    <li className="footer-link-item">
                                        <Link className="footer-link-a" to="./projects?id=wmaseshi" target="_blank" rel="noreferrer noopener">
                                            {translator().translate.layouts.Footer.open_source}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-raw text-center">
                    <span>
                        <Link to="/privacy-policy">{translator().translate.layouts.Footer.privacy_policy}</Link> • <Link to="/terms-of-service">{translator().translate.layouts.Footer.terms_of_services}</Link>
                    </span>
                    <br />
                    <span>
                        {translator().translate.layouts.Footer.copyright}
                    </span>
                </div>
            </div>
        </footer>
    )
}
