import { Header } from "../../components/organisms/Header"
import { Footer } from "../../components/organisms/Footer"
import { LoginForm } from "../../components/organisms/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
