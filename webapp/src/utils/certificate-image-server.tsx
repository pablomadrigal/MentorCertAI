import { Certificate } from "@/types/certificate"
import { ImageResponse } from '@vercel/og'

export const generateCertificateBase64Server = async (certificate: Certificate, userName: string, transactionHash?: string): Promise<string> => {
    try {
        const response = new ImageResponse(
            <div style={{
                width: '760px',
                margin: '0 auto',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 32px rgba(30,41,59,0.08)',
                padding: '48px 56px',
                fontFamily: "'Segoe UI', Arial, sans-serif",
                color: '#1e293b',
                position: 'relative',
                border: '2px solid #7B61FF'
            }}>
                <div style={{
                    borderTop: '8px solid #38bdf8',
                    borderRadius: '8px 8px 0 0',
                    width: '100%',
                    marginBottom: '32px'
                }} />
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '38px',
                    letterSpacing: '2px',
                    fontWeight: '700',
                    color: '#2A1A67',
                    marginBottom: '0'
                }}>CERTIFICATE</h1>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: '500',
                    color: '#3DDC97',
                    margin: '0 0 8px 0',
                    letterSpacing: '1px'
                }}>OF COMPLETION</h2>
                <p style={{
                    textAlign: 'center',
                    fontSize: '16px',
                    color: '#475569',
                    marginBottom: '32px'
                }}>This certificate is presented to</p>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '16px'
                }}>
                    <span style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#7B61FF',
                        fontFamily: "'Brush Script MT', cursive, Arial",
                        borderBottom: '2px solid #7B61FF',
                        padding: '10px 30px'
                    }}>{userName}</span>
                </div>
                <div style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    color: '#475569',
                    marginBottom: '24px'
                }}>
                    has successfully completed the <span style={{ color: '#2A1A67', fontWeight: '600' }}>{certificate.theme}</span> course<br />
                    with a grade of <span style={{ color: '#2AB77A', fontWeight: 'bold' }}>{certificate.score}</span>
                </div>
                <div style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#64748b',
                    marginBottom: '32px',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    This certificate is issued by MentorCertAI to recognize outstanding achievement and commitment to learning.
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: '48px'
                }}>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>Date Issued</div>
                        <div style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#1e293b',
                            borderBottom: '1px solid #cbd5e1',
                            width: '120px',
                            paddingBottom: '10px'
                        }}>{new Date(certificate.date).toLocaleDateString()}</div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }} />
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>Certificate ID</div>
                        <div style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#1e293b',
                            borderBottom: '1px solid #cbd5e1',
                            width: '120px',
                            paddingBottom: '10px'
                        }}>{certificate.id}</div>
                    </div>
                </div>
                {transactionHash && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: '40px'
                    }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ fontSize: '14px', color: '#64748b' }}>Transaction Hash</div>
                            <div style={{
                                fontSize: '13px',
                                color: '#475569',
                                borderBottom: '1px solid #cbd5e1',
                                width: '260px',
                                margin: '0 auto',
                                wordBreak: 'break-all'
                            }}>{transactionHash}</div>
                        </div>
                    </div>
                )}
                <div style={{
                    borderBottom: '8px solid #3DDC97',
                    borderRadius: '0 0 8px 8px',
                    width: '100%',
                    marginTop: '40px'
                }} />
            </div>,
            {
                width: 760,
                height: 600,
            }
        )

        const buffer = await response.arrayBuffer()
        return `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
    } catch (error) {
        console.error('Error generating certificate:', error)
        throw error
    }
} 