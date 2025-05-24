declare module 'svg-to-png' {
    interface SvgToPngOptions {
        width: number;
        height: number;
        quality: number;
    }

    export function svgToPng(svg: string, options: SvgToPngOptions): Promise<Buffer>;
} 