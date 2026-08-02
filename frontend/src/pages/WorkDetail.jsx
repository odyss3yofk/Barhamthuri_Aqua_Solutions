import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { fetchProjectBySlug, getImageUrl } from '../utils/api'

const WorkDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectBySlug(slug)
        setProject(data)
      } catch (err) {
        console.error("Failed to fetch project details", err)
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [slug])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = useCallback(() => {
    if (project?.images) {
      setLightboxIndex((prev) => (prev + 1) % project.images.length)
    }
  }, [project])
  const prevImage = useCallback(() => {
    if (project?.images) {
      setLightboxIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
    }
  }, [project])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, nextImage, prevImage])

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-surface border-t-accent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-void flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-ink-1 mb-4">Project Not Found</h2>
        <Link to="/our-work" className="btn-primary">Back to Portfolio</Link>
      </div>
    )
  }

  const images = project.images || []

  return (
    <div className="min-h-screen bg-void">
      <SEOHead title={`${project.title} - Barhamthuri Aqua Solutions`} description={project.description} />

      <section className="page-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <Link to="/our-work" className="inline-flex items-center text-ink-2 hover:text-accent mb-8 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Work
          </Link>
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="bg-accent/20 text-accent text-xs font-medium px-3 py-1 rounded-full">{project.category || 'Installation'}</span>
            {images.length > 0 && (
              <span className="bg-surface border border-white/10 text-ink-2 text-xs font-medium px-3 py-1 rounded-full">{images.length} Photos</span>
            )}
          </div>
          <h1 className="display-font text-4xl md:text-5xl lg:text-6xl font-bold text-ink-1 mt-4 mb-4">{project.title}</h1>
          <p className="text-ink-2 text-lg max-w-3xl mx-auto">{project.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((imgObj, idx) => (
                <div 
                  key={idx}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="gallery-frame relative rounded-2xl overflow-hidden bg-surface border border-white/7 aspect-[3/4] mb-3">
                    <img 
                      src={getImageUrl(imgObj.image)} 
                      alt={imgObj.caption || `${project.title} photo ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-void/0 group-hover:bg-void/40 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  {imgObj.caption && (
                    <p className="text-sm font-medium text-ink-2 px-1 group-hover:text-accent transition-colors">
                      {imgObj.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-ink-2 bg-surface rounded-2xl border border-white/7">
              No gallery images available for this project.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-50"
            onClick={closeLightbox}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
            {images.length > 1 && (
              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-accent bg-black/50 hover:bg-black/80 rounded-full transition-all z-50"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
            )}
            
            <img 
              src={getImageUrl(images[lightboxIndex].image)} 
              alt={images[lightboxIndex].caption || 'Project Image'} 
              className="max-h-full max-w-full object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />
            
            {images[lightboxIndex].caption && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-ink-1 px-6 py-2 rounded-full border border-white/10 text-sm">
                {images[lightboxIndex].caption}
              </div>
            )}

            {images.length > 1 && (
              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-accent bg-black/50 hover:bg-black/80 rounded-full transition-all z-50"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            )}
            
            <div className="absolute top-6 left-6 text-white/50 text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkDetail
