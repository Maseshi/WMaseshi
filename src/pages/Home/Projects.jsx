import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { getFirestore, getDocs, collection, query, limit } from 'firebase/firestore'

import { translator } from '../../utils/functions/translator'

export default function Projects() {
    const [list, setList] = useState([])

    useEffect(() => {
        const database = getFirestore()
        const storage = getStorage()

        getDocs(query(collection(database, 'Projects'), limit(4))).then((querySnapshot) => {
            let url = '', count = 0
            const array = []

            querySnapshot.forEach(async doc => {
                const id = doc.id
                const data = doc.data()
                const icon = data.image.icon || ''
                const type = data.type || "Unknown"
                const title = data.title || "Unknown"
                const established = data.established || "Unknown"
                let description = data.description || "Unknown"

                if (icon) url = await getDownloadURL(ref(storage, icon.path))

                const date = new Date(established * 1000)
                const months = [
                    translator().translate.pages.Home.Projects.january,
                    translator().translate.pages.Home.Projects.february,
                    translator().translate.pages.Home.Projects.march,
                    translator().translate.pages.Home.Projects.april,
                    translator().translate.pages.Home.Projects.may,
                    translator().translate.pages.Home.Projects.june,
                    translator().translate.pages.Home.Projects.july,
                    translator().translate.pages.Home.Projects.august,
                    translator().translate.pages.Home.Projects.september,
                    translator().translate.pages.Home.Projects.october,
                    translator().translate.pages.Home.Projects.november,
                    translator().translate.pages.Home.Projects.december
                ]
                const day = date.getUTCDate()
                const month = months[date.getUTCMonth()]
                const year = date.getFullYear() + 543
                const createAt = day + " " + month + " " + year

                if (description.length >= 60) description = description.substring(0, 60) + "..."

                array.push({
                    id: id,
                    icon: url,
                    title: title,
                    type: type,
                    create: createAt,
                    description: description
                })

                ++count

                if (count === querySnapshot.size) setList(array)
            })
        })
    }, [])

    return (
        <section className="home-projects" id="projects">
            <div className="container">
                <div className="home-projects-title-content">
                    <div className="text-center">
                        <small>{translator().translate.pages.Home.Projects.projects}</small>
                        <h2>
                            <i className="bi bi-box-seam"></i> {translator().translate.pages.Home.Projects.all_projects}
                        </h2>
                        <p>
                            {translator().translate.pages.Home.Projects.all_projects_subject}
                        </p>
                    </div>
                </div>
                <br />
                <div className="home-projects-data-content">
                    <div className="row row-cols-1 row-cols-md-4 g-3">
                        {
                            list <= 0 ? (
                                Array.from({ length: 4 }, (__, index) => {
                                    return (
                                        <div className="col mb-3" key={index}>
                                            <div className="home-card card" aria-hidden="true">
                                                <div className="card-img-top" alt="" width="100%" height="100%">
                                                    <span className="placeholder" style={{ width: '100%', height: '200px' }}></span>
                                                </div>
                                                <div className="card-body">
                                                    <small className="card-subtitle placeholder-glow">
                                                        <span className="placeholder col-2"></span>
                                                    </small>
                                                    <h4 className="card-title placeholder-glow">
                                                        <span className="placeholder col-6"></span>
                                                    </h4>
                                                    <p className="card-text placeholder-glow">
                                                        <span className="placeholder col-7"></span>
                                                        <span className="placeholder col-4"></span>
                                                        <span className="placeholder col-4"></span>
                                                        <span className="placeholder col-6"></span>
                                                        <span className="placeholder col-8"></span>
                                                    </p>
                                                    <p className="card-text placeholder-glow">
                                                        <span className="placeholder col-7"></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                list.map((data, index) => {
                                    return (
                                        <div className="col" key={index}>
                                            <Link className="home-card-link" to={'./projects?id=' + data.id}>
                                                <div className="home-card card">
                                                    {
                                                        data.icon ? (
                                                            <img src={data.icon} className="card-img-top" alt={data.title.toLowerCase()} width="100%" height="200px" />
                                                        ) : (
                                                            <i className="bi bi-archive"></i>
                                                        )
                                                    }
                                                    <div className="card-body p-4">
                                                        <small className="card-subtitle text-muted">{data.type}</small>
                                                        <h4 className="card-title mt-3">{data.title}</h4>
                                                        <p className="card-text">{data.description}</p>
                                                        <p className="card-text">
                                                            <strong>{translator().translate.pages.Home.Projects.created_on}:</strong> {data.create}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                    <br />
                    <div className="d-grid gap-2 me-2">
                        <a className="home-btn btn btn-dark btn-lg" href="https://github.com/Maseshi" target="_blank" rel="noreferrer noopener">
                            <i className="bi bi-github"></i> Maseshi
                        </a>
                        <Link className="home-btn btn btn-outline-dark btn-lg" to="./projects">
                            {translator().translate.pages.Home.Projects.explore_more_projects}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
