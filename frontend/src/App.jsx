import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import React, { useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const ServicePortal = lazy(() => import('./pages/ServicePortal'))
const AboutContact = lazy(() => import('./pages/AboutContact'))
const OurWork = lazy(() => import('./pages/OurWork'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Basic Error Boundary to catch unmount/render crashes instead of black screen
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Crashed:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-void flex items-center justify-center p-8 text-center">
          <div className="bg-red-900/20 border border-red-500 p-8 rounded-2xl max-w-2xl">
            <h1 className="text-red-500 text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="text-white mb-4">The app crashed. Here is the error:</p>
            <pre className="text-red-300 text-left text-sm bg-black p-4 rounded overflow-auto">
              {this.state.error && this.state.error.toString()}
            </pre>
            <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-red-600 text-white rounded font-bold">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Just in case old GSAP pins are still alive in memory, violently kill them on every route change
    try {
      ScrollTrigger.killAll()
      ScrollTrigger.clearScrollMemory()
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.documentElement.style.overflow = ''
    } catch (e) {
      // ignore
    }
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="min-h-screen bg-void flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-surface border-t-accent animate-spin" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetails />} />
                <Route path="/service" element={<ServicePortal />} />
                <Route path="/our-work" element={<OurWork />} />
                <Route path="/our-work/:slug" element={<WorkDetail />} />
                <Route path="/about" element={<AboutContact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
