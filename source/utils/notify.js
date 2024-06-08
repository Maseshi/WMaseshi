export const notify = (icon, title, description, when, buttonName, buttonLink) => {    
    const notification = localStorage.getItem('notification')

    if (!notification) localStorage.setItem('notification', '[]')

    const data = {
        show: false,
        icon: icon ?? `${import.meta.env.PUBLIC_URL}/icon.svg`,
        title: title ?? '',
        description: description ?? '',
        when: when ?? new Date(),
        button: {
            name: buttonName ?? '',
            link: buttonLink ?? ''
        }
    }
    const list = JSON.parse(notification)
    const json = JSON.stringify(list.concat(data))

    localStorage.setItem('notification', json)
    window.dispatchEvent(new Event('storage'))
}