import { useEffect } from 'react'

export default function SEOHead({
  title = 'Barhamthuri Aqua Solutions',
  description = 'Best water purifiers, industrial RO plants, iron removers and kitchen chimneys in Assam & North East India. Pure water, pure life.',
  keywords = 'Water purifier Assam, Iron remover Assam, Aqua Guard Assam, RO plant Guwahati, best water filter North East India',
}) {
  const fullTitle = title.includes('Barhamthuri')
    ? title
    : `${title} | Barhamthuri Aqua Solutions`

  useEffect(() => {
    // Safely update document title
    document.title = fullTitle

    // Safely update or create meta tags
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    updateMeta('description', description)
    updateMeta('keywords', keywords)
    updateMeta('og:title', fullTitle, true)
    updateMeta('og:description', description, true)
    updateMeta('og:type', 'website', true)
    updateMeta('robots', 'index, follow')
  }, [fullTitle, description, keywords])

  return null
}
