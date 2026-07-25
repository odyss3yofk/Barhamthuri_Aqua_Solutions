import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/service', label: 'Service' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setIsOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={handleLinkClick}>
            <div className="relative w-9 h-9 lg:w-11 lg:h-11 flex-shrink-0">
              <img
                src="/logo.png"
                alt="Barhamthuri Aqua Solutions Logo"
                className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base lg:text-lg leading-tight tracking-tight display-font">
                Barhamthuri
              </span>
              <span className="text-accent text-[9px] lg:text-[10px] font-semibold tracking-[0.2em] uppercase">
                Aqua Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/service"
              className="ml-4 btn-primary text-sm py-2 px-5"
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
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 h-0.5 w-5 bg-white rounded transform transition-all duration-300 ${isOpen ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-2 h-0.5 w-5 bg-white rounded transition-all duration-200 ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-white rounded transform transition-all duration-300 ${isOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-2 rounded-2xl bg-surface border border-white/10 p-4 flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-accent bg-accent/10 border-l-2 border-accent'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/service"
              onClick={handleLinkClick}
              className="mt-2 btn-primary text-sm text-center"
            >
              Book Service
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
