import { Certificate } from "@/types/certificate"
import nodeHtmlToImage from 'node-html-to-image'
import { generateCertificateHTML } from "./certificate";
import sharp from 'sharp'


export const generateCertificateBase64Server = async (certificate: Certificate, userName: string, transactionHash?: string) => {
  const html = generateCertificateHTML(certificate, userName, transactionHash);

  const imageBuffer = await nodeHtmlToImage({
    html,
    type: 'png',
    quality: 100,
    puppeteerArgs: {
      args: ['--no-sandbox']
    }
  });

  // Compress image
  const compressedBuffer = await sharp(imageBuffer)
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();

  return `data:image/png;base64,${compressedBuffer.toString('base64')}`;
} 