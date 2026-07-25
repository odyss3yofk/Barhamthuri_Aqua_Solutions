import { useState, useRef, useEffect } from 'react'
import SEOHead from '../components/SEOHead'
import { fetchSettings, fetchMilestones, fetchCoreValues } from '../utils/api'

const API_BASE = import.meta.env.PROD ? 'https://kuldeepbora.pythonanywhere.com/api' : 'http://localhost:8000/api'

export default function AboutContact() {
  const [settings, setSettings] = useState(null)
  const [milestones, setMilestones] = useState([])
  const [values, setValues] = useState([])

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [contactErrors, setContactErrors] = useState({})
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Scroll animation
  const [visible, setVisible] = useState({})
  const observers = useRef([])

  useEffect(() => {
    async function loadData() {
      const st = await fetchSettings()
      if (st) setSettings(st)
      
      const ms = await fetchMilestones()
      if (ms) setMilestones(ms)

      const vals = await fetchCoreValues()
      if (vals) setValues(vals)
    }
    loadData()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('.anim-section')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.dataset.anim]: true }))
          }
        })
      },
      { threshold: 0.15 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [milestones, values])

  const validateContact = () => {
    const errs = {}
    if (!contactForm.name.trim()) errs.name = 'Name is required'
    if (!contactForm.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email))
      errs.email = 'Enter a valid email'
    if (!contactForm.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
    if (contactErrors[name]) setContactErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    const errs = validateContact()
    if (Object.keys(errs).length > 0) {
      setContactErrors(errs)
      return
    }
    setSubmitting(true)

    try {
      const response = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })
      if (response.ok) {
        setContactSubmitted(true)
      } else {
        alert("Failed to send message. Please try again or contact via WhatsApp.")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to send message. Please try again or contact via WhatsApp.")
    }

    setSubmitting(false)
  }

  return (
    <div className="bg-void min-h-screen">
      <SEOHead
        title="About Us & Contact — Barhamthuri Aqua Solutions"
        description="Learn about Barhamthuri Aqua Solutions — Assam's trusted water purifier company since 2014. Contact us for sales, service, or partnerships in Guwahati and North East India."
        keywords="water purifier company Assam, about Barhamthuri Aqua Solutions, contact water purifier Guwahati, water treatment company North East India"
      />

      {/* Hero */}
      <section className="page-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 text-center">
          <span className="text-accent text-xs font-semibold tracking-widest uppercase">About & Contact</span>
          <h1 className="display-font text-4xl md:text-5xl lg:text-6xl font-bold text-ink-1 mt-4 mb-4">
            Our Story & Connection
          </h1>
          <p className="text-ink-2 text-lg md:text-xl max-w-2xl mx-auto">
            Our story, our mission, and how to reach us. We&apos;re always here to help.
          </p>
        </div>
      </section>

      {/* ============ ABOUT SECTION ============ */}
      <section className="py-16 md:py-24 anim-section" data-anim="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image/Graphic */}
            <div
              className={`transition-all duration-700 ${
                visible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden bg-surface border border-white/10 aspect-[4/3] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
                <div className="relative text-center p-8 z-10">
                  <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto text-accent/20 animate-float-slow">
                    <path d="M50 10 C35 30, 20 55, 50 80 C80 55, 65 30, 50 10Z" fill="currentColor" />
                  </svg>
                  <p className="text-ink-1 text-2xl font-bold mt-4">Since 2014</p>
                  <p className="text-ink-3 text-sm mt-1">Serving North East India</p>
                </div>
                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-tr-full" />
              </div>
            </div>

            {/* Text */}
            <div
              className={`transition-all duration-700 delay-200 ${
                visible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                Our Story
              </span>
              <h2 className="display-font text-3xl md:text-4xl font-bold text-ink-1 mt-3 mb-6">
                Clean Water for Every Home in North East India
              </h2>
              <div className="space-y-4 text-ink-2 leading-relaxed bg-surface/50 border-l-4 border-accent p-6 rounded-r-2xl">
                <p>{settings?.about_story || "Barhamthuri Aqua Solutions was founded in 2014..."}</p>
                <p>
                  <strong className="text-ink-1">Mission: </strong>
                  {settings?.about_mission || "Providing safe, clean drinking water to every household..."}
                </p>
                <p>
                  <strong className="text-ink-1">Vision: </strong>
                  {settings?.about_vision || "To become the most trusted water solutions brand in North East India..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      {values.length > 0 && (
        <section className="py-16 md:py-20 relative anim-section" data-anim="values">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-void"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="text-center mb-12">
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                Our Principles
              </span>
              <h2 className="display-font text-3xl md:text-4xl font-bold text-ink-1 mt-3 mb-4">
                Core Values
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto rounded-full accent-line"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div
                  key={v.id}
                  className={`p-8 rounded-2xl bg-surface border border-white/10 text-center transition-all duration-700 hover:border-accent hover:shadow-[0_0_15px_rgba(45,212,191,0.15)] ${
                    visible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <span className="text-4xl block mb-4">{v.icon}</span>
                  <h3 className="font-bold text-xl text-ink-1 mb-3">{v.title}</h3>
                  <p className="text-ink-3 text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ TIMELINE ============ */}
      {milestones.length > 0 && (
        <section className="py-16 md:py-24 anim-section" data-anim="timeline">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                Our Journey
              </span>
              <h2 className="display-font text-3xl md:text-4xl font-bold text-ink-1 mt-3">
                Milestones
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full accent-line"></div>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30" />

              {milestones.map((m, i) => (
                <div
                  key={m.id}
                  className={`relative flex items-start mb-10 last:mb-0 transition-all duration-700 ${
                    visible.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 -ml-2 mt-2 rounded-full bg-accent border-[3px] border-void shadow-[0_0_10px_rgba(45,212,191,0.5)] z-10" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="p-6 rounded-2xl bg-surface border border-white/10 transition-colors hover:border-accent/50">
                      <span className="text-accent font-bold text-lg">{m.year}</span>
                      <h4 className="font-bold text-ink-1 mt-1">{m.title}</h4>
                      <p className="text-ink-3 text-sm mt-2">{m.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CONTACT SECTION ============ */}
      <section className="py-16 md:py-24 relative anim-section" data-anim="contact">
        <div className="absolute inset-0 bg-gradient-to-b from-void to-surface/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-14">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">
              Get In Touch
            </span>
            <h2 className="display-font text-3xl md:text-4xl font-bold text-ink-1 mt-3 mb-3">
              Contact Us
            </h2>
            <p className="text-ink-2 max-w-lg mx-auto">
              Have questions? We&apos;d love to hear from you. Reach out via the
              form or contact details below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Contact Form */}
            <div
              className={`lg:col-span-3 transition-all duration-700 ${
                visible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              {contactSubmitted ? (
                <div className="bg-surface border border-accent/20 rounded-3xl p-10 text-center animate-scale-in">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-ink-1 mb-2">Message Sent! ✉️</h3>
                  <p className="text-ink-2 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false)
                      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' })
                    }}
                    className="px-6 py-3 btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="bg-surface border border-white/10 rounded-3xl p-8 md:p-10 space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="c-name" className="form-label text-ink-2 block mb-2 text-sm">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="c-name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        className={`form-input w-full bg-void border ${contactErrors.name ? 'border-red-400' : 'border-white/10'} rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all`}
                        placeholder="Your name"
                      />
                      {contactErrors.name && (
                        <p className="text-red-400 text-xs mt-1">{contactErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="form-label text-ink-2 block mb-2 text-sm">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="c-email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        className={`form-input w-full bg-void border ${contactErrors.email ? 'border-red-400' : 'border-white/10'} rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all`}
                        placeholder="your@email.com"
                      />
                      {contactErrors.email && (
                        <p className="text-red-400 text-xs mt-1">{contactErrors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="c-phone" className="form-label text-ink-2 block mb-2 text-sm">Phone</label>
                      <input
                        type="tel"
                        id="c-phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        className="form-input w-full bg-void border border-white/10 rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-subject" className="form-label text-ink-2 block mb-2 text-sm">Subject</label>
                      <input
                        type="text"
                        id="c-subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        className="form-input w-full bg-void border border-white/10 rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-message" className="form-label text-ink-2 block mb-2 text-sm">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      rows={5}
                      className={`form-input w-full bg-void border ${contactErrors.message ? 'border-red-400' : 'border-white/10'} rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none`}
                      placeholder="Tell us how we can help..."
                    />
                    {contactErrors.message && (
                      <p className="text-red-400 text-xs mt-1">{contactErrors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      submitting
                        ? 'bg-surface border border-white/10 text-ink-3 cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                  >
                    {submitting ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-ink-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Sidebar */}
            <div
              className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-200 ${
                visible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {/* Address */}
              <div className="bg-surface rounded-2xl p-6 border border-white/10 transition-colors hover:border-accent/30">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-void border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-ink-1 mb-1">Visit Us</h4>
                    <p className="text-ink-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: settings?.contact_address?.replace('\n', '<br/>') || "Ward-4,Bihpuria, Lakhimpur<br/>Assam 784161, India" }}>
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-surface rounded-2xl p-6 border border-white/10 transition-colors hover:border-accent/30">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-void border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-ink-1 mb-1">Call Us</h4>
                    <a href={`tel:${settings?.contact_phone || "+918753953744"}`} className="text-ink-2 hover:text-accent transition-colors text-sm">
                      {settings?.contact_phone || "+91 8753953744"}
                    </a>
                    <p className="text-ink-3 text-xs mt-1">Mon–Sat, 9am–7pm</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-surface rounded-2xl p-6 border border-white/10 transition-colors hover:border-accent/30">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-void border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-bold text-ink-1 mb-1">Email Us</h4>
                    <a href={`mailto:${settings?.contact_email || "barhamthuriaquasolutions@gmail.com"}`} className="text-ink-2 hover:text-accent transition-colors text-sm">
                      {settings?.contact_email || "barhamthuriaquasolutions@gmail.com"}
                    </a>
                    <p className="text-ink-3 text-xs mt-1">We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number}` : "https://wa.me/918753953744"}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-surface rounded-2xl p-6 border border-white/10 transition-all hover:border-[#25D366]/50 hover:shadow-[0_0_15px_rgba(37,211,102,0.15)] group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-2xl flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <h4 className="font-bold text-ink-1 mb-1 group-hover:text-[#25D366] transition-colors">
                      WhatsApp
                    </h4>
                    <p className="text-ink-3 text-sm">
                      Quick chat for instant support
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-ink-3 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-void h-64 md:h-72 w-full relative">
                <iframe
                  title="Barhamthuri Aqua Solutions Location"
                  src="https://maps.google.com/maps?q=27.0130682,93.9164899&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
