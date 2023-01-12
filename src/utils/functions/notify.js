export const notify = (icon, title, description, buttonName, buttonLink) => {
    const list = JSON.parse(localStorage.getItem('notification'))
    const data = {
        icon: icon,
        title: title,
        description: description,
        when: new Date(),
        button: {
            name: buttonName,
            link: buttonLink
        }
    }
    const json = JSON.stringify(list.concat(data))

    localStorage.setItem('notification', json)
    window.dispatchEvent(new Event('storage'))
}