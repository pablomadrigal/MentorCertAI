declare module '@vercel/og' {
    import { ReactNode } from 'react'

    export interface ImageResponseOptions {
        width?: number
        height?: number
        fonts?: Array<{
            name: string
            data: ArrayBuffer
            weight?: number
            style?: 'normal' | 'italic'
        }>
    }

    export class ImageResponse {
        constructor(element: ReactNode, options?: ImageResponseOptions)
        arrayBuffer(): Promise<ArrayBuffer>
    }
}
