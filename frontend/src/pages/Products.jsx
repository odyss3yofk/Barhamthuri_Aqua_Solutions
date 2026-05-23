import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../utils/api'
import { categories, getCategoryIcon } from '../data/products'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') || 'All'
  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [animating, setAnimating] = useState(false)
  const gridRef = useRef(null)

  useEffect(() => {
    let active = true;
    const loadProducts = async () => {
      setAnimating(true)
      const data = await fetchProducts(activeCategory)
      if (active) {
        setFilteredProducts(data)
        setAnimating(false)
      }
    }
    loadProducts()
    return () => { active = false }
  }, [activeCategory])

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    if (cat === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ cat })
    }
  }

  return (
    <>
      <SEOHead
        title="Water Purifiers & Kitchen Chimneys — Products"
        description="Browse our complete range of domestic water purifiers, industrial RO plants, kitchen chimneys, and spare parts. Best prices in Assam with expert installation."
        keywords="buy water purifier Assam, industrial RO plant Guwahati, kitchen chimney price, water purifier spare parts, iron remover North East India"
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-ocean via-ocean-light to-cyan overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-cyan-light/10 animate-float-slow" />

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 100" className="w-full h-12 md:h-16" preserveAspectRatio="none">
            <path d="M0,60 C480,100,960,20,1440,60 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            From home purifiers to industrial RO plants — find the perfect water
            solution for your needs.
          </p>
        </div>
      </section>

      {/* Category Tabs + Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`tab-underline px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-ocean text-white shadow-lg shadow-ocean/20 active'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1.5">{getCategoryIcon(cat)}</span>
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div
            ref={gridRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 transition-all duration-300 ${
              animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && !animating && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category.
              </p>
            </div>
          )}

          {/* Results count */}
          {!animating && filteredProducts.length > 0 && (
            <p className="text-center text-gray-400 text-sm mt-10">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 && 's'}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
