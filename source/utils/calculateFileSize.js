export const calculateFileSize = (bytes, size = false, dp = 1) => {
    const thresh = size ? 1000 : 1024

    if (Math.abs(bytes) < thresh) return bytes + ' B'

    let unit = -1
    const units = size ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    const r = (10 ** dp)

    do {
        bytes /= thresh
        ++unit
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && unit < units.length - 1)

    return `${bytes.toFixed(dp)} ${units[unit]}`
}