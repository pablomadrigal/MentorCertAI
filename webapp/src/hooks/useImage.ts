import { useMemo } from 'react'
import { getImageUrl, isBase64Image } from '@/utils/image'

interface UseImageProps {
    src: string | undefined
    alt?: string
}

export const useImage = ({ src, alt = 'Image' }: UseImageProps) => {
    const imageProps = useMemo(() => {
        const url = getImageUrl(src)
        const isBase64 = isBase64Image(src)

        return {
            url,
            isBase64,
            alt
        }
    }, [src, alt])

    return imageProps
} 