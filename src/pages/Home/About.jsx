export default function About() {
    function getAge(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        const m = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();
        
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    }

    return (
        <>
            <div className="wave home-wave-top">
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255, 255, 255, 0.7)" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255, 255, 255, 0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255, 255, 255, 0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255, 255, 255, 1)" />
                    </g>
                </svg>
            </div>
            <section className="home-about" id="about">
                <div className="container">
                    <div className="home-about-title">
                        <div className="container text-center">
                            <small>แนะนำตัว</small>
                            <h2><i className="bi bi-card-heading"></i> เกี่ยวกับผม</h2>
                            <p>อยากรู้จัก Maseshi ให้มากขึ้น ข้อมูลเหล่านี้อาจช่วยคุณได้</p>
                        </div>
                    </div>
                    <br />
                    <div className="home-about-content">
                        <div className="row">
                            <div className="col-md-6 mb-3 text-center">
                                <img className="home-about-image" src={require('../../assets/images/about-header.webp')} width="400px" height="100%" alt="" />
                            </div>
                            <div className="col-md-6 home-about-content">
                                <h2>ข้อมูลส่วนตัว</h2>
                                <p>ข้อมูลส่วนตัวเกี่ยวกับผมโดยคราวๆ </p>
                                <br />
                                <div className="row">
                                    <p className="col text-center">
                                        ชื่อเล่น
                                    </p>
                                    <p className="col text-center">
                                        ฟลุ๊ค
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="col text-center">
                                        นามแฝง
                                    </p>
                                    <p className="col text-center">
                                        Maseshi (มาเซชิ)
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="col text-center">
                                        วันเกิด
                                    </p>
                                    <p className="col text-center">
                                        12 มกราคม 2548 ({ getAge("2005/01/12") } ปี)
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="col text-center">
                                        งานอดิเรก
                                    </p>
                                    <p className="col text-center">
                                        เขียนโปรแกรม
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <h2>ทำไมถึงเข้าวงการนี้?</h2>
                                <p>สิ่งที่ดึงดูดให้ผมเข้าสู่วงการนี้มาจากความอยากรู้อยากเห็นของผมเองครับ อยากรู้ว่าภายในคอมพิวเตอร์มันทำงานยังไง เริ่มจากตรงไหน มีที่มายังไง ผมคิดจนกระทั่งอยากศึกษาในด้านของศาสตร์คอมพิวเตอร์มาเรื่อยๆ จนทำให้ผมสนใจมันเป็นพิเศษและทำให้เกิดโครงการหลายอย่างที่เห็นกันในตอนนี้</p>
                            </div>
                            <div className="col-md-6">
                                <h2>กว่าจะมาถึงจุดนี้ ยากหรือเปล่า?</h2>
                                <p>ผมคิดว่ามันไม่ยากนะ เพียงแค่ต้องใช้ความทุ่มเทกับมันเล็กน้อยและไม่ท้อแท้ง่ายก็ทำได้แล้ว แต่การที่จะเริ่มต้นนั้นมันยากเสมอครับ เพราะคงไม่มีใครที่สามารถเกิดมาแล้วเขียนโค้ดเป็นทันทีได้หรอกครับ เพราะฉะนั้นถ้าเราสนใจจริงละก็..ผมแนะนำให้เริ่มจากวันนี้เลยครับ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
