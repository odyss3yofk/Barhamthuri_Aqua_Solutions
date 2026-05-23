import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ProductCard from '../components/ProductCard'
import { fetchProductBySlug, fetchProducts, formatPrice } from '../utils/api'

const gradientStyles = {
  'product-gradient-1': 'from-ocean to-cyan',
  'product-gradient-2': 'from-ocean-light to-cyan-light',
  'product-gradient-3': 'from-ocean-dark to-cyan-dark',
  'product-gradient-4': 'from-cyan to-ocean',
}

const categoryColors = {
  Domestic: 'bg-blue-100 text-blue-800',
  Industrial: 'bg-amber-100 text-amber-800',
  Chimneys: 'bg-purple-100 text-purple-800',
  Spares: 'bg-green-100 text-green-800',
}

export default function ProductDetails() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const data = await fetchProductBySlug(slug)
      if (data) {
        setProduct(data)
        // Fetch related products (same category)
        const allProds = await fetchProducts(data.category)
        const rel = allProds.filter(p => p.slug !== slug).slice(0, 4)
        setRelated(rel)
      } else {
        setProduct(null)
      }
      setLoading(false)
    }
    loadData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-ocean mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <h2 className="text-xl font-semibold text-charcoal">Loading product...</h2>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <span className="text-6xl mb-4 block">😕</span>
          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-ocean text-white font-semibold rounded-xl btn-liquid"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const gradientClass = 'from-ocean to-cyan' // Default since we don't store gradient in DB anymore
  const badgeClass = categoryColors[product.category] || 'bg-gray-100 text-gray-800'

  return (
    <>
      <SEOHead
        title={`${product.name} — ${product.category}`}
        description={product.description}
        keywords={`${product.name}, ${product.category} water purifier, buy water purifier Assam, ${product.category === 'Industrial' ? 'industrial RO plant Guwahati' : 'best water purifier Guwahati'}`}
      />

      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-ocean transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-ocean transition-colors">Products</Link>
            <span>/</span>
            <span className="text-ocean font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Image Area */}
            <div className="animate-fade-in-left">
              {product.image ? (
                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-square max-h-[500px] flex items-center justify-center bg-white border border-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${badgeClass}`}>
                      {product.category_display || product.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradientClass} aspect-square max-h-[500px] flex items-center justify-center`}>
                  <div className="text-white/15">
                    <svg viewBox="0 0 100 100" className="w-40 h-40 md:w-56 md:h-56 animate-float-slow">
                      <path d="M50 10 C35 30, 20 55, 50 80 C80 55, 65 30, 50 10Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${badgeClass}`}>
                      {product.category_display || product.category}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="animate-fade-in-right">
              <div className="lg:sticky lg:top-28">
                <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
                    {product.category_display || product.category}
                  </span>
                </div>

                <div className="text-4xl font-black text-ocean mb-6">
                  {formatPrice(product.price)}
                </div>

                <p className="text-gray-600 leading-relaxed text-base mb-8">
                  {product.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link
                    to="/service"
                    className="flex-1 px-6 py-4 bg-ocean text-white font-bold rounded-xl text-center btn-liquid text-lg inline-flex items-center justify-center group"
                  >
                    Book Installation
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <a
                    href="https://wa.me/918753953744"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 border-2 border-green-500 text-green-600 font-bold rounded-xl text-center hover:bg-green-500 hover:text-white transition-all duration-300 text-lg inline-flex items-center justify-center"
                  >
                    💬 Enquire on WhatsApp
                  </a>
                </div>

                {/* Specifications Text Area */}
                {product.specifications && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-ocean to-ocean-light">
                      <h3 className="text-white font-bold text-lg">Specifications</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {product.specifications}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                You May Also Like
              </h2>
              <p className="text-gray-500 mt-2">
                Explore more products from our range
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
