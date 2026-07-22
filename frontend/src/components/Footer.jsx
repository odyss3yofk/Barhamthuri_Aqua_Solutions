import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchSettings } from '../utils/api'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/service', label: 'Book Service' },
  { to: '/about', label: 'About Us' },
]

const productLinks = [
  { to: '/products?cat=Domestic', label: 'Domestic Purifiers' },
  { to: '/products?cat=Industrial', label: 'Industrial RO Plants' },
  { to: '/products?cat=Chimneys', label: 'Kitchen Chimneys' },
  { to: '/products?cat=Spares', label: 'Spare Parts' },
]

export default function Footer() {
  const [settings, setSettings] = useState(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    async function loadData() {
      const st = await fetchSettings()
      if (st) setSettings(st)
    }
    loadData()
  }, [])

  return (
    <footer className="bg-charcoal text-white">
      {/* Wave top separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0,0 C150,100 350,0 600,50 C850,100 1050,20 1200,80 L1200,0 L0,0 Z"
            fill="#333333"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 pt-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-5">
              <img
                src="/logo.png"
                alt="Barhamthuri Aqua Solutions Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="font-bold text-lg">Barhamthuri</h3>
                <p className="text-cyan-light text-xs tracking-widest uppercase">
                  Aqua Solutions
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The leading provider of <strong>Water Purifiers in Assam</strong>, <strong>Iron Removers</strong>, <strong>Aqua Guards</strong>, and industrial RO systems since 2014. Trusted by 5000+ families for safe, clean drinking water across North East India.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {['facebook', 'instagram', 'youtube'].map((social) => {
                const linkMap = {
                  facebook: settings?.facebook_link,
                  instagram: settings?.instagram_link,
                  youtube: settings?.youtube_link,
                }
                const linkUrl = linkMap[social] || '#'
                
                return (
                  <a
                    key={social}
                    href={linkUrl}
                    target={linkUrl !== '#' ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-cyan transition-colors duration-300 flex items-center justify-center"
                    aria-label={social}
                  >
                    <span className="text-sm">
                      {social === 'facebook' && '📘'}
                      {social === 'instagram' && '📷'}
                      {social === 'youtube' && '▶️'}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-5 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-cyan rounded-full" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-cyan-light transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-light transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-base mb-5 text-white relative inline-block">
              Our Products
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-cyan rounded-full" />
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-cyan-light transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-light transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-base mb-5 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-cyan rounded-full" />
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <span className="text-lg mt-0.5">📍</span>
                <span dangerouslySetInnerHTML={{ __html: settings?.contact_address?.replace('\n', '<br/>') || "Barhamthuri Aqua Solutions<br/>Ward-4,Bihpuria, Lakhimpur<br/>Assam 784161, India" }}>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-lg">📞</span>
                <a
                  href={`tel:${settings?.contact_phone || "+918753953744"}`}
                  className="hover:text-cyan-light transition-colors"
                >
                  {settings?.contact_phone || "+91 8753953744"}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-lg">✉️</span>
                <a
                  href={`mailto:${settings?.contact_email || "barhamthuriaquasolutions@gmail.com"}`}
                  className="hover:text-cyan-light transition-colors"
                >
                  {settings?.contact_email || "barhamthuriaquasolutions@gmail.com"}
                </a>
              </li>
              <li>
                <a
                  href={settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number}` : "https://wa.me/918753953744"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                >
                  <span>💬</span>
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {currentYear} Barhamthuri Aqua Solutions. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Crafted with love  for clean water in North East India
          </p>
        </div>
      </div>
    </footer>
  )
}
