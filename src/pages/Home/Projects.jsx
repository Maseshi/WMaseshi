import { useState, useEffect } from 'react';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

export default function Projects() {
    const [list, setList] = useState([])
    
    const limit = 4

    useEffect(() => {
        const getData = async () => {
            const array = [];
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, 'Projects'));

            querySnapshot.forEach(doc => {
                if (array.length >= limit) return;

                const id = doc.id
                const data = doc.data();
                let isNew = data.new || false;
                const type = data.type || "Unknown";
                const title = data.title || "Unknown";
                const established = data.established || "Unknown";
                let description = data.description || "Unknown";

                const date = new Date(established * 1000);
                const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
                const day = date.getUTCDate();
                const month = months[date.getUTCMonth()];
                const year = date.getFullYear() + 543;
                const createAt = day + " " + month + " " + year;

                if (description.length >= 60) description = description.substring(0, 60) + "...";

                array.push({
                    id: id,
                    title: title,
                    isNew: isNew,
                    type: type,
                    create: createAt,
                    description: description
                });
            });

            setList(array)
        }
        getData()
    }, [limit])

    let data
    const listProps = list

    if (listProps <= 0) {
        const loading = [];

        for (let i = 0; i < limit; i++) {
            loading.push(
                <div className="col-md-3 mb-3" key={i}>
                    <div className="home-card card" aria-hidden="true">
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                        </div>
                        <div className="card-footer placeholder-glow">
                            <span className="placeholder col-7"></span>
                        </div>
                    </div>
                </div>
            )
        }
        data = loading
    } else {
        data = listProps.map((data, index) => {
            return (
                <div className="col-md-3 mb-3" key={index}>
                    <a className="home-card-link" href={'./projects?project=' + data.id}>
                        <div className="home-card card">
                            <div className="card-body">
                                <h5 className="card-title">{data.title} <span className="badge bg-secondary" hidden={!data.isNew}>ใหม่</span></h5>
                                <h6 className="card-subtitle mb-2 text-muted">{data.type}</h6>
                                <p className="card-text">{data.description}</p>
                            </div>
                            <div className="card-footer">
                                <span>สร้างเมื่อ: {data.create}</span>
                            </div>
                        </div>
                    </a>
                </div>
            )
        })
    }

    return (
        <section className="home-projects" id="projects">
            <div className="container">
                <div className="home-projects-title-content">
                    <div className="text-center">
                        <small>โปรแจ๊ค</small>
                        <h2><i className="bi bi-box-seam"></i> โครงการทั้งหมด</h2>
                        <p>สำรวจโครงการที่ได้รับการสร้าง, พัฒนา, ดูแลและออกแบบโดย Maseshi ทั้งหมด</p>
                    </div>
                </div>
                <br />
                <div className="home-projects-data-content">
                    <div className="row">
                        {data}
                    </div>
                    <div className="d-grid gap-2 me-2">
                        <a className="home-btn btn btn-dark btn-lg" href="https://github.com/Maseshi" target="_blank" rel="noreferrer"><i className="bi bi-github"></i> Maseshi</a>
                        <a className="home-btn btn btn-outline-dark btn-lg" href="./projects">สำรวจโครงการเพิ่มเติม</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
