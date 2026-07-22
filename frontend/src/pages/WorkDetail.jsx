import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
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

import { getImageUrl, fetchProjectBySlug } from '../utils/api'

export default function WorkDetail() {
  const { category } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const heroRef = useInView(0.1)
  const galleryRef = useInView(0.1)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjectBySlug(category)
        setProject(data)
      } catch (err) {
        console.error('Error fetching project:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [category])

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Project Not Found</h1>
          <p className="text-gray-500 mb-8">The project category you're looking for doesn't exist.</p>
          <Link to="/our-work" className="px-6 py-3 bg-ocean text-white font-semibold rounded-xl btn-liquid">
            ← Back to Our Work
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`${project.title} — Barhamthuri Aqua Solutions`}
        description={project.description}
        keywords={`${project.title}, water purifier installation Assam, Barhamthuri Aqua Solutions`}
      />

      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden hero-gradient" ref={heroRef.ref}>
        {/* Animated bubbles */}
        {[...Array(6)].map((_, i) => (
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
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 mb-6 text-white/60 text-sm">
            <Link to="/our-work" className="hover:text-white transition-colors">Our Work</Link>
            <span>›</span>
            <span className="text-white/90">{project.subtitle}</span>
          </div>

          <span className="inline-block px-4 py-2 rounded-full glass-light text-white/90 text-sm font-medium mb-6 tracking-wide">
            📸 {project.images.length} Project Photos
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            {project.description}
          </p>
        </div>
      </section>

      {/* ============ IMAGE GALLERY ============ */}
      <section className="py-16 md:py-24 bg-white" ref={galleryRef.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {project.images.map((img, i) => (
              <div
                key={i}
                className={`gallery-card group cursor-pointer transition-all duration-700 ${
                  galleryRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
                onClick={() => setLightbox(i)}
              >
                <div className="gallery-frame relative overflow-hidden rounded-2xl shadow-lg">
                  <div className="absolute inset-0 rounded-2xl border-4 border-white/20 z-10 pointer-events-none" />

                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={getImageUrl(img.image)}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    <p className="text-white font-semibold text-sm md:text-base">
                      {img.caption}
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan/0 group-hover:border-cyan/50 transition-all duration-500 z-10 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Back Link */}
          <div className={`text-center mt-14 transition-all duration-700 delay-500 ${galleryRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/our-work"
              className="inline-flex items-center text-ocean font-semibold text-lg hover:text-cyan transition-colors duration-300 group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span className="border-b-2 border-ocean/30 group-hover:border-cyan pb-1">
                BACK TO ALL PROJECTS
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          {lightbox > 0 && (
            <button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {lightbox < project.images.length - 1 && (
            <button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={getImageUrl(project.images[lightbox].image)}
              alt={project.images[lightbox].caption}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white/80 text-center mt-4 text-lg font-medium">
              {project.images[lightbox].caption}
            </p>
            <p className="text-white/40 text-center text-sm mt-1">
              {lightbox + 1} / {project.images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
