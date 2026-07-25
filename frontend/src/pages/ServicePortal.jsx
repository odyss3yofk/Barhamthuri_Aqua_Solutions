import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import { submitServiceInquiry } from '../utils/api'

const serviceTypes = [
  { value: '', label: 'Select Service Type' },
  { value: 'installation', label: 'New Installation' },
  { value: 'repair', label: 'Repair / Breakdown' },
  { value: 'checkup', label: 'Annual Checkup / AMC' },
  { value: 'emergency', label: 'Emergency Service' },
]

const serviceCards = [
  {
    type: 'repair',
    icon: '🔧',
    title: 'Repair Service',
    desc: 'Quick diagnosis and repair for all brands of water purifiers and kitchen chimneys. Same-day service in Guwahati.',
    color: 'from-blue-500/10 to-sky/10',
  },
  {
    type: 'installation',
    icon: '⚙️',
    title: 'Installation',
    desc: 'Professional installation by certified technicians with proper plumbing, water quality testing, and user training.',
    color: 'from-accent/10 to-accent-bright/10',
  },
  {
    type: 'checkup',
    icon: '📋',
    title: 'AMC Plans',
    desc: 'Annual Maintenance Contracts with scheduled visits, free filter replacements, and priority support.',
    color: 'from-purple-500/10 to-blue-500/10',
  },
  {
    type: 'emergency',
    icon: '🚨',
    title: 'Emergency',
    desc: '24/7 emergency service for water purifier breakdowns. Response within 4 hours in Guwahati metro area.',
    color: 'from-red-500/10 to-orange-500/10',
  },
]

export default function ServicePortal() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    preferredDate: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleCardClick = (type) => {
    setFormData((prev) => ({ ...prev, serviceType: type }))
    if (errors.serviceType) {
      setErrors((prev) => ({ ...prev, serviceType: '' }))
    }
    const formElement = document.getElementById('booking-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(formData.phone.trim()))
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address'
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type'
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred date'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitting(true)
    
    try {
      await submitServiceInquiry(formData)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit booking. Please try again or call us.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceType: '',
      preferredDate: '',
      message: '',
    })
    setErrors({})
    setSubmitted(false)
  }

  // Minimum date = today
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="bg-void min-h-screen">
      <SEOHead
        title="Book Service — Installation, Repair & AMC"
        description="Book water purifier installation, repair, maintenance or emergency service in Assam. Expert technicians, same-day service in Guwahati. Call now!"
        keywords="water purifier service Assam, RO repair Guwahati, water purifier installation, AMC water purifier, emergency water purifier repair"
      />

      {/* Hero */}
      <section className="page-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 text-center">
          <span className="text-accent text-xs font-semibold tracking-widest uppercase">Service Portal</span>
          <h1 className="display-font text-4xl md:text-5xl lg:text-6xl font-bold text-ink-1 mt-4 mb-4">
            Expert Maintenance & Repair
          </h1>
          <p className="text-ink-2 text-lg md:text-xl max-w-2xl mx-auto">
            Just a booking away. Our certified technicians are ready to help.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">
              What We Offer
            </span>
            <h2 className="display-font text-3xl md:text-4xl font-bold text-ink-1 mt-3">
              Our Services
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full accent-line"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((card, i) => (
              <div
                key={card.title}
                onClick={() => handleCardClick(card.type)}
                className={`p-7 rounded-2xl bg-surface border border-white/10 text-center animate-fade-in cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] bg-gradient-to-br ${card.color}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl block mb-4">{card.icon}</span>
                <h3 className="font-bold text-lg text-ink-1 mb-2">
                  {card.title}
                </h3>
                <p className="text-ink-3 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="py-12 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-void to-surface opacity-50"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">
              Get Started
            </span>
            <h2 className="display-font text-3xl md:text-4xl font-bold text-ink-1 mt-3 mb-3">
              Book a Service
            </h2>
            <p className="text-ink-2 max-w-lg mx-auto">
              Fill in the details below and our team will get back to you within
              2 hours during business hours.
            </p>
          </div>

          {submitted ? (
            /* Success State */
            <div className="bg-surface border border-accent/20 rounded-3xl p-10 md:p-14 text-center animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-ink-1 mb-3">
                Booking Submitted! 🎉
              </h3>
              <p className="text-ink-2 mb-2">
                Thank you, <strong className="text-ink-1">{formData.name}</strong>! Your service request
                has been received.
              </p>
              <p className="text-ink-3 text-sm mb-8">
                Our team will contact you at <strong className="text-ink-2">{formData.phone}</strong>{' '}
                within 2 hours to confirm the appointment.
              </p>
              <button
                onClick={resetForm}
                className="px-8 py-3 btn-primary w-full md:w-auto"
              >
                Book Another Service
              </button>
            </div>
          ) : (
            /* Form */
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 space-y-6"
              noValidate
            >
              {submitError && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-medium mb-6">
                  {submitError}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="form-label text-ink-2 block mb-2 text-sm">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input w-full bg-void border ${errors.name ? 'border-red-400' : 'border-white/10'} rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="form-label text-ink-2 block mb-2 text-sm">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input w-full bg-void border ${errors.phone ? 'border-red-400' : 'border-white/10'} rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all`}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label text-ink-2 block mb-2 text-sm">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input w-full bg-void border ${errors.email ? 'border-red-400' : 'border-white/10'} rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Service Type */}
                <div>
                  <label htmlFor="serviceType" className="form-label text-ink-2 block mb-2 text-sm">
                    Service Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`form-input w-full bg-void border ${errors.serviceType ? 'border-red-400' : 'border-white/10'} rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all`}
                  >
                    {serviceTypes.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-surface text-ink-1">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className="text-red-400 text-xs mt-1">{errors.serviceType}</p>
                  )}
                </div>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="preferredDate" className="form-label text-ink-2 block mb-2 text-sm">
                  Preferred Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={today}
                  className={`form-input w-full bg-void border ${errors.preferredDate ? 'border-red-400' : 'border-white/10'} rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all [color-scheme:dark]`}
                />
                {errors.preferredDate && (
                  <p className="text-red-400 text-xs mt-1">{errors.preferredDate}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="form-label text-ink-2 block mb-2 text-sm">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-input w-full bg-void border border-white/10 rounded-xl px-4 py-3 text-ink-1 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  placeholder="Describe your issue or requirements..."
                />
              </div>

              {/* Submit */}
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
                    Submitting...
                  </span>
                ) : (
                  'Submit Booking Request'
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
