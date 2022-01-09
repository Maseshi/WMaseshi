export default function Profile(props) {
    const currentUser = props.currentUser

    return (
        <div className="account-profile">
            {
                currentUser ? currentUser.photoURL ? (
                    <img src={ currentUser.photoURL } alt="" width="100px" height="100px" />
                ) : (
                    <i className="bi bi-person-circle"></i>
                ) : <i className="bi bi-person-circle"></i>
            }
            <h3>{ currentUser ? currentUser.displayName || "ผู้ใช้" : "ผู้ใช้" }</h3>
            <small>{ currentUser ? currentUser.email || "example@domain.com" : "example@domain.com" }</small>
        </div>
    )
}