import { Helmet } from 'react-helmet-async'

export default function SEOHead({
  title = 'Barhamthuri Aqua Solutions',
  description = 'Best water purifiers, industrial RO plants, iron removers and kitchen chimneys in Assam & North East India. Pure water, pure life.',
  keywords = 'water purifier Assam, RO plant Guwahati, iron remover North East India, kitchen chimney Assam',
}) {
  const fullTitle = title.includes('Barhamthuri')
    ? title
    : `${title} | Barhamthuri Aqua Solutions`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}
