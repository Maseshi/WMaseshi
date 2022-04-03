export const isMobile = () => {
    let isMobile = false

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) isMobile = true

    return isMobile
}