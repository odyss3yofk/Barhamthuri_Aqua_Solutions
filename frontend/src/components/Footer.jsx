import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSettings } from '../utils/api'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/service', label: 'Book a Service' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/about', label: 'About Us' },
]

const productLinks = [
  { to: '/products?cat=DOMESTIC', label: 'Domestic Purifiers' },
  { to: '/products?cat=INDUSTRIAL', label: 'Industrial RO Plants' },
  { to: '/products?cat=CHIMNEY', label: 'Kitchen Chimneys' },
  { to: '/products?cat=SPARES', label: 'Spare Parts' },
]

export default function Footer() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetchSettings().then(s => { if (s) setSettings(s) })
  }, [])

  const phone = settings?.contact_phone || '+91 8753953744'
  const email = settings?.contact_email || 'barhamthuriaquasolutions@gmail.com'
  const address = settings?.contact_address || 'Ward-4, Bihpuria, Lakhimpur, Assam 784161, India'
  const whatsapp = settings?.whatsapp_number || '918753953744'

  return (
    <footer className="relative bg-[#050810] border-t border-white/5">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-5">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <span className="block text-white font-bold text-lg display-font leading-tight">Barhamthuri</span>
                <span className="block text-accent text-[10px] font-semibold tracking-widest uppercase">Aqua Solutions</span>
              </div>
            </Link>
            <p className="text-ink-3 text-sm leading-relaxed mb-6">
              Assam's most trusted water purification company. Pure water, pure life — since 2014.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {settings?.facebook_link && (
                <a href={settings.facebook_link} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-ink-3 hover:text-accent hover:border-accent/30 transition-all duration-300">
                  <img src="/assets/Facebook_f_logo_(2021).svg.webp" alt="Facebook" className="w-4 h-4 object-contain" />
                </a>
              )}
              {settings?.instagram_link && (
                <a href={settings.instagram_link} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-ink-3 hover:text-accent hover:border-accent/30 transition-all duration-300">
                  <img src="/assets/Instagram_icon.png" alt="Instagram" className="w-4 h-4 object-contain" />
                </a>
              )}
              {settings?.youtube_link && (
                <a href={settings.youtube_link} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-ink-3 hover:text-accent hover:border-accent/30 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#050810"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 relative">
              Quick Links
              <span className="accent-line mt-2" />
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-3 text-sm hover:text-accent transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-4 h-px bg-ink-3/40 group-hover:w-5 group-hover:bg-accent transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 relative">
              Products
              <span className="accent-line mt-2" />
            </h4>
            <ul className="space-y-2">
              {productLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-3 text-sm hover:text-accent transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-4 h-px bg-ink-3/40 group-hover:w-5 group-hover:bg-accent transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 relative">
              Contact Us
              <span className="accent-line mt-2" />
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5 flex-shrink-0">📍</span>
                <span className="text-ink-3 text-sm leading-relaxed">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent flex-shrink-0">📞</span>
                <a href={`tel:${phone}`} className="text-ink-3 text-sm hover:text-accent transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent flex-shrink-0">✉️</span>
                <a href={`mailto:${email}`} className="text-ink-3 text-sm hover:text-accent transition-colors break-all">{email}</a>
              </li>
            </ul>
            <a
              href={`https://wa.me/${whatsapp}?text=Hello! I'm interested in your water purification products.`}
              target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
            >
              <img src="/assets/WhatsApp_icon.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-3 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Barhamthuri Aqua Solutions. All rights reserved.
          </p>
          <p className="text-ink-3 text-xs opacity-60">
            Crafted with 💧 for clean water
          </p>
        </div>
      </div>
    </footer>
  )
}
