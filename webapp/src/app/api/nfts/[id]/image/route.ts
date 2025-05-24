import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!
);

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: nft_id } = await params;

        if (!nft_id) {
            return new NextResponse('NFT ID required', { status: 400 });
        }

        const { data, error } = await supabase
            .from('certificates')
            .select('image')
            .eq('nft_id', nft_id)
            .single();

        if (error || !data?.image) {
            return new NextResponse('Image not found', { status: 404 });
        }

        // If image is base64, convert it to a buffer and serve it
        if (data.image.startsWith('data:image')) {
            const base64Data = data.image.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            return new NextResponse(buffer, {
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=31536000',
                },
            });
        }

        // If it's a URL, redirect to it
        return NextResponse.redirect(data.image);
    } catch (error) {
        console.error("Error serving NFT image:", error);
        return new NextResponse('Error serving image', { status: 500 });
    }
} 