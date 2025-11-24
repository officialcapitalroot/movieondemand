import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import moviesData from '../../data/request.json'
import ShortICUPlayer from '../../components/ShortICUPlayer'
import DailymotionPlayer from '../../components/DailymotionPlayer'
import Header from '../../components/Header'
import { RelatedMoviesGrid } from '../../components/RelatedMovieCard'

export default function MoviePage() {
  const router = useRouter()
  const { slug } = router.query
  
  const movie = moviesData.find(m => m.slug === slug)
  const [imageError, setImageError] = useState(false)

  if (router.isFallback) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
          <Link href="/" className="text-red-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/categories' },
    { name: movie.category, href: `/categories?category=${movie.category}` },
    { name: movie.title, href: `#` },
  ]

  const renderVideoPlayer = () => {
    if (movie.videoSource === 'dailymotion') {
      return <DailymotionPlayer videoId={movie.videoId} title={movie.title} autoplay={false} />
    } else {
      return <ShortICUPlayer videoId={movie.videoId} title={movie.title} />
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4 py-8">
          <nav className="py-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center space-x-2 text-sm">
              {breadcrumbItems.map((item, index) => (
                <li key={item.name} className="flex items-center">
                  {index > 0 && <span className="text-gray-500 mx-2">/</span>}
                  {index === breadcrumbItems.length - 1 ? (
                    <span className="text-gray-300" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <section className="mb-8" aria-labelledby="player-heading">
            <h2 id="player-heading" className="sr-only">
              Video Player for {movie.title}
            </h2>
            {renderVideoPlayer()}
          </section>

          <section className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <header className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-white">
                  {movie.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {movie.rating}
                  </span>
                  <span>{movie.releaseYear}</span>
                  <span>{formatDuration(movie.duration)}</span>
                  <span className="border border-gray-400 px-2 py-1 rounded text-xs">
                    {movie.quality}
                  </span>
                  <span>{movie.language}</span>
                </div>
                <p className="text-lg text-gray-200 leading-relaxed">
                  {movie.description}
                </p>
              </header>

              {/* <article className="article-content" itemScope itemType="https://schema.org/Movie">
                <div dangerouslySetInnerHTML={{ 
                  __html: generateUniqueArticleContent(movie) 
                }} />
              </article> */}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <Link href={movie.thumbnail} target="_blank">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4">
                    {!imageError ? (
                      <Image
                        src={movie.thumbnail}
                        alt={`Official poster for ${movie.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        priority
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400">Image not available</span>
                      </div>
                    )}
                  </div>
                </Link>
                <p className="text-sm text-gray-400">
                  Click to view full-size poster
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Movie Details</h3>
                <div className="space-y-3">
                  <DetailItem label="Release Year" value={movie.releaseYear} />
                  <DetailItem label="Genre" value={movie.genre} />
                  <DetailItem label="Rating" value={movie.rating} />
                  <DetailItem label="Quality" value={movie.quality} />
                  <DetailItem label="Duration" value={formatDuration(movie.duration)} />
                  <DetailItem label="Language" value={movie.language} />
                  <DetailItem label="Director" value={movie.director} />
                  <DetailItem label="Country" value={movie.country} />
                  <DetailItem label="File Size" value={movie.size} />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <span key={index} className="bg-black px-3 py-1 rounded text-sm hover:bg-red-600 transition cursor-pointer">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.tags.map((tag, index) => (
                    <Link 
                      key={index}
                      href={`/search?query=${encodeURIComponent(tag)}`}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <RelatedMoviesGrid
            movies={moviesData}
            currentMovieId={movie.id}
            title="More Movies You'll Love"
            autoRotate={true}
          />

          <RelatedMoviesGrid
            movies={moviesData.filter(m => m.category === movie.category)}
            currentMovieId={movie.id}
            title={`More ${movie.category} Movies`}
          />

          <RelatedMoviesGrid
            movies={moviesData.filter(m => 
              m.genre.split(', ').some(g => movie.genre.includes(g))
            )}
            currentMovieId={movie.id}
            title={`Similar ${movie.genre.split(',')[0]} Movies`}
          />

          {/* <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Movie',
                name: movie.title,
                description: movie.description,
                image: movie.thumbnail,
                dateCreated: movie.uploadDate,
                director: {
                  '@type': 'Person',
                  name: movie.director
                },
                actor: movie.cast.map(actor => ({
                  '@type': 'Person',
                  name: actor
                })),
                genre: movie.genre.split(', '),
                duration: movie.duration,
                contentRating: movie.rating,
                copyrightYear: movie.releaseYear,
                countryOfOrigin: movie.country,
                inLanguage: movie.language,
                typicalAgeRange: '18+'
              })
            }}
          /> */}

          {/* <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": `${movie.title} - Complete Movie Review & Analysis`,
                "description": `Watch ${movie.title} online free. ${movie.description.substring(0, 150)}...`,
                "image": movie.thumbnail,
                "datePublished": movie.uploadDate,
                "dateModified": new Date().toISOString(),
                "author": {
                  "@type": "Organization",
                  "name": "Movie On Demand",
                  "url": "https://movieondemand.vercel.app"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Movie On Demand",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://movieondemand.vercel.app/logo.png"
                  }
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://movieondemand.vercel.app/movie/${movie.slug}`
                },
                "articleBody": `${movie.description} ${generatePlainTextArticleContent(movie)}`,
                "keywords": movie.tags.join(', '),
                "genre": movie.genre,
                "articleSection": "Movie Reviews",
                "wordCount": calculateWordCount(movie)
              })
            }}
          /> */}
        </div>
      </main>
    </>
  )
}

function DetailItem({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-700 last:border-b-0">
      <span className="text-gray-300">{label}:</span>
      <span className="text-white">{value || 'N/A'}</span>
    </div>
  )
}

function formatDuration(duration) {
  if (!duration) return 'N/A'
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm').replace('S', 's')
}

function generatePlainTextArticleContent(movie) {
  const plotExpansion = generatePlotExpansion(movie).replace(/<[^>]*>/g, ' ')
  const characterAnalysis = generateCharacterAnalysis(movie).replace(/<[^>]*>/g, ' ')
  const productionInsights = generateProductionInsights(movie).replace(/<[^>]*>/g, ' ')
  const criticalReception = generateCriticalReception(movie).replace(/<[^>]*>/g, ' ')
  const viewerRecommendation = generateViewerRecommendation(movie).replace(/<[^>]*>/g, ' ')
  
  return `${plotExpansion} ${characterAnalysis} ${productionInsights} ${criticalReception} ${viewerRecommendation}`
}

function calculateWordCount(movie) {
  const content = `${movie.description} ${generatePlainTextArticleContent(movie)}`
  return content.split(/\s+/).filter(word => word.length > 0).length
}

function generateUniqueArticleContent(movie) {
  const plotExpansion = generatePlotExpansion(movie)
  const characterAnalysis = generateCharacterAnalysis(movie)
  const productionInsights = generateProductionInsights(movie)
  const criticalReception = generateCriticalReception(movie)
  const viewerRecommendation = generateViewerRecommendation(movie)

  return `
    <div class="space-y-8">
      <section>
        <h2 class="text-2xl font-bold mb-4 text-white">Plot Summary</h2>
        ${plotExpansion}
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4 text-white">Character Analysis</h2>
        ${characterAnalysis}
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4 text-white">Production Insights</h2>
        ${productionInsights}
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4 text-white">Critical Reception</h2>
        ${criticalReception}
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4 text-white">Why You Should Watch</h2>
        ${viewerRecommendation}
      </section>
    </div>
  `
}

function generatePlotExpansion(movie) {
  const genres = movie.genre.toLowerCase().split(', ')
  const isAction = genres.includes('action')
  const isDrama = genres.includes('drama')
  const isThriller = genres.includes('thriller')
  const isRomance = genres.includes('romance')

  let plot = `<p class="text-gray-300 leading-relaxed mb-4">${movie.description}</p>`
  
  if (isAction && isThriller) {
    plot += `
      <p class="text-gray-300 leading-relaxed mb-4">
        The film masterfully blends heart-pounding action sequences with psychological tension, 
        keeping viewers on the edge of their seats throughout the narrative. As the story unfolds, 
        unexpected twists and revelations challenge both the characters and the audience's perceptions.
      </p>
      <p class="text-gray-300 leading-relaxed">
        The climax delivers a satisfying resolution while leaving room for contemplation about 
        the deeper themes explored throughout the movie, making it more than just a typical 
        action thriller.
      </p>
    `
  } else if (isDrama && isRomance) {
    plot += `
      <p class="text-gray-300 leading-relaxed mb-4">
        This emotional journey explores the complexities of human relationships with remarkable 
        depth and sensitivity. The characters' struggles and triumphs are portrayed with such 
        authenticity that viewers can't help but become emotionally invested in their stories.
      </p>
      <p class="text-gray-300 leading-relaxed">
        The narrative beautifully captures the nuances of love and connection, making it a 
        profoundly moving experience that resonates long after the credits roll.
      </p>
    `
  } else {
    plot += `
      <p class="text-gray-300 leading-relaxed mb-4">
        The narrative unfolds with meticulous pacing, allowing each story beat to land with 
        maximum impact. Director ${movie.director} demonstrates a keen understanding of 
        visual storytelling, using cinematography and editing to enhance the emotional 
        weight of each scene.
      </p>
      <p class="text-gray-300 leading-relaxed">
        As the plot progresses, layers of complexity are revealed, transforming what might 
        have been a straightforward story into a rich, multi-faceted exploration of its 
        central themes and character motivations.
      </p>
    `
  }

  return plot
}

function generateCharacterAnalysis(movie) {
  const mainCast = movie.cast.slice(0, 3)
  
  return `
    <div class="space-y-4">
      <p class="text-gray-300 leading-relaxed">
        The ensemble cast delivers powerful performances that bring depth and authenticity to their characters. 
        Each actor embodies their role with such conviction that the characters feel genuinely lived-in and real.
      </p>
      <div class="bg-gray-800 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2 text-white">Key Performances:</h3>
        <ul class="list-disc list-inside space-y-1 text-gray-300">
          ${mainCast.map(actor => `
            <li><strong>${actor}</strong> delivers a standout performance that anchors the emotional core of the film</li>
          `).join('')}
        </ul>
      </div>
      <p class="text-gray-300 leading-relaxed">
        The character development throughout the film is particularly noteworthy, with each main character 
        undergoing significant growth and transformation that feels earned and authentic to their journey.
      </p>
    </div>
  `
}

function generateProductionInsights(movie) {
  return `
    <div class="space-y-4">
      <p class="text-gray-300 leading-relaxed">
        Directed by <strong>${movie.director}</strong>, this ${movie.releaseYear} production showcases 
        exceptional craftsmanship across all technical departments. The film's visual language is 
        carefully constructed to support the narrative and enhance the emotional impact of each scene.
      </p>
      <p class="text-gray-300 leading-relaxed">
        The ${movie.quality} presentation ensures that viewers can appreciate the meticulous attention 
        to detail in every frame, from the carefully composed shots to the nuanced production design 
        that creates a fully immersive viewing experience.
      </p>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="bg-gray-800 p-3 rounded">
          <strong class="text-white">Runtime:</strong> ${formatDuration(movie.duration)}
        </div>
        <div class="bg-gray-800 p-3 rounded">
          <strong class="text-white">Quality:</strong> ${movie.quality}
        </div>
      </div>
    </div>
  `
}

function generateCriticalReception(movie) {
  const rating = parseFloat(movie.rating.split('/')[0])
  
  let receptionText = ''
  if (rating >= 8) {
    receptionText = `With an impressive ${movie.rating} rating, the film has been widely praised by both critics and audiences alike. Reviewers have highlighted the exceptional performances, tight scripting, and masterful direction as standout elements that elevate the entire production.`
  } else if (rating >= 6) {
    receptionText = `Earning a solid ${movie.rating} rating, the film has received generally positive reviews from critics and viewers. The strong character development and engaging storyline have been particularly commended, though some critics noted areas where the execution could have been stronger.`
  } else {
    receptionText = `With a ${movie.rating} rating, the film has generated mixed reactions from audiences and critics. While many appreciate the ambitious scope and strong performances, some have pointed out narrative inconsistencies that prevent it from reaching its full potential.`
  }

  return `
    <div class="space-y-4">
      <p class="text-gray-300 leading-relaxed">
        ${receptionText}
      </p>
      <p class="text-gray-300 leading-relaxed">
        The film's ability to ${rating >= 7 ? 'consistently engage and surprise viewers' : 'maintain viewer interest despite its flaws'} 
        has been noted as one of its key strengths, demonstrating the filmmakers' commitment to 
        delivering a memorable cinematic experience.
      </p>
    </div>
  `
}

function generateViewerRecommendation(movie) {
  const genres = movie.genre.toLowerCase()
  
  return `
    <div class="space-y-4">
      <p class="text-gray-300 leading-relaxed">
        <strong>"${movie.title}"</strong> is essential viewing for fans of ${movie.genre} cinema. 
        The film offers a perfect blend of entertainment and substance, making it equally suitable 
        for casual viewers and cinephiles looking for depth and meaning in their movie experiences.
      </p>
      <div class="bg-gray-800 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2 text-white">Perfect for viewers who enjoy:</h3>
        <ul class="list-disc list-inside space-y-1 text-gray-300">
          <li>Compelling character-driven narratives</li>
          <li>${genres.includes('action') ? 'Well-choreographed action sequences' : 'Thought-provoking storytelling'}</li>
          <li>Emotional depth and authentic performances</li>
          <li>Movies that stay with you long after viewing</li>
        </ul>
      </div>
      <p class="text-gray-300 leading-relaxed">
        Whether you're looking for an engaging story, powerful performances, or simply quality 
        entertainment, this film delivers on all fronts and represents some of the best that 
        ${movie.releaseYear} cinema has to offer.
      </p>
    </div>
  `
}

export async function getStaticPaths() {
  const paths = moviesData.map(movie => ({
    params: { slug: movie.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const movie = moviesData.find(m => m.slug === params.slug)

  if (!movie) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      movie
    },
    revalidate: 3600
  }
}













// import { useRouter } from 'next/router'
// import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useState, useEffect } from 'react'
// import moviesData from '../../data/request.json'
// import ShortICUPlayer from '../../components/ShortICUPlayer'
// import DailymotionPlayer from '../../components/DailymotionPlayer'
// import Header from '../../components/Header'
// import { RelatedMoviesGrid } from '../../components/RelatedMovieCard'

// export default function MoviePage() {
//   const router = useRouter()
//   const { slug } = router.query
  
//   const movie = moviesData.find(m => m.slug === slug)
//   const [imageError, setImageError] = useState(false)

//   if (router.isFallback) {
//     return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>
//   }

//   if (!movie) {
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
//           <Link href="/" className="text-red-500 hover:underline">
//             Return to Home
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const handleImageError = () => {
//     setImageError(true)
//   }

//   const breadcrumbItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Movies', href: '/categories' },
//     { name: movie.category, href: `/categories?category=${movie.category}` },
//     { name: movie.title, href: `#` },
//   ]

//   const renderVideoPlayer = () => {
//     if (movie.videoSource === 'dailymotion') {
//       return <DailymotionPlayer videoId={movie.videoId} title={movie.title} autoplay={false} />
//     } else {
//       return <ShortICUPlayer videoId={movie.videoId} title={movie.title} />
//     }
//   }

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-black pt-20">
//         <div className="container mx-auto px-4 py-8">
//           <nav className="py-4" aria-label="Breadcrumb">
//             <ol className="flex flex-wrap items-center space-x-2 text-sm">
//               {breadcrumbItems.map((item, index) => (
//                 <li key={item.name} className="flex items-center">
//                   {index > 0 && <span className="text-gray-500 mx-2">/</span>}
//                   {index === breadcrumbItems.length - 1 ? (
//                     <span className="text-gray-300" aria-current="page">
//                       {item.name}
//                     </span>
//                   ) : (
//                     <Link 
//                       href={item.href}
//                       className="text-gray-400 hover:text-white transition-colors"
//                     >
//                       {item.name}
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ol>
//           </nav>

//           <section className="mb-8" aria-labelledby="player-heading">
//             <h2 id="player-heading" className="sr-only">
//               Video Player for {movie.title}
//             </h2>
//             {renderVideoPlayer()}
//           </section>

//           <section className="grid lg:grid-cols-3 gap-8 mb-12">
//             <div className="lg:col-span-2">
//               <header className="mb-6">
//                 <h1 className="text-4xl font-bold mb-2 text-white">
//                   {movie.title}
//                 </h1>
//                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
//                   <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                     {movie.rating}
//                   </span>
//                   <span>{movie.releaseYear}</span>
//                   <span>{formatDuration(movie.duration)}</span>
//                   <span className="border border-gray-400 px-2 py-1 rounded text-xs">
//                     {movie.quality}
//                   </span>
//                   <span>{movie.language}</span>
//                 </div>
//                 <p className="text-lg text-gray-200 leading-relaxed">
//                   {movie.description}
//                 </p>
//               </header>

//               <article className="article-content" itemScope itemType="https://schema.org/Movie">
//                 <div dangerouslySetInnerHTML={{ 
//                   __html: generateUniqueArticleContent(movie) 
//                 }} />
//               </article>
//             </div>

//             <div className="space-y-6">
//               <div className="bg-gray-800 rounded-lg p-4 text-center">
//                 <Link href={movie.thumbnail} target="_blank">
//                   <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4">
//                     {!imageError ? (
//                       <Image
//                         src={movie.thumbnail}
//                         alt={`Official poster for ${movie.title}`}
//                         fill
//                         sizes="(max-width: 768px) 100vw, 400px"
//                         className="object-cover hover:scale-105 transition-transform duration-300"
//                         priority
//                         onError={handleImageError}
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gray-800 flex items-center justify-center">
//                         <span className="text-gray-400">Image not available</span>
//                       </div>
//                     )}
//                   </div>
//                 </Link>
//                 <p className="text-sm text-gray-400">
//                   Click to view full-size poster
//                 </p>
//               </div>

//               <div className="bg-gray-800 rounded-lg p-6">
//                 <h3 className="text-xl font-bold mb-4 text-white">Movie Details</h3>
//                 <div className="space-y-3">
//                   <DetailItem label="Release Year" value={movie.releaseYear} />
//                   <DetailItem label="Genre" value={movie.genre} />
//                   <DetailItem label="Rating" value={movie.rating} />
//                   <DetailItem label="Quality" value={movie.quality} />
//                   <DetailItem label="Duration" value={formatDuration(movie.duration)} />
//                   <DetailItem label="Language" value={movie.language} />
//                   <DetailItem label="Director" value={movie.director} />
//                   <DetailItem label="Country" value={movie.country} />
//                   <DetailItem label="File Size" value={movie.size} />
//                 </div>
//               </div>

//               <div className="bg-gray-800 rounded-lg p-6">
//                 <h3 className="text-xl font-bold mb-4 text-white">Cast</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {movie.cast.map((actor, index) => (
//                     <span key={index} className="bg-black px-3 py-1 rounded text-sm hover:bg-red-600 transition cursor-pointer">
//                       {actor}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-gray-800 rounded-lg p-6">
//                 <h3 className="text-xl font-bold mb-4 text-white">Tags</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {movie.tags.map((tag, index) => (
//                     <Link 
//                       key={index}
//                       href={`/search?query=${encodeURIComponent(tag)}`}
//                       className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
//                     >
//                       {tag}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>

//           <RelatedMoviesGrid
//             movies={moviesData}
//             currentMovieId={movie.id}
//             title="More Movies You'll Love"
//             autoRotate={true}
//           />

//           <RelatedMoviesGrid
//             movies={moviesData.filter(m => m.category === movie.category)}
//             currentMovieId={movie.id}
//             title={`More ${movie.category} Movies`}
//           />

//           <RelatedMoviesGrid
//             movies={moviesData.filter(m => 
//               m.genre.split(', ').some(g => movie.genre.includes(g))
//             )}
//             currentMovieId={movie.id}
//             title={`Similar ${movie.genre.split(',')[0]} Movies`}
//           />

//           <script
//             type="application/ld+json"
//             dangerouslySetInnerHTML={{
//               __html: JSON.stringify({
//                 '@context': 'https://schema.org',
//                 '@type': 'Movie',
//                 name: movie.title,
//                 description: movie.description,
//                 image: movie.thumbnail,
//                 dateCreated: movie.uploadDate,
//                 director: {
//                   '@type': 'Person',
//                   name: movie.director
//                 },
//                 actor: movie.cast.map(actor => ({
//                   '@type': 'Person',
//                   name: actor
//                 })),
//                 genre: movie.genre.split(', '),
//                 duration: movie.duration,
//                 contentRating: movie.rating,
//                 copyrightYear: movie.releaseYear,
//                 countryOfOrigin: movie.country,
//                 inLanguage: movie.language,
//                 typicalAgeRange: '18+'
//               })
//             }}
//           />

//           <script
//             type="application/ld+json"
//             dangerouslySetInnerHTML={{
//               __html: JSON.stringify({
//                 "@context": "https://schema.org",
//                 "@type": "Article",
//                 "headline": `${movie.title} - Complete Movie Review & Analysis`,
//                 "description": `Watch ${movie.title} online free. ${movie.description.substring(0, 150)}...`,
//                 "image": movie.thumbnail,
//                 "datePublished": movie.uploadDate,
//                 "dateModified": new Date().toISOString(),
//                 "author": {
//                   "@type": "Organization",
//                   "name": "Movie On Demand",
//                   "url": "https://movieondemand.vercel.app"
//                 },
//                 "publisher": {
//                   "@type": "Organization",
//                   "name": "Movie On Demand",
//                   "logo": {
//                     "@type": "ImageObject",
//                     "url": "https://movieondemand.vercel.app/logo.png"
//                   }
//                 },
//                 "mainEntityOfPage": {
//                   "@type": "WebPage",
//                   "@id": `https://movieondemand.vercel.app/movie/${movie.slug}`
//                 },
//                 "articleBody": `${movie.description} ${generatePlainTextArticleContent(movie)}`,
//                 "keywords": movie.tags.join(', '),
//                 "genre": movie.genre,
//                 "articleSection": "Movie Reviews",
//                 "wordCount": calculateWordCount(movie)
//               })
//             }}
//           />
//         </div>
//       </main>
//     </>
//   )
// }

// function DetailItem({ label, value }) {
//   return (
//     <div className="flex justify-between py-2 border-b border-gray-700 last:border-b-0">
//       <span className="text-gray-300">{label}:</span>
//       <span className="text-white">{value || 'N/A'}</span>
//     </div>
//   )
// }

// function formatDuration(duration) {
//   if (!duration) return 'N/A'
//   return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm').replace('S', 's')
// }

// function generatePlainTextArticleContent(movie) {
//   const plotExpansion = generatePlotExpansion(movie).replace(/<[^>]*>/g, ' ')
//   const characterAnalysis = generateCharacterAnalysis(movie).replace(/<[^>]*>/g, ' ')
//   const productionInsights = generateProductionInsights(movie).replace(/<[^>]*>/g, ' ')
//   const criticalReception = generateCriticalReception(movie).replace(/<[^>]*>/g, ' ')
//   const viewerRecommendation = generateViewerRecommendation(movie).replace(/<[^>]*>/g, ' ')
  
//   return `${plotExpansion} ${characterAnalysis} ${productionInsights} ${criticalReception} ${viewerRecommendation}`
// }

// function calculateWordCount(movie) {
//   const content = `${movie.description} ${generatePlainTextArticleContent(movie)}`
//   return content.split(/\s+/).filter(word => word.length > 0).length
// }

// function generateUniqueArticleContent(movie) {
//   const plotExpansion = generatePlotExpansion(movie)
//   const characterAnalysis = generateCharacterAnalysis(movie)
//   const productionInsights = generateProductionInsights(movie)
//   const criticalReception = generateCriticalReception(movie)
//   const viewerRecommendation = generateViewerRecommendation(movie)

//   return `
//     <div class="space-y-8">
//       <section>
//         <h2 class="text-2xl font-bold mb-4 text-white">Plot Summary</h2>
//         ${plotExpansion}
//       </section>

//       <section>
//         <h2 class="text-2xl font-bold mb-4 text-white">Character Analysis</h2>
//         ${characterAnalysis}
//       </section>

//       <section>
//         <h2 class="text-2xl font-bold mb-4 text-white">Production Insights</h2>
//         ${productionInsights}
//       </section>

//       <section>
//         <h2 class="text-2xl font-bold mb-4 text-white">Critical Reception</h2>
//         ${criticalReception}
//       </section>

//       <section>
//         <h2 class="text-2xl font-bold mb-4 text-white">Why You Should Watch</h2>
//         ${viewerRecommendation}
//       </section>
//     </div>
//   `
// }

// function generatePlotExpansion(movie) {
//   const genres = movie.genre.toLowerCase().split(', ')
//   const isAction = genres.includes('action')
//   const isDrama = genres.includes('drama')
//   const isThriller = genres.includes('thriller')
//   const isRomance = genres.includes('romance')

//   let plot = `<p class="text-gray-300 leading-relaxed mb-4">${movie.description}</p>`
  
//   if (isAction && isThriller) {
//     plot += `
//       <p class="text-gray-300 leading-relaxed mb-4">
//         The film masterfully blends heart-pounding action sequences with psychological tension, 
//         keeping viewers on the edge of their seats throughout the narrative. As the story unfolds, 
//         unexpected twists and revelations challenge both the characters and the audience's perceptions.
//       </p>
//       <p class="text-gray-300 leading-relaxed">
//         The climax delivers a satisfying resolution while leaving room for contemplation about 
//         the deeper themes explored throughout the movie, making it more than just a typical 
//         action thriller.
//       </p>
//     `
//   } else if (isDrama && isRomance) {
//     plot += `
//       <p class="text-gray-300 leading-relaxed mb-4">
//         This emotional journey explores the complexities of human relationships with remarkable 
//         depth and sensitivity. The characters' struggles and triumphs are portrayed with such 
//         authenticity that viewers can't help but become emotionally invested in their stories.
//       </p>
//       <p class="text-gray-300 leading-relaxed">
//         The narrative beautifully captures the nuances of love and connection, making it a 
//         profoundly moving experience that resonates long after the credits roll.
//       </p>
//     `
//   } else {
//     plot += `
//       <p class="text-gray-300 leading-relaxed mb-4">
//         The narrative unfolds with meticulous pacing, allowing each story beat to land with 
//         maximum impact. Director ${movie.director} demonstrates a keen understanding of 
//         visual storytelling, using cinematography and editing to enhance the emotional 
//         weight of each scene.
//       </p>
//       <p class="text-gray-300 leading-relaxed">
//         As the plot progresses, layers of complexity are revealed, transforming what might 
//         have been a straightforward story into a rich, multi-faceted exploration of its 
//         central themes and character motivations.
//       </p>
//     `
//   }

//   return plot
// }

// function generateCharacterAnalysis(movie) {
//   const mainCast = movie.cast.slice(0, 3)
  
//   return `
//     <div class="space-y-4">
//       <p class="text-gray-300 leading-relaxed">
//         The ensemble cast delivers powerful performances that bring depth and authenticity to their characters. 
//         Each actor embodies their role with such conviction that the characters feel genuinely lived-in and real.
//       </p>
//       <div class="bg-gray-800 p-4 rounded-lg">
//         <h3 class="text-lg font-semibold mb-2 text-white">Key Performances:</h3>
//         <ul class="list-disc list-inside space-y-1 text-gray-300">
//           ${mainCast.map(actor => `
//             <li><strong>${actor}</strong> delivers a standout performance that anchors the emotional core of the film</li>
//           `).join('')}
//         </ul>
//       </div>
//       <p class="text-gray-300 leading-relaxed">
//         The character development throughout the film is particularly noteworthy, with each main character 
//         undergoing significant growth and transformation that feels earned and authentic to their journey.
//       </p>
//     </div>
//   `
// }

// function generateProductionInsights(movie) {
//   return `
//     <div class="space-y-4">
//       <p class="text-gray-300 leading-relaxed">
//         Directed by <strong>${movie.director}</strong>, this ${movie.releaseYear} production showcases 
//         exceptional craftsmanship across all technical departments. The film's visual language is 
//         carefully constructed to support the narrative and enhance the emotional impact of each scene.
//       </p>
//       <p class="text-gray-300 leading-relaxed">
//         The ${movie.quality} presentation ensures that viewers can appreciate the meticulous attention 
//         to detail in every frame, from the carefully composed shots to the nuanced production design 
//         that creates a fully immersive viewing experience.
//       </p>
//       <div class="grid grid-cols-2 gap-4 text-sm">
//         <div class="bg-gray-800 p-3 rounded">
//           <strong class="text-white">Runtime:</strong> ${formatDuration(movie.duration)}
//         </div>
//         <div class="bg-gray-800 p-3 rounded">
//           <strong class="text-white">Quality:</strong> ${movie.quality}
//         </div>
//       </div>
//     </div>
//   `
// }

// function generateCriticalReception(movie) {
//   const rating = parseFloat(movie.rating.split('/')[0])
  
//   let receptionText = ''
//   if (rating >= 8) {
//     receptionText = `With an impressive ${movie.rating} rating, the film has been widely praised by both critics and audiences alike. Reviewers have highlighted the exceptional performances, tight scripting, and masterful direction as standout elements that elevate the entire production.`
//   } else if (rating >= 6) {
//     receptionText = `Earning a solid ${movie.rating} rating, the film has received generally positive reviews from critics and viewers. The strong character development and engaging storyline have been particularly commended, though some critics noted areas where the execution could have been stronger.`
//   } else {
//     receptionText = `With a ${movie.rating} rating, the film has generated mixed reactions from audiences and critics. While many appreciate the ambitious scope and strong performances, some have pointed out narrative inconsistencies that prevent it from reaching its full potential.`
//   }

//   return `
//     <div class="space-y-4">
//       <p class="text-gray-300 leading-relaxed">
//         ${receptionText}
//       </p>
//       <p class="text-gray-300 leading-relaxed">
//         The film's ability to ${rating >= 7 ? 'consistently engage and surprise viewers' : 'maintain viewer interest despite its flaws'} 
//         has been noted as one of its key strengths, demonstrating the filmmakers' commitment to 
//         delivering a memorable cinematic experience.
//       </p>
//     </div>
//   `
// }

// function generateViewerRecommendation(movie) {
//   const genres = movie.genre.toLowerCase()
  
//   return `
//     <div class="space-y-4">
//       <p class="text-gray-300 leading-relaxed">
//         <strong>"${movie.title}"</strong> is essential viewing for fans of ${movie.genre} cinema. 
//         The film offers a perfect blend of entertainment and substance, making it equally suitable 
//         for casual viewers and cinephiles looking for depth and meaning in their movie experiences.
//       </p>
//       <div class="bg-gray-800 p-4 rounded-lg">
//         <h3 class="text-lg font-semibold mb-2 text-white">Perfect for viewers who enjoy:</h3>
//         <ul class="list-disc list-inside space-y-1 text-gray-300">
//           <li>Compelling character-driven narratives</li>
//           <li>${genres.includes('action') ? 'Well-choreographed action sequences' : 'Thought-provoking storytelling'}</li>
//           <li>Emotional depth and authentic performances</li>
//           <li>Movies that stay with you long after viewing</li>
//         </ul>
//       </div>
//       <p class="text-gray-300 leading-relaxed">
//         Whether you're looking for an engaging story, powerful performances, or simply quality 
//         entertainment, this film delivers on all fronts and represents some of the best that 
//         ${movie.releaseYear} cinema has to offer.
//       </p>
//     </div>
//   `
// }

// export async function getStaticPaths() {
//   const paths = moviesData.map(movie => ({
//     params: { slug: movie.slug }
//   }))

//   return {
//     paths,
//     fallback: false
//   }
// }

// export async function getStaticProps({ params }) {
//   const movie = moviesData.find(m => m.slug === params.slug)

//   if (!movie) {
//     return {
//       notFound: true
//     }
//   }

//   return {
//     props: {
//       movie
//     },
//     revalidate: 3600
//   }
// }











