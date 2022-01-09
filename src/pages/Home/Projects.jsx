import React, { Component } from 'react';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            limit: 4
        }
        this.getData = this.getData.bind(this)
    }

    getData = async () => {
        const array = [];
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "Projects"));
        querySnapshot.forEach(doc => {
            if (array.length >= this.state.limit) return;

            const data = doc.data();
            let isNew = data.new || false;
            let type = data.type || "Unknown";
            let title = data.title || "Unknown";
            let source = data.tab.sourcecode || "#";
            let established = data.established || "Unknown";
            let description = data.description || "Unknown";

            let date = new Date(established * 1000);
            let months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
            let day = date.getUTCDate();
            let month = months[date.getUTCMonth()];
            let year = date.getFullYear() + 543;

            let create = day + " " + month + " " + year;

            if (description.length >= 60) description = description.substring(0, 60) + " . . .";
            if (isNew) isNew = false;
            if (!isNew) isNew = true;

            array.push({
                "title": title,
                "new": isNew,
                "type": type,
                "source": source,
                "create": create,
                "description": description
            });
        });

        this.setState({
            list: array
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        let list
        const listProps = this.state.list

        if (listProps <= 0) {
            const loading = [];

            for (let i = 0; i < this.state.limit; i++) {
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
                            <div className="card-footer">
                                <span className="placeholder col-7"></span>
                            </div>
                        </div>
                    </div>
                )
            }
            list = loading
        } else {
            list = listProps.map((data, index) => {
                return (
                    <div className="col-md-3 mb-3" key={index}>
                        <a className="home-card-link" href={data.source} target={data.source !== "#" ? "_blank" : "_parent"} rel="noreferrer">
                            <div className="home-card card">
                                <div className="card-body">
                                    <h5 className="card-title">{data.title} <span className="badge bg-secondary" hidden={data.new}>New</span></h5>
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
                            {list}
                        </div>
                        <div className="d-grid gap-2 me-2">
                            <a className="home-btn btn btn-dark btn-lg" href="https://github.com/Maseshi" target="_blank" rel="noreferrer"><i className="bi bi-github"></i> Maseshi</a>
                            <a className="home-btn btn btn-outline-dark btn-lg" href="https://github.com/Maseshi?tab=repositories" target="_blank" rel="noreferrer">สำรวจโครงการเพิ่มเติม</a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
