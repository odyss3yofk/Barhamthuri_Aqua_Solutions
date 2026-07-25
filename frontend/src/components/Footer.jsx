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
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
              )}
              {settings?.instagram_link && (
                <a href={settings.instagram_link} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-ink-3 hover:text-accent hover:border-accent/30 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/></svg>
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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.998 0C5.372 0 0 5.373 0 12.003a11.975 11.975 0 001.64 6.072L0 24l6.063-1.621A11.943 11.943 0 0012 24c6.626 0 12-5.373 12-12.003C24 5.373 18.624 0 11.998 0z" fillRule="evenodd" clipRule="evenodd"/></svg>
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
