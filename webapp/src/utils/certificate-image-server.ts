import { Certificate } from "@/types/certificate"
import sharp from 'sharp'

export const generateCertificateBase64Server = async (certificate: Certificate, userName: string, transactionHash?: string) => {
  // Create a simple SVG with the certificate content
  const svgContent = `
    <svg width="760" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="760" height="600" fill="white"/>
      <rect x="0" y="0" width="760" height="8" fill="#38bdf8"/>
      <rect x="0" y="592" width="760" height="8" fill="#3DDC97"/>
      
      <text x="380" y="50" font-size="24" text-anchor="middle" fill="#2A1A67">CERTIFICATE</text>
      <text x="380" y="80" font-size="16" text-anchor="middle" fill="#3DDC97">OF COMPLETION</text>
      <text x="380" y="120" font-size="14" text-anchor="middle" fill="#475569">This certificate is presented to</text>
      <text x="380" y="160" font-size="20" text-anchor="middle" fill="#7B61FF">${userName}</text>
      <text x="380" y="200" font-size="14" text-anchor="middle" fill="#475569">
        has successfully completed the <tspan fill="#2A1A67">${certificate.theme}</tspan> course
      </text>
      <text x="380" y="230" font-size="14" text-anchor="middle" fill="#475569">
        with a grade of <tspan fill="#2AB77A">${certificate.score}%</tspan>
      </text>
      <text x="380" y="280" font-size="12" text-anchor="middle" fill="#64748b">
        This certificate is issued by MentorCertAI to recognize outstanding achievement
      </text>
      <text x="380" y="300" font-size="12" text-anchor="middle" fill="#64748b">
        and commitment to learning.
      </text>
      <text x="380" y="350" font-size="12" text-anchor="middle" fill="#64748b">
        Date Issued: ${new Date(certificate.date).toLocaleDateString()}
      </text>
      ${transactionHash ? `
        <text x="380" y="380" font-size="12" text-anchor="middle" fill="#64748b">
          Transaction Hash: ${transactionHash}
        </text>
      ` : ''}
    </svg>
  `;

  console.log("svgContent", svgContent);

  try {
    // Convert SVG to PNG using sharp
    const imageBuffer = await sharp(Buffer.from(svgContent))
      .resize(760, 600)
      .png()
      .toBuffer();

    // Compress image
    const compressedBuffer = await sharp(imageBuffer)
      .png({ quality: 60, compressionLevel: 8 })
      .toBuffer();

    return `data:image/png;base64,${compressedBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw error;
  }
} 