import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-void grid-bg flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <SEOHead title="404 - Page Not Found" />
      
      {/* Decorative floating elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sky/5 rounded-full blur-3xl animate-float"></div>

      <div className="text-center z-10">
        <h1 className="display-font text-8xl md:text-9xl font-bold text-gradient mb-6 animate-scale-in">404</h1>
        
        <div className="w-16 h-16 mx-auto mb-6 text-accent animate-float">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2C7 6 4 11 4 15.5a8 8 0 0016 0C20 11 17 6 12 2z" />
          </svg>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-ink-1 mb-4 animate-fade-up delay-100">
          This page has evaporated into the void
        </h2>
        <p className="text-ink-2 mb-10 max-w-md mx-auto animate-fade-up delay-200">
          We can't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
          <Link to="/" className="btn-primary w-full sm:w-auto">
            Back to Home
          </Link>
          <Link to="/products" className="btn-ghost w-full sm:w-auto">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
