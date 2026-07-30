import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ProductCard from '../components/ProductCard'
import { fetchProductBySlug, fetchProducts, formatPrice, getImageUrl } from '../utils/api'

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
      <div className="min-h-screen bg-void flex items-center justify-center pt-20">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <h2 className="text-xl font-semibold text-ink-1">Loading product...</h2>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center pt-20">
        <div className="text-center">
          <span className="text-6xl mb-4 block opacity-50">😕</span>
          <h2 className="text-2xl font-bold text-ink-1 mb-2">
            Product Not Found
          </h2>
          <p className="text-ink-3 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="btn-primary inline-block"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-void min-h-screen pb-20">
      <SEOHead
        title={`${product.name} — ${product.category}`}
        description={product.description}
        keywords={`${product.name}, ${product.category} water purifier, buy water purifier Assam, ${product.category === 'Industrial' ? 'industrial RO plant Guwahati' : 'best water purifier Guwahati'}`}
      />

      {/* Breadcrumb */}
      <section className="pt-28 pb-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-ink-3">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
            <span>/</span>
            <span className="text-ink-1 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            {/* Image Area */}
            <div className="animate-fade-in">
              {product.image ? (
                <div className="relative rounded-2xl overflow-hidden bg-surface border border-border aspect-square max-h-[500px] flex items-center justify-center p-8 glass-card">
                  <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-elevated border border-border-accent text-accent">
                      {product.category_display || product.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-surface border border-border aspect-square max-h-[500px] flex items-center justify-center glass-card">
                  <div className="text-border">
                    <svg viewBox="0 0 100 100" className="w-40 h-40 md:w-56 md:h-56 animate-float-slow">
                      <path d="M50 10 C35 30, 20 55, 50 80 C80 55, 65 30, 50 10Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-elevated border border-border-accent text-accent">
                      {product.category_display || product.category}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="animate-fade-in delay-100">
              <div className="lg:sticky lg:top-32">
                <h1 className="display-font text-3xl md:text-4xl lg:text-5xl font-bold text-ink-1 mb-4">
                  {product.name}
                </h1>

                <div className="text-3xl md:text-4xl font-black text-accent mb-6">
                  {formatPrice(product.price)}
                </div>

                <p className="text-ink-2 leading-relaxed text-lg mb-8">
                  {product.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link
                    to="/service#booking-form"
                    className="btn-primary flex-1 py-4 px-6 text-center justify-center text-lg shadow-[0_0_20px_rgba(45,212,191,0.2)] rounded-xl font-bold"
                  >
                    Book Installation
                  </Link>
                  <a
                    href="https://wa.me/918753953744"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 px-6 flex items-center justify-center gap-3 text-lg rounded-xl font-bold bg-[#25D366] text-white hover:bg-[#1ebd5a] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                  >
                    <img src="/assets/WhatsApp_icon.png" alt="WhatsApp" className="w-6 h-6 object-contain" />
                    Enquire on WhatsApp
                  </a>
                </div>

                {/* Specifications Area */}
                {product.specifications && (
                  <div className="bg-surface rounded-2xl border border-border overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-elevated">
                      <h3 className="text-ink-1 font-bold text-lg flex items-center gap-2">
                        <span className="w-1 h-5 bg-accent rounded-full inline-block"></span>
                        Specifications
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-ink-2 leading-relaxed whitespace-pre-wrap">
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
        <section className="py-16 md:py-20 bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center gap-4">
              <h2 className="display-font text-2xl md:text-3xl font-bold text-ink-1">
                Related Products
              </h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
