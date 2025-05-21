import { useEffect } from "react"

interface ParticleAnimationProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  containerRef: React.RefObject<HTMLDivElement>
}

export const useParticleAnimation = ({ canvasRef, containerRef }: ParticleAnimationProps) => {
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Adjust canvas size to container
    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return
      canvas.width = containerRef.current.offsetWidth
      canvas.height = containerRef.current.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      floatAngle: number
      floatSpeed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1.5
        this.baseX = x
        this.baseY = y
        this.density = Math.random() * 25 + 5

        this.floatAngle = Math.random() * Math.PI * 2
        this.floatSpeed = Math.random() * 0.5 + 0.3

        const colors = [
          "rgba(255, 255, 255, 0.7)",
          "rgba(123, 97, 255, 0.7)",
          "rgba(56, 189, 248, 0.7)",
          "rgba(61, 220, 151, 0.7)",
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      }

      update(mouseX: number, mouseY: number) {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance

        const maxDistance = 100
        const force = (maxDistance - distance) / maxDistance

        if (distance < maxDistance) {
          this.x -= forceDirectionX * force * this.density
          this.y -= forceDirectionY * force * this.density
        } else {
          this.floatAngle += 0.06

          const floatX = Math.sin(this.floatAngle) * this.floatSpeed
          const floatY = Math.cos(this.floatAngle * 1.5) * this.floatSpeed

          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 10
          }

          this.x += floatX
          this.y += floatY
        }
      }
    }

    // Initialize particles
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 7000), 200)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.push(new Particle(x, y))
    }

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    window.addEventListener("mousemove", handleMouseMove)

    const connectParticles = () => {
      if (!ctx) return
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - distance / 350})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw()
        particles[i].update(mouseX, mouseY)
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [canvasRef, containerRef])
} 