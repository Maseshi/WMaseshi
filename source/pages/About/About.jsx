import { useTranslation } from 'react-i18next'

import CookieAccept from '@/components/CookieAccept'
import ScrollBack from '@/components/ScrollBack'
import Head from '@/components/Head'

import configs from '@/configs'

import Header from '@/layouts/Header'

export default function About() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.About' })

    return (
        <>
            <Head
                title={'เกี่ยวกับ | {{name}}'}
                description={'อยากรู้จัก Maseshi หรือ Chaiwat Suwannarat ให้มากขึ้นใช่หรือไม่? ข้อมูลส่วนตัวของเขาที่สามารถเผยแพร่ได้ได้รวบรวมไว้อยู่ในที่นี่ที่เดียวแล้ว'}
                subject={'Maseshi คือใคร? ชื่อนี้มาจากไหน? มีผลงานอะไรบ้าง? เขาทำอะไรอยู่ในตอนนี้?'}
            />

            <Header>
                
            </Header>

            <main>
                <section>
                    
                </section>
            </main>

            <CookieAccept />
            <ScrollBack />
        </>
    )
}
