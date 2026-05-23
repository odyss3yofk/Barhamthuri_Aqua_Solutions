import { useState, useRef, useEffect } from 'react'
import SEOHead from '../components/SEOHead'
import { fetchSettings, fetchMilestones, fetchCoreValues } from '../utils/api'

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
      const response = await fetch('http://localhost:8000/api/contact/', {
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
    <>
      <SEOHead
        title="About Us & Contact — Barhamthuri Aqua Solutions"
        description="Learn about Barhamthuri Aqua Solutions — Assam's trusted water purifier company since 2014. Contact us for sales, service, or partnerships in Guwahati and North East India."
        keywords="water purifier company Assam, about Barhamthuri Aqua Solutions, contact water purifier Guwahati, water treatment company North East India"
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-ocean via-ocean-light to-cyan overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-16 right-20 w-20 h-20 rounded-full bg-cyan-light/10 animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 100" className="w-full h-12 md:h-16" preserveAspectRatio="none">
            <path d="M0,60 C480,100,960,20,1440,60 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            About & Contact
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Our story, our mission, and how to reach us. We&apos;re always here
            to help.
          </p>
        </div>
      </section>

      {/* ============ ABOUT SECTION ============ */}
      <section className="py-16 md:py-24 bg-white anim-section" data-anim="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image/Graphic */}
            <div
              className={`transition-all duration-700 ${
                visible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-ocean to-cyan aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto text-white/20 animate-float-slow">
                    <path d="M50 10 C35 30, 20 55, 50 80 C80 55, 65 30, 50 10Z" fill="currentColor" />
                  </svg>
                  <p className="text-white text-2xl font-bold mt-4">Since 2014</p>
                  <p className="text-white/70 text-sm mt-1">Serving North East India</p>
                </div>
                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full" />
              </div>
            </div>

            {/* Text */}
            <div
              className={`transition-all duration-700 delay-200 ${
                visible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <span className="text-cyan font-semibold text-sm tracking-widest uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-3 mb-6">
                Clean Water for Every Home in North East India
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{settings?.about_story || "Barhamthuri Aqua Solutions was founded in 2014..."}</p>
                <p>
                  <strong>Mission: </strong>
                  {settings?.about_mission || "Providing safe, clean drinking water to every household..."}
                </p>
                <p>
                  <strong>Vision: </strong>
                  {settings?.about_vision || "To become the most trusted water solutions brand in North East India..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      {values.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50 anim-section" data-anim="values">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div
                  key={v.id}
                  className={`p-8 rounded-2xl bg-white shadow-sm border border-gray-100 card-hover text-center transition-all duration-700 ${
                    visible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <span className="text-4xl block mb-4">{v.icon}</span>
                  <h3 className="font-bold text-xl text-charcoal mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ TIMELINE ============ */}
      {milestones.length > 0 && (
        <section className="py-16 md:py-24 bg-white anim-section" data-anim="timeline">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-cyan font-semibold text-sm tracking-widest uppercase">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-3">
                Milestones
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ocean via-cyan to-ocean-light" />

              {milestones.map((m, i) => (
                <div
                  key={m.id}
                  className={`relative flex items-start mb-10 last:mb-0 transition-all duration-700 ${
                    visible.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 -ml-1.5 mt-2 rounded-full bg-cyan border-4 border-white shadow-md z-10" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 card-hover">
                      <span className="text-cyan font-bold text-lg">{m.year}</span>
                      <h4 className="font-bold text-charcoal mt-1">{m.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{m.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CONTACT SECTION ============ */}
      <section className="py-16 md:py-24 bg-gray-50 anim-section" data-anim="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-cyan font-semibold text-sm tracking-widest uppercase">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-3 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
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
                <div className="bg-white rounded-3xl shadow-xl p-10 text-center animate-scale-in">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">Message Sent! ✉️</h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false)
                      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' })
                    }}
                    className="px-6 py-3 bg-ocean text-white font-semibold rounded-xl btn-liquid"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="c-name" className="form-label">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="c-name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        className={`form-input ${contactErrors.name ? 'border-red-400' : ''}`}
                        placeholder="Your name"
                      />
                      {contactErrors.name && (
                        <p className="text-red-400 text-xs mt-1">{contactErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="form-label">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="c-email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        className={`form-input ${contactErrors.email ? 'border-red-400' : ''}`}
                        placeholder="your@email.com"
                      />
                      {contactErrors.email && (
                        <p className="text-red-400 text-xs mt-1">{contactErrors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="c-phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        id="c-phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        className="form-input"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-subject" className="form-label">Subject</label>
                      <input
                        type="text"
                        id="c-subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        className="form-input"
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-message" className="form-label">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      rows={5}
                      className={`form-input resize-none ${contactErrors.message ? 'border-red-400' : ''}`}
                      placeholder="Tell us how we can help..."
                    />
                    {contactErrors.message && (
                      <p className="text-red-400 text-xs mt-1">{contactErrors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 btn-liquid ${
                      submitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-ocean text-white'
                    }`}
                  >
                    {submitting ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
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
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-ocean/10 flex items-center justify-center text-2xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">Visit Us</h4>
                    <p className="text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: settings?.contact_address?.replace('\n', '<br/>') || "Ward-4,Bihpuria, Lakhimpur<br/>Assam 784161, India" }}>
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-2xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">Call Us</h4>
                    <a href={`tel:${settings?.contact_phone || "+918753953744"}`} className="text-gray-500 hover:text-ocean transition-colors text-sm">
                      {settings?.contact_phone || "+91 8753953744"}
                    </a>
                    <p className="text-gray-400 text-xs mt-1">Mon–Sat, 9am–7pm</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">Email Us</h4>
                    <a href={`mailto:${settings?.contact_email || "barhamthuriaquasolutions@gmail.com"}`} className="text-gray-500 hover:text-ocean transition-colors text-sm">
                      {settings?.contact_email || "barhamthuriaquasolutions@gmail.com"}
                    </a>
                    <p className="text-gray-400 text-xs mt-1">We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number}` : "https://wa.me/918753953744"}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-50 rounded-2xl p-6 shadow-sm border border-green-100 card-hover group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-2xl flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1 group-hover:text-green-600 transition-colors">
                      WhatsApp
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Quick chat for instant support
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-64 md:h-72 w-full relative">
                <iframe
                  title="Barhamthuri Aqua Solutions Location"
                  src="https://maps.google.com/maps?q=27.0130682,93.9164899&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
