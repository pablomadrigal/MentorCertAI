import Link from "next/link"
import { Logo } from "../atoms/Logo"

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-lighter">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo size="small" className="mb-4" />
            <p className="text-text-secondary">AI-powered mentoring with blockchain certification.</p>
          </div>

          <div>
            <h4 className="text-md font-bold mb-4 text-text-primary">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-secondary-main transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-text-secondary hover:text-secondary-main transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-bold mb-4 text-text-primary">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-secondary-main transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-text-secondary hover:text-secondary-main transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-bold mb-4 text-text-primary">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-secondary-main transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-secondary-main transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-lighter">
          <p className="text-center text-text-secondary">
            &copy; {new Date().getFullYear()} MentorCertAi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
