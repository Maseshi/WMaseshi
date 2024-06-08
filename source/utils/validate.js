const validateURL = (string) => {
    const pattern = new RegExp(
        '^' + // Start of the line
        '(https?:\\/\\/)?' + // Protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
        '(\\#[-a-z\\d_]*)?' + // Fragment locator
        '$', // End of the line.
        'i'
    )

    return !!pattern.test(string)
}
const validateEmail = (string) => {
    const pattern = new RegExp(
        '^' + // Start of the string.
        '[a-zA-Z0-9._%+-]+' + // One or more characters from the set of letters (both uppercase and lowercase), digits, dots, underscores, percent signs, plus signs, and hyphens.
        '@' + // The literal "@" symbol.
        '[a-zA-Z0-9.-]+' + // One or more characters from the set of letters (both uppercase and lowercase), digits, dots, and hyphens.
        '\\.' + // The literal dot (period) character. It needs to be escaped with a backslash because dot is a special character in regex.
        '[a-zA-Z]{2,}' + // Two or more characters from the set of letters (both uppercase and lowercase).
        '$', // End of the string.
        'i'
    )

    return !!pattern.test(string)
}
const validatePassword = (string) => {
    const pattern = new RegExp(
        '^' + // Start of the line
        '(?=.*[a-z])' + // Positive lookahead assertion for at least one lowercase letter.
        '(?=.*[A-Z])' + // Positive lookahead assertion for at least one uppercase letter.
        '(?=.*\\d)' + // Positive lookahead assertion for at least one digit.
        '(?=.*[^a-zA-Z\\d])' + // Positive lookahead assertion for at least one character that is not a letter or a digit.
        '[\\S]{8,}' + // Match at least 8 non-whitespace characters. This will include letters, digits, and special characters.
        '$', // End of the line.
        'i'
    )

    return !!pattern.test(string)
}
const validateImage = (string) => {
    const pattern = new RegExp(/\.(apng|avif|gif|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp|bmp|ico|cur|tif|tiff)$/i)

    return !!pattern.test(string)
}
const validateAudio = (string) => {
    const pattern = new RegExp(/\.(3gp|aa|aac|aax|act|aiff|alac|amr|ape|au|awb|dss|dvf|flac|gsm|iklax|ivs|m4a|m4b|m4p|mmf|mp3|mpc|msv|nmf|ogg|oga|mogg|opus|ra|rm|raw|rt64|sln|tta|voc|vox|wav|wma|wv|webm|8svx|cda)$/i)

    return !!pattern.test(string)
}
const validateMarkdown = (string) => {
    const pattern = new RegExp(/\.(md|markdown|mdown|mkdn|mkd|mdwn|mdtxt|mdtext|mdx)$/i)

    return !!pattern.test(string)
}
const validatePhotoshop = (string) => {
    const pattern = new RegExp(/\.(psd|pdd|psdt)$/i)

    return !!pattern.test(string)
}
const validateFLStudio = (string) => {
    const pattern = new RegExp(/\.(flp)$/i)

    return !!pattern.test(string)
}

export {
    validateURL,
    validateEmail,
    validatePassword,
    validateImage,
    validateAudio,
    validateMarkdown,
    validatePhotoshop,
    validateFLStudio
}
