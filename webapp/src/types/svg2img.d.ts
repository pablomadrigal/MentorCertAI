declare module 'svg2img' {
    interface Svg2imgOptions {
        format: 'png' | 'jpg' | 'jpeg';
        quality: number;
    }

    function svg2img(
        svg: string,
        options: Svg2imgOptions,
        callback: (error: Error | null, buffer: Buffer) => void
    ): void;

    export = svg2img;
} 