import Waves from '../../components/Waves/index'

import { translator } from '../../utils/functions/translator'

import googleCloudRectangle from '../../assets/images/google-cloud-rectangle.svg'
import firebaseRectangle from '../../assets/images/firebase-rectangle.svg'
import reactRectangle from '../../assets/images/react-js-rectangle.svg'
import bootstrapRectangle from '../../assets/images/bootstrap-rectangle.svg'

export default function Powered() {
    const Rectangle = ({ src, width, height, alt }) => {
        return (
            <div className="col align-self-center align-items-center">
                <img className="home-powered-icon" src={src} width={width} height={height} alt={alt} />
            </div>
        )
    }

    return (
        <>
            <Waves position={'top'} r={240} g={240} b={250} />
            <section className="home-powered" id="powered">
                <div className="container">
                    <div className="home-powered-title">
                        <div className="container text-secondary text-center">
                            <small>
                                POWERED
                            </small>
                            <h1>
                                {translator().translate.pages.Home.Powered.powered_by}
                            </h1>
                        </div>
                    </div>
                    <br />
                    <div className="home-powered-content text-center">
                        <div className="row row-cols-1 row-cols-md-3 g-5 justify-content-center">
                            <Rectangle src={googleCloudRectangle} width="100%" height="100%" alt="Google Cloud Rectangle" />
                            <Rectangle src={firebaseRectangle} width="100%" height="100%" alt="Firebase Rectangle" />
                            <Rectangle src={reactRectangle} width="100%" height="100%" alt="React js Rectangle" />
                            <Rectangle src={bootstrapRectangle} width="100%" height="100px" alt="Bootstrap Rectangle" />
                        </div>
                    </div>
                </div>
            </section>
            <Waves position={'bottom'} r={240} g={240} b={250} />
        </>
    )
}
