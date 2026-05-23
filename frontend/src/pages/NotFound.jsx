import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found — 404"
        description="The page you are looking for does not exist. Return to Barhamthuri Aqua Solutions homepage."
      />

      <section className="min-h-screen flex items-center justify-center hero-gradient relative overflow-hidden">
        {/* Animated bubbles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${Math.random() * 25 + 8}px`,
              height: `${Math.random() * 25 + 8}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 10}%`,
              animationDuration: `${Math.random() * 8 + 5}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          {/* Large 404 with water effect */}
          <div className="mb-8">
            <h1 className="hero-text-clip text-8xl sm:text-9xl md:text-[12rem] font-black leading-none">
              404
            </h1>
          </div>

          {/* Water drop icon */}
          <div className="mb-8 animate-float">
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto text-white/30">
              <path
                d="M50 10 C35 30, 20 55, 50 80 C80 55, 65 30, 50 10Z"
                fill="currentColor"
              />
              <text x="50" y="58" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">?</text>
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Oops! This page has evaporated
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
            Looks like this page has gone with the flow. Don&apos;t worry —
            let&apos;s get you back to clean water.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-ocean font-bold rounded-xl text-lg btn-liquid inline-flex items-center justify-center group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl text-lg btn-liquid-white inline-flex items-center justify-center"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
