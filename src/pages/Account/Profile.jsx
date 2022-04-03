export default function Profile(props) {
    const userData = props.userData

    return (
        <div className="account-profile mb-3">
            {
                userData ? userData.user.photoURL ? (
                    <img src={ userData.user.photoURL } alt="" width="100px" height="100px" />
                ) : (
                    <i className="bi bi-person-circle"></i>
                ) : <i className="bi bi-person-circle"></i>
            }
            <h3>{ userData ? userData.user.displayName || "ผู้ใช้" : "ผู้ใช้" }</h3>
            <small>{ userData ? userData.user.email || "example@domain.com" : "example@domain.com" }</small>
        </div>
    )
}