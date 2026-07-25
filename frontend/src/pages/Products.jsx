import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../utils/api'

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Domestic Purifiers', value: 'DOMESTIC' },
  { label: 'Industrial RO', value: 'INDUSTRIAL' },
  { label: 'Chimneys', value: 'CHIMNEY' },
  { label: 'Spare Parts', value: 'SPARES' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') || ''
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

  const handleCategoryChange = (val) => {
    setActiveCategory(val)
    if (val === '') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: val })
    }
  }

  return (
    <div className="bg-void min-h-screen">
      <SEOHead
        title="Water Purifiers & Kitchen Chimneys — Products"
        description="Browse our complete range of domestic water purifiers, industrial RO plants, kitchen chimneys, and spare parts. Best prices in Assam with expert installation."
        keywords="buy water purifier Assam, industrial RO plant Guwahati, kitchen chimney price, water purifier spare parts, iron remover North East India"
      />

      <section className="page-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <span className="text-accent text-xs font-semibold tracking-widest uppercase">Catalog</span>
          <h1 className="display-font text-4xl md:text-5xl lg:text-6xl font-bold text-ink-1 mt-4 mb-4">
            Our Products
          </h1>
          <p className="text-ink-2 text-lg max-w-2xl mx-auto">
            From home purifiers to industrial RO plants — find the perfect water
            solution for your needs.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-void">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    isActive
                      ? 'bg-accent text-void border-accent shadow-[0_0_15px_rgba(45,212,191,0.3)]'
                      : 'bg-surface text-ink-2 border-border hover:bg-elevated hover:text-ink-1 hover:border-border-accent'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
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
                className="animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && !animating && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block opacity-50">🔍</span>
              <h3 className="text-xl font-semibold text-ink-1 mb-2">
                No products found
              </h3>
              <p className="text-ink-3">
                Try selecting a different category.
              </p>
            </div>
          )}

          {/* Results count */}
          {!animating && filteredProducts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-surface border border-border text-ink-2 text-sm">
                {`Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
