import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center" id="scroll-spy">
                <li className="nav-item">
                    <a className="nav-link" href="/#about">เกี่ยวกับ</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#skills">ความสามารถ</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#projects">โครงการ</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#other">อื่นๆ</a>
                </li>
            </ul>
        )
    }
}
