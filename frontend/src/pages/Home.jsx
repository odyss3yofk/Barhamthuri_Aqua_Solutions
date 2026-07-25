import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ProductCard from '../components/ProductCard'
import ScrollSequence from '../components/ScrollSequence'
import { fetchSettings, fetchCoreValues, fetchProducts } from '../utils/api'

/* ---- Animated Counter (intersection-aware) ---- */
function CounterCard({ icon, value, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const step = value / (duration / 16)
          const timer = setInterval(() => {
            setCount(prev => {
              const next = prev + step
              if (next >= value) { clearInterval(timer); return value }
              return Math.floor(next)
            })
          }, 16)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="card-dark p-6 md:p-8 text-center group">
      <span className="text-3xl mb-4 block">{icon}</span>
      <div className="display-font text-3xl md:text-4xl font-bold text-ink-1 mb-1">
        {count.toLocaleString()}<span className="text-accent">{suffix}</span>
      </div>
      <p className="text-ink-3 text-sm font-medium">{label}</p>
    </div>
  )
}

/* ---- Intersection-aware section wrapper ---- */
function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const stats = [
  { icon: '🏆', value: 10, suffix: '+', label: 'Years Experience' },
  { icon: '😊', value: 5000, suffix: '+', label: 'Happy Customers' },
  { icon: '📦', value: 100, suffix: '+', label: 'Products Available' },
  { icon: '🛠️', value: 24, suffix: '/7', label: 'Expert Support' },
]

export default function Home() {
  const [settings, setSettings] = useState(null)
  const [features, setFeatures] = useState([])
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    async function loadData() {
      const [st, vals, prods] = await Promise.all([
        fetchSettings(),
        fetchCoreValues(),
        fetchProducts(),
      ])
      if (st) setSettings(st)
      if (vals?.length) setFeatures(vals)
      if (prods?.length) setFeatured(prods.slice(0, 4))
    }
    loadData()
  }, [])

  const whatsapp = settings?.whatsapp_number || '918753953744'

  return (
    <>
      <SEOHead
        title="Best Water Purifiers in Assam | Barhamthuri Aqua Solutions"
        description="Barhamthuri Aqua Solutions — Leading provider of water purifiers, industrial RO plants, iron removers and kitchen chimneys in Assam & North East India. Pure water, pure life."
        keywords="best water purifier in Assam, RO water purifier Guwahati, iron remover North East India, industrial RO plant Assam, kitchen chimney Guwahati"
      />

      {/* ============ HERO: SCROLL SEQUENCE CANVAS ============ */}
      <ScrollSequence />

      {/* ============ STATS ============ */}
      <section className="py-20 bg-surface relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">By the numbers</span>
            <h2 className="display-font text-3xl md:text-4xl font-bold text-ink-1 mt-3">
              Trusted Across North East India
            </h2>
          </RevealSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <RevealSection key={stat.label} delay={i * 100}>
                <CounterCard {...stat} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="py-20 md:py-28 bg-void relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">Our Best Sellers</span>
            <h2 className="display-font text-3xl md:text-4xl lg:text-5xl font-bold text-ink-1 mt-3 mb-4">
              Premium Water Solutions
            </h2>
            <p className="text-ink-2 max-w-xl mx-auto">
              From compact domestic purifiers to large-scale industrial RO systems — engineered for reliability and performance.
            </p>
          </RevealSection>

          {featured.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featured.map((product, i) => (
                  <RevealSection key={product.id || product.slug} delay={i * 80}>
                    <ProductCard product={product} />
                  </RevealSection>
                ))}
              </div>
              <RevealSection className="text-center mt-12">
                <Link to="/products" className="btn-ghost inline-flex items-center gap-2">
                  View All Products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </RevealSection>
            </>
          ) : (
            <div className="text-center text-ink-3 py-20">
              <div className="text-5xl mb-4">💧</div>
              <p className="text-ink-2">Loading our product lineup...</p>
            </div>
          )}
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      {features.length > 0 && (
        <section className="py-20 md:py-28 bg-surface relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection className="text-center mb-16">
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Why Us</span>
              <h2 className="display-font text-3xl md:text-4xl lg:text-5xl font-bold text-ink-1 mt-3 mb-4">
                The Barhamthuri Difference
              </h2>
              <p className="text-ink-2 max-w-lg mx-auto">
                We don't just sell water purifiers. We deliver a complete water solution with expert installation, service, and lifetime support.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <RevealSection key={f.id || f.title} delay={i * 80}>
                  <div className="card-dark p-7 h-full group">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                      {f.icon}
                    </div>
                    <h3 className="font-bold text-ink-1 text-base mb-2 group-hover:text-accent transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-ink-3 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ PROCESS / HOW IT WORKS ============ */}
      <section className="py-20 md:py-28 bg-void relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">How It Works</span>
            <h2 className="display-font text-3xl md:text-4xl font-bold text-ink-1 mt-3">
              From Inquiry to Pure Water — In 3 Steps
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📞', title: 'Contact Us', desc: 'Reach out via call, WhatsApp, or our website. Tell us your water quality needs and location.' },
              { step: '02', icon: '🔍', title: 'Free Assessment', desc: 'Our technician visits, tests your water, and recommends the perfect system for your needs and budget.' },
              { step: '03', icon: '✅', title: 'Installation & Done', desc: 'Professional installation within 24–48 hours, full user training, and lifetime service support.' },
            ].map((item, i) => (
              <RevealSection key={item.step} delay={i * 120}>
                <div className="relative card-dark p-8">
                  <span className="display-font text-7xl font-black text-accent/10 absolute top-4 right-6 select-none">{item.step}</span>
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <h3 className="display-font text-xl font-bold text-ink-1 mb-3">{item.title}</h3>
                  <p className="text-ink-3 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-20 bg-surface relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-sky/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-widest uppercase mb-6">
              Expert Service Available
            </span>
            <h2 className="display-font text-4xl md:text-5xl lg:text-6xl font-bold text-ink-1 mb-5">
              Need a Service?<br />
              <span className="text-gradient">Book Now.</span>
            </h2>
            <p className="text-ink-2 text-lg mb-10 max-w-xl mx-auto">
              Installation, repair, AMC, or emergency response — our certified technicians are ready. Same-day service available in Guwahati.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/service" className="btn-primary text-base py-3 px-8">
                Book a Service
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={`https://wa.me/${whatsapp}?text=Hello! I need a service booking.`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-ghost text-base py-3 px-8 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.998 0C5.372 0 0 5.373 0 12.003a11.975 11.975 0 001.64 6.072L0 24l6.063-1.621A11.943 11.943 0 0012 24c6.626 0 12-5.373 12-12.003C24 5.373 18.624 0 11.998 0z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
