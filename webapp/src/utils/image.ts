export const formatBase64Image = (base64: string | undefined): string => {
    if (!base64) return "/data-science-certificate.png"
    if (base64.startsWith('data:image/')) return base64
    if (base64.startsWith('base64,')) {
        return `data:image/png;base64,${base64.slice(7)}`
    }
    return `data:image/png;base64,${base64}`
}

export const isBase64Image = (url: string | undefined): boolean => {
    if (!url) return false
    return url.startsWith('data:image/') || url.startsWith('base64,')
}

export const getImageUrl = (url: string | undefined): string => {
    if (!url) return "/data-science-certificate.png"
    if (isBase64Image(url)) {
        return formatBase64Image(url)
    }
    return url
} 