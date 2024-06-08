import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Image } from 'react-bootstrap'

import buyMeCoffeeLogo from '@/assets/icons/buy-me-a-coffee.webp'
import trueMoneyLogo from '@/assets/icons/true-money.webp'
import patreonLogo from '@/assets/icons/patreon.webp'
import qrCodeTrueMoney from '@/assets/images/qrcode-true-money.webp'

import Dialog from '@/components/Dialog'

import styles from '@/styles/Home.module.css'

export default function DialogSupport(props) {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Home.components.DialogSupport' })
    const [show, setShow] = useState(false)

    const handleToggle = () => setShow(!show)

    return (
        <>
            <Dialog
                {...props}
                centered
                id="dialogDonateMaseshi"
                title={t('support_method')}
            >
                <div className="d-grid gap-2">
                    <Button className={styles['funding-bmc'] + " w-100"} variant="warning" size="lg" href="https://www.buymeacoffee.com/maseshi" target="_blank">
                        <Image src={buyMeCoffeeLogo} width="30px" height="30px" alt="But Me a Coffee" />
                        {' '}
                        {t('buy_me_coffee')}
                    </Button>
                    <Button className="w-100" variant="warning" size="lg" onClick={handleToggle}>
                        <Image src={trueMoneyLogo} width="30px" height="30px" alt="True Money" />
                        {' '}
                        True Money
                    </Button>
                    <Button className="w-100" variant="danger" size="lg" href="https://www.patreon.com/maseshi" target="_blank">
                        <Image src={patreonLogo} width="30px" height="30px" alt="Patreon" />
                        {' '}
                        Patreon
                    </Button>
                </div>
                <br />
                <p className="text-center m-0">
                    {t('support_modal_description')}
                    <br />
                    {t('support_modal_thank_you')}
                </p>
            </Dialog>
            <Dialog
                centered
                show={show}
                scrollable
                onHide={handleToggle}
                id="dialogDonateTrueMoneyMaseshi"
                title={t('support_through_true_money')}
            >
                <img src={qrCodeTrueMoney} width="100%" height="100%" alt="Donate Maseshi" />
            </Dialog>
        </>
    )
}
