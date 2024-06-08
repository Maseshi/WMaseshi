const eraseCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999;`
}
const getCookie = (name) => {
    const key = `${name}=`
    const cookies = document.cookie.split(';').map(cookie => cookie.trim())

    for (const cookie of cookies) {
        if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length)
        }
    }

    return null
}
const setCookie = (name, value, days) => {
    let expires = ''

    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = `; expires=${date.toUTCString()}`
    }

    document.cookie = `${name}=${value || ''}${expires}; path=/`
}

export { eraseCookie, getCookie, setCookie }