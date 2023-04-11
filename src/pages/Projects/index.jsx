import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref as dbRef, child, get } from 'firebase/database'
import { Helmet } from 'react-helmet'

import ScrollToTop from '../../components/ScrollToTop'
import CookieAccept from '../../components/CookieAccept'

import Navbar from './Navbar'
import Pages from './Pages/index'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function Projects() {
    const [data, setData] = useState(false)
    const [userData, setUserData] = useState(false)

    const url = new URL(window.location)
    const idParam = url.searchParams.get('id')
    const tabParam = url.searchParams.get('tab')
    const [parameter] = useState({
        id: idParam,
        tab: tabParam
    })

    useEffect(() => {
        const auth = getAuth()
        const db = getFirestore()
        const storage = getStorage()
        const database = getDatabase()

        onSnapshot(collection(db, "Projects"), querySnapshot => {
            let url = '', count = 0
            const queryArray = []

            querySnapshot.forEach(async doc => {
                const id = doc.id
                const document = doc.data()
                const background = document.image.background
                const button = document.button
                const description = document.description
                const established = document.established
                const icon = document.image.icon
                const link = document.link
                const status = document.status
                const tabs = document.tab
                const tags = document.tag
                const title = document.title
                const type = document.type

                if (icon) {
                    url = await getDownloadURL(ref(storage, icon.path))
                    const xhr = new XMLHttpRequest();

                    xhr.responseType = 'blob'
                    xhr.open('GET', url)
                    xhr.send()
                }

                queryArray.push({
                    id: id,
                    background: background,
                    button: button,
                    description: description,
                    established: established,
                    icon: url,
                    iconReference: icon,
                    link: link,
                    status: status,
                    tab: tabs,
                    tag: tags,
                    title: title,
                    type: type
                })

                ++count

                if (count === querySnapshot.size) setData(queryArray)
            })
        })

        onAuthStateChanged(auth, async user => {
            if (user) {
                const uid = user.uid;
                const snapshot = await get(child(dbRef(database, 'projects/maseshi/users'), uid))

                if (snapshot.exists()) {
                    setUserData({
                        auth: user,
                        user: snapshot.val()
                    })
                }
            } else {
                setUserData()
            }
        })
    }, [])

    return (
        <>
            <Helmet>
                <title>{translator().translate.pages.Projects.Projects.website_title}</title>
                <meta name="description" content={translator().translate.pages.Projects.Projects.website_description} />
                <meta name="keywords" content="maseshi, chaiwatsuwannarat, fluke, chaiwat" />
                <meta name="subject" content={translator().translate.pages.Projects.Projects.subject} />
                <meta name="language" content="TH" />
                <meta name="robots" content="index, follow" />
                <meta property="og:site_name" content="Maseshi" />
                <meta property="og:title" content={translator().translate.pages.Projects.Projects.website_title} />
                <meta property="og:description" content={translator().translate.pages.Projects.Projects.website_description} />
                <meta property="og:image" content={process.env.PUBLIC_URL + '/maseshi_banner.jpg'} />
                <meta property="og:url" content="https://maseshi.web.app/projects" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://maseshi.web.app/projects" />
            </Helmet>
            <section className="projects">
                <div className="navbar-expand-lg">
                    <button className="projects-navbar-button navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProjectsNavbar" aria-controls="offcanvasProjectsNavbar">
                        <i className="bi bi-view-list"></i>
                    </button>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Navbar data={data ? data.sort() : ''} userData={userData} parameter={parameter} />
                        </div>
                        <div className="col-md-9">
                            <Pages data={data ? data.sort() : ''} userData={userData} parameter={parameter} />
                        </div>
                    </div>
                </div>
                <CookieAccept />
                <ScrollToTop />
            </section>
        </>
    )
}
