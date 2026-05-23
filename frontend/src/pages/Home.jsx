import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ProductCard from '../components/ProductCard'
import { fetchSettings, fetchCoreValues, fetchProducts } from '../utils/api'

/* ---- Animated Counter Hook ---- */
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const step = end / (duration / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return { count, ref }
}

/* ---- Intersection Observer Hook ---- */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* ---- Stats Data ---- */
const stats = [
  { label: 'Years Experience', value: 10, suffix: '+', icon: '🏆' },
  { label: 'Happy Customers', value: 5000, suffix: '+', icon: '😊' },
  { label: 'Products Available', value: 100, suffix: '+', icon: '📦' },
  { label: 'Support', value: 24, suffix: '/7', icon: '🛠️' },
]

export default function Home() {
  const [settings, setSettings] = useState(null)
  const [features, setFeatures] = useState([])
  const [featured, setFeatured] = useState([])
  const sectionRef1 = useInView()
  const sectionRef2 = useInView()
  const sectionRef3 = useInView()

  useEffect(() => {
    async function loadData() {
      const st = await fetchSettings()
      if (st) setSettings(st)

      const vals = await fetchCoreValues()
      if (vals && vals.length > 0) setFeatures(vals)

      const prods = await fetchProducts()
      if (prods && prods.length > 0) {
        // Just take the first 4 for the featured section
        setFeatured(prods.slice(0, 4))
      }
    }
    loadData()
  }, [])

  return (
    <>
      <SEOHead
        title="Best Water Purifiers in Assam | Barhamthuri Aqua Solutions"
        description="Barhamthuri Aqua Solutions — Leading provider of water purifiers, industrial RO plants, iron removers and kitchen chimneys in Assam & North East India. Pure water, pure life."
        keywords="best water purifier in Assam, RO water purifier Guwahati, iron remover North East India, industrial RO plant Assam, kitchen chimney Guwahati"
      />

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
        {/* Animated bubbles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}%`,
              animationDuration: `${Math.random() * 8 + 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-32 right-20 w-20 h-20 rounded-full bg-cyan-light/10 animate-float-slow" />
        <div className="absolute top-1/3 right-10 w-16 h-16 rounded-full bg-white/5 animate-float" style={{ animationDelay: '2s' }} />

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 200"
            className="w-full h-24 md:h-32"
            preserveAspectRatio="none"
          >
            <path
              d="M0,128 C360,200,720,60,1080,128 C1260,170,1380,100,1440,128 L1440,200 L0,200 Z"
              fill="rgba(255,255,255,0.08)"
            />
            <path
              d="M0,160 C320,100,640,200,960,140 C1120,110,1320,180,1440,160 L1440,200 L0,200 Z"
              fill="rgba(255,255,255,0.05)"
            />
            <path
              d="M0,180 C480,140,960,200,1440,170 L1440,200 L0,200 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full glass-light text-white/90 text-sm font-medium mb-8 tracking-wide">
              🌊 Trusted by 5000+ families across North East India
            </span>
          </div>

          <h1
            className="hero-text-clip text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
            dangerouslySetInnerHTML={{ __html: settings?.hero_headline?.replace(',', ',<br/>') || 'Pure Water,<br />Pure Life' }}
          >
          </h1>

          <p
            className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            {settings?.hero_subheadline || "Assam's most trusted water purification company. From homes to industries, we deliver clean, safe water solutions with expert service."}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Link
              to="/products"
              className="px-8 py-4 bg-white text-ocean font-bold rounded-xl text-lg btn-liquid hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center group"
            >
              Explore Products
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/service"
              className="px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl text-lg btn-liquid-white hover:border-white transition-all duration-300 inline-flex items-center justify-center"
            >
              Book a Service
            </Link>
          </div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section className="py-16 md:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => {
              const counter = useCounter(stat.value, 2000 + i * 300)
              return (
                <div
                  key={stat.label}
                  ref={counter.ref}
                  className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-ocean/5 to-cyan/5 card-hover"
                >
                  <span className="text-4xl mb-3 block">{stat.icon}</span>
                  <div className="text-3xl md:text-4xl font-black text-ocean mb-1">
                    {counter.count}
                    <span className="text-cyan">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="py-16 md:py-24 bg-gray-50" ref={sectionRef1.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-14 transition-all duration-700 ${
              sectionRef1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-cyan font-semibold text-sm tracking-widest uppercase">
              Our Best Sellers
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Hand-picked water purification solutions trusted by thousands of
              families across Assam and North East India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((product, i) => (
              <div
                key={product.id}
                className={`transition-all duration-700 ${
                  sectionRef1.visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div
            className={`text-center mt-12 transition-all duration-700 delay-500 ${
              sectionRef1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-ocean text-white font-semibold rounded-xl btn-liquid text-lg group"
            >
              View All Products
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      {features.length > 0 && (
        <section className="py-16 md:py-24 bg-white" ref={sectionRef2.ref}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-14 transition-all duration-700 ${
                sectionRef2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-cyan font-semibold text-sm tracking-widest uppercase">
                Why Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4">
                Why Choose Barhamthuri?
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                A decade of experience delivering pure water solutions with
                unmatched service quality in North East India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`p-8 rounded-2xl bg-white border border-gray-100 shadow-sm card-hover text-center transition-all duration-700 ${
                    sectionRef2.visible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-ocean/10 to-cyan/10 flex items-center justify-center text-3xl">
                    {feat.icon}
                  </div>
                  <h3 className="font-bold text-lg text-charcoal mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CTA BANNER ============ */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        ref={sectionRef3.ref}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(-45deg, #002A42, #003B5C, #008B8B, #005580)',
            backgroundSize: '400% 400%',
            animation: 'gradientMove 10s ease infinite',
          }}
        />

        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-10 right-10 w-28 h-28 rounded-full bg-cyan-light/10 animate-float-slow" />

        <div
          className={`relative z-10 max-w-4xl mx-auto text-center px-4 transition-all duration-700 ${
            sectionRef3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Need a Service?
            <br />
            <span className="text-cyan-light">Book Now!</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Whether it&apos;s a new installation, annual maintenance, or
            emergency repair — our expert team is just a call away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/service"
              className="px-8 py-4 bg-white text-ocean font-bold rounded-xl text-lg btn-liquid inline-flex items-center justify-center group"
            >
              Book a Service
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href={settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number}` : "https://wa.me/918753953744"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl text-lg btn-liquid-white inline-flex items-center justify-center"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
