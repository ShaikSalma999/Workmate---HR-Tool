import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { onboard0, onboard1, onboard2, onboard3 } from '../assets'

const slides = [
  {
    image: onboard0,
    title: 'Welcome to Workmate!',
    text: 'Make Smart Decisions! Set clear timelines for projects and celebrate your achievements!',
  },
  {
    image: onboard1,
    title: 'Manage Stress Effectively',
    text: 'Stay Balanced! Track your workload and maintain a healthy stress level with ease.',
  },
  {
    image: onboard2,
    title: 'Plan for Success',
    text: 'Your Journey Starts Here! Earn achievement badges as you conquer your tasks. Let’s get started!',
  },
  {
    image: onboard3,
    title: 'Navigate Your Work Journey Efficient & Easy',
    text: 'Increase your work management & career development radically',
  },
]

const AUTO_SLIDE_MS = 3000
const SLIDE_MS = 700
const total = slides.length

const panels = [...slides, slides[0]]

export default function Onboarding() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0) 
  const [animate, setAnimate] = useState(true)
  const [auto, setAuto] = useState(true)
  const touchStart = useRef(null)

  const current = index % total
  const isLast = current === total - 1

  const snapToStart = () => {
    setAnimate(false)
    setIndex(0)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
  }

  useEffect(() => {
    if (!auto || index === total) return undefined
    const timer = setTimeout(() => setIndex((i) => i + 1), AUTO_SLIDE_MS)
    return () => clearTimeout(timer)
  }, [index, auto])

  const takeControl = () => {
    if (!auto) return
    setAuto(false)
    if (index === total) snapToStart()
  }

  const go = (next) => setIndex(Math.min(total - 1, Math.max(0, next)))

  const onTransitionEnd = (e) => {
    if (e.target === e.currentTarget && e.propertyName === 'transform' && index === total) snapToStart()
  }

  const onTouchEnd = (e) => {
    if (touchStart.current == null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1))
  }

  return (
    <div
      data-slide={current}
      data-auto={auto}
      className="no-scrollbar h-full overflow-y-auto bg-white"
      onPointerDown={takeControl}
      onKeyDown={takeControl}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex min-h-full flex-col">
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {panels.map((slide, i) => (
              <section key={i} aria-hidden={i !== index} className="w-full shrink-0">
                <div className="aspect-[390/520] w-full overflow-hidden">
                  <img src={slide.image} alt="" className="h-full w-full animate-float object-cover object-top" />
                </div>
                <div className="flex min-h-[116px] flex-col px-8 text-center">
                  <h1 className="text-headline-sm font-semibold text-ink">{slide.title}</h1>
                  <p className="mt-2 text-body-md text-gray-600">{slide.text}</p>
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex h-6 items-center justify-center gap-1">
            {!isLast &&
              slides.slice(0, -1).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-purple-500' : 'w-5 bg-purple-100'}`}
                />
              ))}
          </div>

          <div className="space-y-3 px-[30px] pb-10 pt-3">
            {isLast ? (
              <>
                <Button onClick={() => navigate('/sign-in')}>Sign In</Button>
                <Button variant="outline" onClick={() => navigate('/sign-up')}>
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => go(current + 1)}>Next</Button>
                <Button variant="outline" onClick={() => navigate('/sign-in')}>
                  Skip
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
