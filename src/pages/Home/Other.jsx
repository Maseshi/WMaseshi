import { translator } from '../../utils/functions/translator'

import Modal from '../../components/Modal/index'

// Assets
import buyMeCoffeeLogo from '../../assets/icons/buy-me-a-coffee.webp'
import trueMoneyLogo from '../../assets/icons/true-money.webp'
import patreonLogo from '../../assets/icons/patreon.webp'
import qrCodeTrueMoney from '../../assets/images/qrcode-true-money.webp'

export default function Other() {
    return (
        <section className="home-other" id="other">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="home-other-card card text-white bg-dark">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <i className="bi bi-github"></i> Github
                                </h2>
                                <p className="lead">
                                    {translator().translate.pages.Home.Other.github_description}
                                </p>
                            </div>
                            <div className="card-footer">
                                <a className="home-other-btn btn btn-light btn-lg w-100" href="https://github.com/Maseshi" target="_blank" rel="noreferrer noopener" role="button">
                                    {translator().translate.pages.Home.Other.explore}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="home-other-card card text-dark bg-light">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <i className="bi bi-cash-coin"></i> {translator().translate.pages.Home.Other.support}
                                </h2>
                                <p className="lead">
                                    {translator().translate.pages.Home.Other.support_description}
                                </p>
                                <p className="lead">
                                    {translator().translate.pages.Home.Other.support_thank_you}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button className="home-other-btn btn btn-dark btn-lg w-100" type="button" data-bs-toggle="modal" data-bs-target="#donateModal">
                                    {translator().translate.pages.Home.Other.support}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                id="donate"
                title={translator().translate.pages.Home.Other.support_method}
                body={
                    <>
                        <div className="d-grid gap-2">
                            <a className="home-other-btn home-other-btn-funding-bmc btn btn-whatever btn-lg w-100" href="https://www.buymeacoffee.com/maseshi" target="_blank" rel="noreferrer noopener">
                                <img src={buyMeCoffeeLogo} width="30px" height="30px" alt="" /> {translator().translate.pages.Home.Other.buy_me_coffee}
                            </a>
                            <button className="home-other-btn btn btn-warning btn-lg w-100" type="button" data-bs-toggle="modal" data-bs-target="#trueMoneyModal">
                                <img src={trueMoneyLogo} width="30px" height="30px" alt="" /> True Money
                            </button>
                            <a className="home-other-btn btn btn-danger btn-lg w-100" href="https://www.patreon.com/maseshi" target="_blank" rel="noreferrer noopener">
                                <img src={patreonLogo} width="30px" height="30px" alt="" /> Patreon
                            </a>
                        </div>
                        <br />
                        <p className="text-center m-0">
                            {translator().translate.pages.Home.Other.support_modal_description}
                            <br />
                            {translator().translate.pages.Home.Other.support_modal_thank_you}
                        </p>
                    </>
                }
            />
            <Modal
                id="trueMoney"
                title={translator().translate.pages.Home.Other.support_through_true_money}
                body={
                    <img src={qrCodeTrueMoney} alt="" width="100%" height="100%" />
                }
            />
        </section>
    )
}
