import React, { Component } from 'react'

export default class Welcome extends Component {
    render() {
        return (
            <div className="tos-welcome">
                <div className="container">
                    <h1>นโยบายความเป็นส่วนตัว</h1>
                    <p>นโยบายความเป็นส่วนตัวนี้มีไว้เพื่อช่วยให้คุณทราบประเภทข้อมูลที่เรารวบรวม เหตุผลที่เรารวบรวม รวมถึงวิธีที่คุณจะอัปเดต จัดการ ส่งออก และลบข้อมูลดังกล่าว</p>
                    <hr />
                    <small>แกไขข้อมูลล่าสุดเมื่อ 10 มกราคม 2564 | มีผลในวันที่ 1 กุมภาพันธ์ 2564</small>
                </div>
            </div>
        )
    }
}
