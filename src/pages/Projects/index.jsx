import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import ScrollToTop from '../../components/ScrollToTop'
import CookieAccept from '../../components/CookieAccept'

import { isMobile } from '../../utils/functions/isMobile'

import Navbar from './Navbar'
import Contents from './Contents/index'

import './style.css'

export default function Projects() {
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        let count = 0
        const array = []
        const db = getFirestore()
        const storage = getStorage();

        getDocs(collection(db, "Projects"))
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const id = doc.id
                    const data = doc.data()
                    const background = data.image.background
                    const button = data.button
                    const description = data.description
                    const established = data.established
                    const icon = data.image.icon
                    const link = data.link
                    const isNew = data.new
                    const status = data.status
                    const tab = data.tab
                    const tag = data.tag
                    const title = data.title
                    const type = data.type

                    getDownloadURL(ref(storage, icon.path)).then(url => {
                        const xhr = new XMLHttpRequest();

                        xhr.responseType = 'blob'
                        xhr.open('GET', url)
                        xhr.send()

                        array.push({
                            id: id,
                            background: background,
                            button: button,
                            description: description,
                            established: established,
                            icon: url,
                            link: link,
                            new: isNew,
                            status: status,
                            tab: tab,
                            tag: tag,
                            title: title,
                            type: type
                        })

                        ++count

                        if (count === querySnapshot.size) {
                            setData(array)
                            setLoaded(true)
                            return
                        }
                    })
                })
            })
    }, [data])

    document.title = 'โครงการ | Maseshi'

    const url = new URL(window.location)
    const projectParam = url.searchParams.get('project')
    const tabParam = url.searchParams.get('tab')
    const parameter = {
        project: projectParam,
        tab: tabParam
    }

    return (
        <section className="projects">
            {
                isMobile() ? (
                    <button className="projects-navbar-button navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProjectsNavbar" aria-controls="offcanvasProjectsNavbar">
                        <i className="bi bi-three-dots-vertical"></i>
                    </button>
                ) : ''
            }
            <div className="row">
                <div className={isMobile() ? "col-md-3" : "col-md-3 pe-0"}>
                    <div className="container">
                        <Navbar data={data} loaded={loaded} parameter={parameter} />
                    </div>
                </div>
                <div className={isMobile() ? "col-md-9" : "col-md-9 ps-0"}>
                    <div className={isMobile() ? "container" : "container ps-0"}>
                        <Contents data={data} loaded={loaded} parameter={parameter} />
                    </div>
                </div>
            </div>
            <CookieAccept />
            <ScrollToTop />
        </section>
    )
}
