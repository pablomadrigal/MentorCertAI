"use client"

interface CertificateImageProps {
  studentName: string
  score: number
  certificateId: number
  issueDate: string
}

export function CertificateImage({ studentName, score, certificateId, issueDate }: CertificateImageProps) {
  return (
    <div className="bg-white p-8 rounded-[7px] text-slate-800 relative overflow-hidden">
      {/* Elementos decorativos de fondo con mayor opacidad */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent-main/20 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary-main/15 rounded-full -ml-20 -mb-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-light/15 rounded-full"></div>

      {/* Elementos decorativos adicionales para más detalle */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-secondary-main/10 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent-main/10 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-primary-light/10 rounded-full"></div>

      <div className="border-8 border-accent-main/20 p-8 rounded-lg bg-white shadow-inner relative overflow-hidden z-10">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-light via-secondary-main to-accent-main"></div>
        <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-r from-accent-main via-secondary-main to-primary-light"></div>

        {/* Patrones decorativos en las esquinas */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-secondary-main/30 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-accent-main/30 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary-light/30 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-secondary-main/30 rounded-br-lg"></div>

        <div className="text-center relative z-10">
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-2 text-slate-900">Certificate of Completion</h3>
            <div className="w-32 h-1 bg-gradient-to-r from-secondary-main to-accent-main mx-auto"></div>
          </div>

          <p className="text-lg mb-8 text-slate-700">This certifies that</p>
          <p className="text-2xl font-bold mb-8 text-secondary-dark">{studentName}</p>
          <p className="text-lg mb-8 text-slate-700">
            has successfully completed the mentoring session and passed the certification exam with a score of{" "}
            <span className="text-accent-dark font-bold">{score}%</span>.
          </p>

          <div className="flex justify-between items-center mt-12">
            <div className="text-left">
              <p className="text-sm text-slate-600">Date Issued:</p>
              <p className="text-md font-medium text-slate-800">{issueDate}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-secondary-main/20 flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-secondary-main"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <p className="text-xs text-slate-600">Verified</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-600">Certificate ID:</p>
              <p className="text-md font-medium text-slate-800">{certificateId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
