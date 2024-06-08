export const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    }

    for (const [intervalName, intervalSeconds] of Object.entries(intervals)) {
        const intervalValue = Math.floor(seconds / intervalSeconds)

        if (intervalValue >= 1) return `${intervalValue} ${intervalName}${intervalValue > 1 ? 's' : ''}`
    }

    return `${seconds} seconds`;
}