import { useState } from 'react'
import SEOHead from '../components/SEOHead'

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
    color: 'from-blue-500/10 to-ocean/10',
  },
  {
    type: 'installation',
    icon: '⚙️',
    title: 'Installation',
    desc: 'Professional installation by certified technicians with proper plumbing, water quality testing, and user training.',
    color: 'from-cyan/10 to-cyan-light/10',
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1500)
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
    <>
      <SEOHead
        title="Book Service — Installation, Repair & AMC"
        description="Book water purifier installation, repair, maintenance or emergency service in Assam. Expert technicians, same-day service in Guwahati. Call now!"
        keywords="water purifier service Assam, RO repair Guwahati, water purifier installation, AMC water purifier, emergency water purifier repair"
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-ocean via-ocean-light to-cyan overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-10 left-20 w-24 h-24 rounded-full bg-cyan-light/10 animate-float-slow" />

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 100" className="w-full h-12 md:h-16" preserveAspectRatio="none">
            <path d="M0,60 C480,100,960,20,1440,60 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Service Portal
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Expert maintenance and repair — just a booking away. Our certified
            technicians are ready to help.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cyan font-semibold text-sm tracking-widest uppercase">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-3">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((card, i) => (
              <div
                key={card.title}
                onClick={() => handleCardClick(card.type)}
                className={`p-7 rounded-2xl bg-gradient-to-br ${card.color} border border-gray-100 card-hover text-center animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl block mb-4">{card.icon}</span>
                <h3 className="font-bold text-lg text-charcoal mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cyan font-semibold text-sm tracking-widest uppercase">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-3 mb-3">
              Book a Service
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Fill in the details below and our team will get back to you within
              2 hours during business hours.
            </p>
          </div>

          {submitted ? (
            /* Success State */
            <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14 text-center animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-3">
                Booking Submitted! 🎉
              </h3>
              <p className="text-gray-500 mb-2">
                Thank you, <strong>{formData.name}</strong>! Your service request
                has been received.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                Our team will contact you at <strong>{formData.phone}</strong>{' '}
                within 2 hours to confirm the appointment.
              </p>
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-ocean text-white font-semibold rounded-xl btn-liquid"
              >
                Book Another Service
              </button>
            </div>
          ) : (
            /* Form */
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-6"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'border-red-400' : ''}`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'border-red-400' : ''}`}
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
                  <label htmlFor="email" className="form-label">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Service Type */}
                <div>
                  <label htmlFor="serviceType" className="form-label">
                    Service Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`form-input ${errors.serviceType ? 'border-red-400' : ''}`}
                  >
                    {serviceTypes.map((opt) => (
                      <option key={opt.value} value={opt.value}>
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
                <label htmlFor="preferredDate" className="form-label">
                  Preferred Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={today}
                  className={`form-input ${errors.preferredDate ? 'border-red-400' : ''}`}
                />
                {errors.preferredDate && (
                  <p className="text-red-400 text-xs mt-1">{errors.preferredDate}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="form-label">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Describe your issue or requirements..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 btn-liquid ${
                  submitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-ocean text-white hover:shadow-xl'
                }`}
              >
                {submitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
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
    </>
  )
}
