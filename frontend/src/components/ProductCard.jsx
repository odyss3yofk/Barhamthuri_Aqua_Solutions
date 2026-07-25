import { Link } from 'react-router-dom'
import { formatPrice, getImageUrl } from '../utils/api'

const getCategoryColor = (category) => {
  const cat = (category || '').toUpperCase()
  if (cat === 'DOMESTIC') return 'text-sky-400 bg-sky-400/10 border-sky-400/20'
  if (cat === 'INDUSTRIAL') return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
  if (cat === 'CHIMNEY') return 'text-purple-400 bg-purple-400/10 border-purple-400/20'
  if (cat === 'SPARES') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
  return 'text-accent bg-accent/10 border-accent/20'
}

const getCategoryLabel = (category) => {
  const cat = (category || '').toUpperCase()
  if (cat === 'DOMESTIC') return 'Domestic'
  if (cat === 'INDUSTRIAL') return 'Industrial'
  if (cat === 'CHIMNEY') return 'Chimney'
  if (cat === 'SPARES') return 'Spares'
  return category || ''
}

const ProductCard = ({ product }) => {
  return (
    <Link 
      to={`/products/${product.slug}`} 
      className="card-dark bg-surface border border-white/7 rounded-2xl overflow-hidden group flex flex-col h-full transition-all duration-300 hover:border-accent/30"
    >
      <div className="relative h-48 w-full overflow-hidden bg-elevated">
        {product.image ? (
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-elevated to-void flex items-center justify-center">
            <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2C7 6 4 11 4 15.5a8 8 0 0016 0C20 11 17 6 12 2z" />
            </svg>
          </div>
        )}
        
        {product.category && (
          <div className="absolute top-4 left-4">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-md ${getCategoryColor(product.category)}`}>
              {getCategoryLabel(product.category)}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-ink-1 mb-2 group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-ink-2 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description || 'Premium water purification system designed for optimal performance.'}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/7">
          <span className="text-accent font-bold">
            {formatPrice(product.price)}
          </span>
          
          <span className="text-ink-2 group-hover:text-accent transition-colors">
            <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
