import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const ServicePortal = lazy(() => import('./pages/ServicePortal'))
const AboutContact = lazy(() => import('./pages/AboutContact'))
const OurWork = lazy(() => import('./pages/OurWork'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Kill ALL active ScrollTriggers whenever route changes.
    // GSAP's pin: true adds inline styles to body/html — this guarantees cleanup.
    ScrollTrigger.killAll()
    ScrollTrigger.clearScrollMemory()
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.documentElement.style.overflow = ''

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
              <Route path="/our-work/:category" element={<WorkDetail />} />
              <Route path="/about" element={<AboutContact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
