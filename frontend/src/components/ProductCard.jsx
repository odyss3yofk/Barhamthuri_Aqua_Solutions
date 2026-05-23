import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'

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

export default function ProductCard({ product }) {
  const gradientClass = gradientStyles[product.gradient] || 'from-ocean to-cyan'
  const badgeClass = categoryColors[product.category] || 'bg-gray-100 text-gray-800'

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block card-hover rounded-2xl bg-white shadow-md overflow-hidden"
    >
      {/* Image placeholder with gradient */}
      <div
        className={`relative h-48 sm:h-52 bg-gradient-to-br ${gradientClass} overflow-hidden`}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/20 group-hover:text-white/30 transition-colors duration-500">
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 animate-float-slow"
            >
              <path
                d="M50 10 C35 30, 20 55, 50 80 C80 55, 65 30, 50 10Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {product.category}
          </span>
        </div>
        {/* Featured badge */}
        {product.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900">
              ⭐ Featured
            </span>
          </div>
        )}
        {/* Bottom overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-charcoal group-hover:text-ocean transition-colors duration-300 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-ocean">
            {formatPrice(product.price)}
          </span>
          <span className="inline-flex items-center text-sm font-medium text-cyan group-hover:text-ocean transition-colors duration-300">
            Details
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
