import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/service', label: 'Service' },
  { to: '/about', label: 'About & Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  const handleLinkClick = () => setIsOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-ocean/10'
          : 'bg-ocean/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={handleLinkClick}
          >
            {/* Rhino water drop logo */}
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
              <img
                src="/logo.png"
                alt="Barhamthuri Aqua Solutions Logo"
                className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg lg:text-xl leading-tight tracking-tight">
                Barhamthuri
              </span>
              <span className="text-cyan-light text-[10px] lg:text-xs font-medium tracking-widest uppercase">
                Aqua Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/15'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-cyan-light rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/service"
              className="ml-4 px-5 py-2 bg-cyan text-white text-sm font-semibold rounded-lg btn-liquid hover:shadow-lg transition-all duration-300"
            >
              Book Service
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute left-0 h-0.5 w-6 bg-white rounded transform transition-all duration-300 ${
                  isOpen ? 'top-2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-6 bg-white rounded transition-all duration-200 ${
                  isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 bg-white rounded transform transition-all duration-300 ${
                  isOpen ? 'top-2 -rotate-45' : 'top-4'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/15 border-l-4 border-cyan-light'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/service"
              onClick={handleLinkClick}
              className="mx-4 mt-2 px-5 py-3 bg-cyan text-white text-sm font-semibold rounded-lg text-center btn-liquid"
            >
              Book Service
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
