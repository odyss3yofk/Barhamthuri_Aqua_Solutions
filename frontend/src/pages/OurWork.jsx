import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

function useInView(threshold = 0.15) {
  const [node, setNode] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [node, threshold])

  return { ref: setNode, visible }
}

import { getImageUrl } from '../utils/api'
import { fetchProjects } from '../utils/api'

export default function OurWork() {
  const heroRef = useInView(0.1)
  const galleryRef = useInView(0.1)
  const ctaRef = useInView(0.15)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data.results || data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])


  return (
    <>
      <SEOHead
        title="Our Work — Barhamthuri Aqua Solutions | Projects Gallery"
        description="Explore our completed projects — commercial RO plants, iron removal systems, chimney installations and industrial RO units across Assam and North East India."
        keywords="water purifier installation Assam, RO plant installation Guwahati, iron removal system North East India, kitchen chimney installation"
      />

      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden hero-gradient" ref={heroRef.ref}>
        {/* Animated bubbles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${Math.random() * 25 + 8}px`,
              height: `${Math.random() * 25 + 8}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}%`,
              animationDuration: `${Math.random() * 8 + 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-28 h-28 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-16 right-16 w-20 h-20 rounded-full bg-cyan-light/10 animate-float-slow" />

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24" preserveAspectRatio="none">
            <path d="M0,64 C360,120,720,20,1080,64 C1260,90,1380,50,1440,64 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.08)" />
            <path d="M0,80 C320,40,640,110,960,70 C1120,50,1320,100,1440,80 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.05)" />
            <path d="M0,100 C480,70,960,120,1440,90 L1440,120 L0,120 Z" fill="white" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 ${heroRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 rounded-full glass-light text-white/90 text-sm font-medium mb-6 tracking-wide">
            🏗️ Our Completed Projects
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Our <span className="text-cyan-light">Work</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            From residential purifiers to large-scale industrial RO plants — see the quality of work we deliver across Assam and North East India.
          </p>
        </div>
      </section>

      {/* ============ GALLERY SECTION ============ */}
      <section className="py-16 md:py-24 bg-white" ref={galleryRef.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-14 transition-all duration-700 ${galleryRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-cyan font-semibold text-sm tracking-widest uppercase">
              Project Gallery
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4">
              Our Past Work Gallery
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Every project tells a story of quality craftsmanship and dedication to delivering pure water solutions.
            </p>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {projects.map((project, i) => (
              <Link
                key={project.id}
                to={`/our-work/${project.slug}`}
                className={`gallery-card group block transition-all duration-700 ${
                  galleryRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Image Frame */}
                <div className="gallery-frame relative overflow-hidden rounded-2xl shadow-lg">
                  {/* Decorative frame border */}
                  <div className="absolute inset-0 rounded-2xl border-4 border-white/20 z-10 pointer-events-none" />

                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={getImageUrl(project.cover_image)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan/90 text-white backdrop-blur-sm">
                      {project.subtitle}
                    </span>
                  </div>

                  {/* Photo count badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                      📸 {project.image_count} Photos
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-white font-bold text-xl md:text-2xl mb-2 group-hover:translate-y-0 translate-y-1 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center text-cyan-light text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      View all photos →
                    </span>
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan/0 group-hover:border-cyan/50 transition-all duration-500 z-10 pointer-events-none" />
                </div>
              </Link>
            ))}
          </div>
          )}

          {/* View Project Details Link */}
          <div className={`text-center mt-14 transition-all duration-700 delay-500 ${galleryRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/products"
              className="inline-flex items-center text-ocean font-semibold text-lg hover:text-cyan transition-colors duration-300 group"
            >
              <span className="border-b-2 border-ocean/30 group-hover:border-cyan pb-1">
                VIEW PROJECT DETAILS
              </span>
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

      {/* ============ CTA SECTION ============ */}
      <section className="relative py-20 md:py-28 overflow-hidden" ref={ctaRef.ref}>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(-45deg, #002A42, #003B5C, #008B8B, #005580)',
            backgroundSize: '400% 400%',
            animation: 'gradientMove 10s ease infinite',
          }}
        />

        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-10 right-10 w-28 h-28 rounded-full bg-cyan-light/10 animate-float-slow" />

        <div className={`relative z-10 max-w-4xl mx-auto text-center px-4 transition-all duration-700 ${ctaRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Have a Project in Mind?
            <br />
            <span className="text-cyan-light">Let's Build It Together!</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Whether you need a home purifier or an industrial-scale RO plant, our team of experts is ready to deliver a tailored solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/service"
              className="px-8 py-4 bg-white text-ocean font-bold rounded-xl text-lg btn-liquid inline-flex items-center justify-center group"
            >
              Get a Free Quote
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
              href="https://wa.me/918753953744"
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
