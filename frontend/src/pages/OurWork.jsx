import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { fetchProjects, getImageUrl } from '../utils/api'

const OurWork = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data || [])
      } catch (err) {
        console.error("Failed to fetch projects", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-surface border-t-accent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void">
      <SEOHead title="Our Work - Barhamthuri Aqua Solutions" />
      
      <section className="page-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <span className="text-accent text-xs font-semibold tracking-widest uppercase">Portfolio</span>
          <h1 className="display-font text-4xl md:text-5xl lg:text-6xl font-bold text-ink-1 mt-4 mb-4">Our Work</h1>
          <p className="text-ink-2 text-lg max-w-2xl mx-auto">Explore our successful installations and solutions.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Link 
                to={`/our-work/${project.slug}`} 
                key={project.id || index}
                className="gallery-frame block group relative overflow-hidden rounded-2xl bg-surface border border-white/7"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  {project.cover_image ? (
                    <img
                      src={getImageUrl(project.cover_image)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-elevated flex items-center justify-center">
                      <span className="text-ink-3">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-accent/20 text-accent text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.category || 'Installation'}
                    </span>
                    {(project.images?.length > 0 || project.photo_count > 0) && (
                      <span className="bg-void/80 text-ink-2 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        {project.images?.length || project.photo_count} Photos
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-ink-1 mb-2">{project.title}</h3>
                  <p className="text-ink-2 line-clamp-2 mb-4">{project.description}</p>
                  
                  <div className="flex items-center text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    View Project Details
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center py-20 text-ink-2">
              No projects found.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default OurWork
