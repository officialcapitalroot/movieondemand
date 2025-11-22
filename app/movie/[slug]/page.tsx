
// "use client"

// import { notFound } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useState, useEffect } from 'react'
// import moviesData from '../../../data/data.json'
// import ShortICUPlayer from '../../../components/ShortICUPlayer'
// import DailymotionPlayer from '../../../components/DailymotionPlayer'
// import Header from '../../../components/Header'
// import { RelatedMoviesGrid } from '../../../components/RelatedMovieCard'
// import { MessageCircle } from 'lucide-react'

// interface Movie {
//   id: string
//   slug: string
//   title: string
//   description: string
//   thumbnail: string
//   videoId: string
//   videoSource?: string
//   releaseYear: string
//   duration: string
//   quality: string
//   rating: string
//   language: string
//   genre: string
//   category: string
//   director: string
//   cast: string[]
//   country: string
//   size: string
//   tags: string[]
//   uploadDate: string
// }

// const typedMoviesData = moviesData as Movie[]

// export default function MoviePage({ params }: { params: { slug: string } }) {
//   const movie = typedMoviesData.find((m: Movie) => m.slug === params.slug)
//   const [isAgeVerified, setIsAgeVerified] = useState(false)
//   const [showNotification, setShowNotification] = useState(false)
//   const [showWarning, setShowWarning] = useState(false)

//   useEffect(() => {
//     if (movie?.category === 'Adult') {
//       setShowNotification(true)
//       document.body.style.overflow = 'hidden'
//     } else {
//       setIsAgeVerified(true)
//     }

//     return () => {
//       document.body.style.overflow = 'unset'
//     }
//   }, [movie])

//   useEffect(() => {
//     if (!showNotification) return

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
//         e.preventDefault()
//         setShowWarning(true)
//       }
//     }

//     const handleContextMenu = (e: MouseEvent) => {
//       e.preventDefault()
//       setShowWarning(true)
//     }

//     document.addEventListener('keydown', handleKeyDown)
//     document.addEventListener('contextmenu', handleContextMenu)
    
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown)
//       document.removeEventListener('contextmenu', handleContextMenu)
//     }
//   }, [showNotification])

//   if (!movie) {
//     notFound()
//   }

//   const handleAgeVerification = () => {
//     setIsAgeVerified(true)
//     setShowNotification(false)
//     document.body.style.overflow = 'unset'
//   }

//   const handleExit = () => {
//     window.location.href = '/'
//   }

//   const handleExitAttempt = () => {
//     setShowWarning(true)
//   }

//   // Show age verification popup for adult content
//   if (showNotification && movie.category === 'Adult') {
//     return (
//       <div className="notification-overlay">
//         <div className="notification-modal">
//           <button className="close-button" onClick={handleExitAttempt}>
//             ×
//           </button>
          
//           <div className="notification-content">
//             <h2>ADULTS ONLY NOTICE</h2>
            
//             {showWarning && (
//               <div className="warning-alert">
//                 <p>⚠️ <strong>You cannot bypass this warning!</strong></p>
//                 <p>You must either confirm you are 18+ to enter or close your browser.</p>
//               </div>
//             )}
            
//             <div className="warning-message">
//               <p>🚫 <strong>This is adults only!</strong></p>
//               <p>The content available may contain Adult materials.</p>
//             </div>

//             <div className="age-restriction">
//               <p>Access is strictly limited to those over 18 or of legal age in your jurisdiction, whichever is greater.</p>
//               <p>One of our core goals is to help parents restrict access to minors, so we have ensured that it&apos;s 18 +.</p>
//               <p>To enter you must be 18 or older. By Doing so you acknowledged your 18 + of Age.</p>
//             </div>

//             <div className="strict-notice">
//               <p><strong>You cannot bypass this age verification.</strong></p>
//               <p>The only way to access the site is to confirm you are 18+.</p>
//               <p>If you are not 18+, please EXIT the Page now.</p>
//             </div>

//             <div className="action-buttons">
//               <button className="enter-button" onClick={handleAgeVerification}>
//                 I AM 18 OR OLDER - ENTER 
//               </button>
//               <button className="exit-button" onClick={handleExit}>
//                 I AM NOT 18 - EXIT 
//               </button>
//             </div>
//           </div>
//         </div>

//         <style jsx>{`
//           .notification-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: rgba(0, 0, 0, 0.95);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 9999;
//             backdrop-filter: blur(10px);
//           }

//           .notification-modal {
//             background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
//             border: 3px solid #ff4444;
//             border-radius: 15px;
//             padding: 30px;
//             max-width: 650px;
//             width: 90%;
//             max-height: 85vh;
//             overflow-y: auto;
//             position: relative;
//             box-shadow: 0 15px 40px rgba(255, 68, 68, 0.3);
//             color: white;
//           }

//           .close-button {
//             position: absolute;
//             top: 15px;
//             right: 20px;
//             background: rgba(255, 68, 68, 0.2);
//             border: 1px solid #ff4444;
//             color: #fff;
//             font-size: 24px;
//             cursor: pointer;
//             width: 35px;
//             height: 35px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border-radius: 50%;
//             transition: all 0.3s;
//           }

//           .close-button:hover {
//             background-color: rgba(255, 68, 68, 0.4);
//             transform: scale(1.1);
//           }

//           .notification-content h2 {
//             color: #ff4444;
//             text-align: center;
//             margin-bottom: 25px;
//             font-size: 28px;
//             text-transform: uppercase;
//             letter-spacing: 2px;
//             text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
//           }

//           .warning-alert {
//             background-color: rgba(255, 165, 0, 0.2);
//             border: 2px solid #ffa500;
//             padding: 15px;
//             margin: 20px 0;
//             border-radius: 8px;
//             text-align: center;
//             animation: pulse 2s infinite;
//           }

//           @keyframes pulse {
//             0% { border-color: #ffa500; }
//             50% { border-color: #ff4444; }
//             100% { border-color: #ffa500; }
//           }

//           .warning-message {
//             background-color: rgba(255, 68, 68, 0.15);
//             border-left: 5px solid #ff4444;
//             padding: 18px;
//             margin: 20px 0;
//             border-radius: 4px;
//           }

//           .warning-message p {
//             margin: 8px 0;
//             font-size: 17px;
//             font-weight: bold;
//           }

//           .age-restriction {
//             background-color: rgba(255, 255, 255, 0.08);
//             padding: 18px;
//             margin: 20px 0;
//             border-radius: 8px;
//             border: 1px solid #555;
//           }

//           .age-restriction p {
//             margin: 10px 0;
//             line-height: 1.6;
//           }

//           .parental-guidance {
//             margin: 25px 0;
//             padding: 15px;
//             background-color: rgba(0, 100, 255, 0.1);
//             border-radius: 8px;
//             border-left: 4px solid #0066ff;
//           }

//           .parental-guidance h3 {
//             color: #66aaff;
//             margin-bottom: 12px;
//           }

//           .parental-guidance ul {
//             padding-left: 25px;
//             margin: 12px 0;
//           }

//           .parental-guidance li {
//             margin: 10px 0;
//             line-height: 1.5;
//           }

//           .strict-notice {
//             background-color: rgba(255, 0, 0, 0.1);
//             border: 2px solid #ff0000;
//             padding: 20px;
//             margin: 25px 0;
//             border-radius: 8px;
//             text-align: center;
//           }

//           .strict-notice p {
//             margin: 8px 0;
//             font-weight: bold;
//             color: #ff6666;
//           }

//           .action-buttons {
//             display: flex;
//             gap: 20px;
//             justify-content: center;
//             margin-top: 30px;
//             flex-wrap: wrap;
//           }

//           .enter-button {
//             background: linear-gradient(45deg, #00cc00, #009900);
//             color: white;
//             border: none;
//             padding: 18px 30px;
//             border-radius: 10px;
//             cursor: pointer;
//             font-size: 18px;
//             font-weight: bold;
//             transition: all 0.3s ease;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             min-width: 280px;
//           }

//           .enter-button:hover {
//             background: linear-gradient(45deg, #009900, #00cc00);
//             transform: translateY(-3px);
//             box-shadow: 0 8px 20px rgba(0, 204, 0, 0.4);
//           }

//           .exit-button {
//             background: linear-gradient(45deg, #ff4444, #cc0000);
//             color: white;
//             border: 2px solid #ff4444;
//             padding: 18px 30px;
//             border-radius: 10px;
//             cursor: pointer;
//             font-size: 16px;
//             font-weight: bold;
//             transition: all 0.3s ease;
//             min-width: 280px;
//           }

//           .exit-button:hover {
//             background: linear-gradient(45deg, #cc0000, #ff4444);
//             transform: translateY(-3px);
//             box-shadow: 0 8px 20px rgba(255, 68, 68, 0.4);
//           }

//           @media (max-width: 768px) {
//             .notification-modal {
//               padding: 20px;
//               margin: 15px;
//             }
            
//             .action-buttons {
//               flex-direction: column;
//             }
            
//             .enter-button,
//             .exit-button {
//               width: 100%;
//               min-width: auto;
//             }
            
//             .notification-content h2 {
//               font-size: 22px;
//             }
//           }
//         `}</style>
//       </div>
//     )
//   }

//   if (!isAgeVerified && movie.category === 'Adult') {
//     return null
//   }

//   const breadcrumbItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Movies', href: '/categories' },
//     { name: movie.category, href: `/categories?category=${movie.category}` },
//     { name: movie.title, href: `#` },
//   ]

//   // const renderVideoPlayer = () => {
//   //   if (movie.videoSource === 'dailymotion') {
//   //     return <DailymotionPlayer videoId={movie.videoId} title={movie.title} autoplay={false} />
//   //   } else {
//   //     return <ShortICUPlayer videoId={movie.videoId} title={movie.title} />
//   //   }
//   // }

//   return (
//     <>
//       <Header />
//       <main className="movie-details-container">
//         <nav style={{ marginTop: "200px" }} className="container py-4" aria-label="Breadcrumb">
//           {/* <ol className="flex flex-wrap items-center space-x-2 text-sm">
//             {breadcrumbItems.map((item, index) => (
//               <li key={item.name} className="flex items-center">
//                 {index > 0 && <span className="text-gray-500 mx-2">/</span>}
//                 {index === breadcrumbItems.length - 1 ? (
//                   <span className="text-gray-300" aria-current="page">
//                     {item.name}
//                   </span>
//                 ) : (
//                   <Link 
//                     href={item.href}
//                     className="text-gray-400 hover:text-white transition-colors"
//                   >
//                     {item.name}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ol> */}
//         </nav>

//         <div className="container">
//           {/* <section className="mb-8" aria-labelledby="player-heading">
//             <h2 id="player-heading" className="sr-only">
//               Video Player for {movie.title}
//             </h2>
//             {renderVideoPlayer()}
//           </section> */}

//   <section className="mb-8" aria-labelledby="player-heading">
//                      <a 
//                   href="https://t.me/onlyondemand" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="col-span-2 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md font-semibold transition-colors group text-sm"
//                 >
//                   <MessageCircle className="mr-1 group-hover:scale-110 transition-transform" size={16} />
//                   Request Movie
//                 </a>
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
//               <div className="info-card text-center">
//                 <Link href={movie.thumbnail} target="_blank">
//                   <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4">
//                     <Image
//                       src={movie.thumbnail}
//                       alt={`Official poster for ${movie.title}`}
//                       fill
//                       sizes="(max-width: 768px) 100vw, 400px"
//                       className="object-cover hover:scale-105 transition-transform duration-300"
//                       priority
//                     />
//                   </div>
//                 </Link>
//                 <p className="text-sm text-gray-400">
//                   Click to view full-size poster
//                 </p>
//               </div>

//               <div className="info-card">
//                 <h3 className="info-title">Movie Details</h3>
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

//               <div className="info-card">
//                 <h3 className="info-title">Cast</h3>
//                 <div className="cast-grid">
//                   {movie.cast.map((actor, index) => (
//                     <span key={index} className="cast-tag">
//                       {actor}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="info-card">
//                 <h3 className="info-title">Tags</h3>
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
//             movies={typedMoviesData}
//             currentMovieId={movie.id}
//             title="More Movies You'll Love"
//             autoRotate={true}
//           />

//           <RelatedMoviesGrid
//             movies={typedMoviesData.filter((m: Movie) => m.category === movie.category)}
//             currentMovieId={movie.id}
//             title={`More ${movie.category} Movies`}
//           />

//           <RelatedMoviesGrid
//             movies={typedMoviesData.filter((m: Movie) => 
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

// interface DetailItemProps {
//   label: string
//   value: string
// }

// function DetailItem({ label, value }: DetailItemProps) {
//   return (
//     <div className="info-item">
//       <span className="info-label">{label}:</span>
//       <span className="info-value">{value || 'N/A'}</span>
//     </div>
//   )
// }

// function formatDuration(duration: string) {
//   if (!duration) return 'N/A'
//   return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm').replace('S', 's')
// }

// function generatePlainTextArticleContent(movie: Movie) {
//   const plotExpansion = generatePlotExpansion(movie).replace(/<[^>]*>/g, ' ')
//   const characterAnalysis = generateCharacterAnalysis(movie).replace(/<[^>]*>/g, ' ')
//   const productionInsights = generateProductionInsights(movie).replace(/<[^>]*>/g, ' ')
//   const criticalReception = generateCriticalReception(movie).replace(/<[^>]*>/g, ' ')
//   const viewerRecommendation = generateViewerRecommendation(movie).replace(/<[^>]*>/g, ' ')
  
//   return `${plotExpansion} ${characterAnalysis} ${productionInsights} ${criticalReception} ${viewerRecommendation}`
// }

// function calculateWordCount(movie: Movie) {
//   const content = `${movie.description} ${generatePlainTextArticleContent(movie)}`
//   return content.split(/\s+/).filter(word => word.length > 0).length
// }

// function generateUniqueArticleContent(movie: Movie) {
//   const plotExpansion = generatePlotExpansion(movie)
//   const characterAnalysis = generateCharacterAnalysis(movie)
//   const productionInsights = generateProductionInsights(movie)
//   const criticalReception = generateCriticalReception(movie)
//   const viewerRecommendation = generateViewerRecommendation(movie)

//   return `
//     <div class="space-y-8">
//       <section>
//         <h2 class="text-2xl font-bold mb-4">Plot Summary</h2>
//         ${plotExpansion}
//       </section>

//       <section>
//         <h2 class="text-2xl font-bold mb-4">Character Analysis</h2>
//         ${characterAnalysis}
//       </section>

//       <section>
//         <h2 class="text-2xl font-bold mb-4">Production Insights</h2>
//         ${productionInsights}
//       </section>

//       <section>
//         <h2 class="text-2xl font-bold mb-4">Critical Reception</h2>
//         ${criticalReception}
//       </section>

//       <section>
//         <h2 class="text-2xl font-bold mb-4">Why You Should Watch</h2>
//         ${viewerRecommendation}
//       </section>
//     </div>
//   `
// }

// function generatePlotExpansion(movie: Movie) {
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

// function generateCharacterAnalysis(movie: Movie) {
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

// function generateProductionInsights(movie: Movie) {
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

// function generateCriticalReception(movie: Movie) {
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

// function generateViewerRecommendation(movie: Movie) {
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











// app/movie/[slug]/page.tsx
"use client"

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import moviesData from '../../../data/data.json'
import Header from '../../../components/Header'
import { RelatedMoviesGrid } from '../../../components/RelatedMovieCard'
import { MessageCircle } from 'lucide-react'

interface Movie {
  id: string
  slug: string
  title: string
  description: string
  thumbnail: string
  videoId: string
  videoSource?: string
  releaseYear: string
  duration: string
  quality: string
  rating: string
  language: string
  genre: string
  category: string
  director: string
  cast: string[]
  country: string
  size: string
  tags: string[]
  uploadDate: string
}

const typedMoviesData = moviesData as Movie[]
const TELEGRAM_BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;

export default function MoviePage({ params }: { params: { slug: string } }) {
  const movie = typedMoviesData.find((m: Movie) => m.slug === params.slug)
  const [isAgeVerified, setIsAgeVerified] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (movie?.category === 'Adult') {
      setShowNotification(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsAgeVerified(true)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [movie])

  useEffect(() => {
    if (!showNotification) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        e.preventDefault()
        setShowWarning(true)
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setShowWarning(true)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [showNotification])

  if (!movie) {
    notFound()
  }

  const handleAgeVerification = () => {
    setIsAgeVerified(true)
    setShowNotification(false)
    document.body.style.overflow = 'unset'
  }

  const handleExit = () => {
    window.location.href = '/'
  }

  const handleExitAttempt = () => {
    setShowWarning(true)
  }

  if (showNotification && movie.category === 'Adult') {
    return (
      <div className="notification-overlay">
        <div className="notification-modal">
          <button className="close-button" onClick={handleExitAttempt}>
            ×
          </button>
          
          <div className="notification-content">
            <h2>ADULTS ONLY NOTICE</h2>
            
            {showWarning && (
              <div className="warning-alert">
                <p>⚠️ <strong>You cannot bypass this warning!</strong></p>
                <p>You must either confirm you are 18+ to enter or close your browser.</p>
              </div>
            )}
            
            <div className="warning-message">
              <p>🚫 <strong>This is adults only!</strong></p>
              <p>The content available may contain Adult materials.</p>
            </div>

            <div className="age-restriction">
              <p>Access is strictly limited to those over 18 or of legal age in your jurisdiction, whichever is greater.</p>
              <p>One of our core goals is to help parents restrict access to minors, so we have ensured that it&apos;s 18 +.</p>
              <p>To enter you must be 18 or older. By Doing so you acknowledged your 18 + of Age.</p>
            </div>

            <div className="strict-notice">
              <p><strong>You cannot bypass this age verification.</strong></p>
              <p>The only way to access the site is to confirm you are 18+.</p>
              <p>If you are not 18+, please EXIT the Page now.</p>
            </div>

            <div className="action-buttons">
              <button className="enter-button" onClick={handleAgeVerification}>
                I AM 18 OR OLDER - ENTER 
              </button>
              <button className="exit-button" onClick={handleExit}>
                I AM NOT 18 - EXIT 
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .notification-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            backdrop-filter: blur(10px);
          }

          .notification-modal {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 3px solid #ff4444;
            border-radius: 15px;
            padding: 30px;
            max-width: 650px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 15px 40px rgba(255, 68, 68, 0.3);
            color: white;
          }

          .close-button {
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(255, 68, 68, 0.2);
            border: 1px solid #ff4444;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s;
          }

          .close-button:hover {
            background-color: rgba(255, 68, 68, 0.4);
            transform: scale(1.1);
          }

          .notification-content h2 {
            color: #ff4444;
            text-align: center;
            margin-bottom: 25px;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          }

          .warning-alert {
            background-color: rgba(255, 165, 0, 0.2);
            border: 2px solid #ffa500;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { border-color: #ffa500; }
            50% { border-color: #ff4444; }
            100% { border-color: #ffa500; }
          }

          .warning-message {
            background-color: rgba(255, 68, 68, 0.15);
            border-left: 5px solid #ff4444;
            padding: 18px;
            margin: 20px 0;
            border-radius: 4px;
          }

          .warning-message p {
            margin: 8px 0;
            font-size: 17px;
            font-weight: bold;
          }

          .age-restriction {
            background-color: rgba(255, 255, 255, 0.08);
            padding: 18px;
            margin: 20px 0;
            border-radius: 8px;
            border: 1px solid #555;
          }

          .age-restriction p {
            margin: 10px 0;
            line-height: 1.6;
          }

          .strict-notice {
            background-color: rgba(255, 0, 0, 0.1);
            border: 2px solid #ff0000;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            text-align: center;
          }

          .strict-notice p {
            margin: 8px 0;
            font-weight: bold;
            color: #ff6666;
          }

          .action-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 30px;
            flex-wrap: wrap;
          }

          .enter-button {
            background: linear-gradient(45deg, #00cc00, #009900);
            color: white;
            border: none;
            padding: 18px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            min-width: 280px;
          }

          .enter-button:hover {
            background: linear-gradient(45deg, #009900, #00cc00);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 204, 0, 0.4);
          }

          .exit-button {
            background: linear-gradient(45deg, #ff4444, #cc0000);
            color: white;
            border: 2px solid #ff4444;
            padding: 18px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s ease;
            min-width: 280px;
          }

          .exit-button:hover {
            background: linear-gradient(45deg, #cc0000, #ff4444);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(255, 68, 68, 0.4);
          }

          @media (max-width: 768px) {
            .notification-modal {
              padding: 20px;
              margin: 15px;
            }
            
            .action-buttons {
              flex-direction: column;
            }
            
            .enter-button,
            .exit-button {
              width: 100%;
              min-width: auto;
            }
            
            .notification-content h2 {
              font-size: 22px;
            }
          }
        `}</style>
      </div>
    )
  }

  if (!isAgeVerified && movie.category === 'Adult') {
    return null
  }

  return (
    <>
      <Header />
      <main className="movie-details-container">
        <nav style={{ marginTop: "200px" }} className="container py-4" aria-label="Breadcrumb">
          {/* Breadcrumb commented out as per original code */}
        </nav>

        <div className="container">
          <section className="mb-8" aria-labelledby="player-heading">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* <a 
                href="https://t.me/onlyondemand" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors group text-lg w-full max-w-md"
              >
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                Request Movie
              </a> */}
              
              {TELEGRAM_BOT_USERNAME && (
                <div className="w-full max-w-md">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-3 text-white text-center">Get Link via Telegram</h3>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-300 text-center">
                        Click below to get this movie link via Telegram
                      </p>
                      <a
                        href={`https://t.me/${TELEGRAM_BOT_USERNAME}?start=${movie.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg transition-all duration-300 hover:scale-105 w-full"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.191c-.153.001-.491.236-.491.236l-2.557 1.386-1.007 3.232s-.146.669.432.669c.578 0 1.396-.506 1.396-.506l3.232-2.072.832-.249c.91-.273.91-.691.91-.691s.063-.51-.699-.405zm-3.504 4.185l-1.105 3.644s-.082.405-.405.236c-.324-.167-2.43-1.558-2.43-1.558l-3.314-2.072s-.405-.273.083-.649c.487-.375 3.562-2.311 5.153-3.316.785-.499.578-.457.785.167.207.624.833 2.311.833 2.311l.399 1.447zm-2.97 4.462c-.167 0-.236-.124-.472-.291-.235-.167-1.852-1.213-1.852-1.213l-2.229-1.423s-.291-.188.062-.432c.354-.244 2.103-1.365 3.785-2.349.602-.354.602-.236.732.354.13.59.602 2.433.602 2.433l.354 1.301c.021.089-.021.188-.104.244-.062.041-.143.063-.226.063l-.65.114z"/>
                        </svg>
                        <span className="font-semibold">Get Link on Telegram</span>
                      </a>
                      <p className="text-xs text-gray-400 text-center">
                        You'll need to subscribe to our channel to get the link
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

              <article className="article-content" itemScope itemType="https://schema.org/Movie">
                <div dangerouslySetInnerHTML={{ 
                  __html: generateUniqueArticleContent(movie) 
                }} />
              </article>
            </div>

            <div className="space-y-6">
              <div className="info-card text-center">
                <Link href={movie.thumbnail} target="_blank">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={movie.thumbnail}
                      alt={`Official poster for ${movie.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>
                </Link>
                <p className="text-sm text-gray-400">
                  Click to view full-size poster
                </p>
              </div>

              <div className="info-card">
                <h3 className="info-title">Movie Details</h3>
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

              <div className="info-card">
                <h3 className="info-title">Cast</h3>
                <div className="cast-grid">
                  {movie.cast.map((actor, index) => (
                    <span key={index} className="cast-tag">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="info-card">
                <h3 className="info-title">Tags</h3>
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
            movies={typedMoviesData}
            currentMovieId={movie.id}
            title="More Movies You'll Love"
            autoRotate={true}
          />

          <RelatedMoviesGrid
            movies={typedMoviesData.filter((m: Movie) => m.category === movie.category)}
            currentMovieId={movie.id}
            title={`More ${movie.category} Movies`}
          />

          <RelatedMoviesGrid
            movies={typedMoviesData.filter((m: Movie) => 
              m.genre.split(', ').some(g => movie.genre.includes(g))
            )}
            currentMovieId={movie.id}
            title={`Similar ${movie.genre.split(',')[0]} Movies`}
          />

          <script
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
          />

          <script
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
          />
        </div>
      </main>
    </>
  )
}

interface DetailItemProps {
  label: string
  value: string
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="info-item">
      <span className="info-label">{label}:</span>
      <span className="info-value">{value || 'N/A'}</span>
    </div>
  )
}

function formatDuration(duration: string) {
  if (!duration) return 'N/A'
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm').replace('S', 's')
}

function generatePlainTextArticleContent(movie: Movie) {
  const plotExpansion = generatePlotExpansion(movie).replace(/<[^>]*>/g, ' ')
  const characterAnalysis = generateCharacterAnalysis(movie).replace(/<[^>]*>/g, ' ')
  const productionInsights = generateProductionInsights(movie).replace(/<[^>]*>/g, ' ')
  const criticalReception = generateCriticalReception(movie).replace(/<[^>]*>/g, ' ')
  const viewerRecommendation = generateViewerRecommendation(movie).replace(/<[^>]*>/g, ' ')
  
  return `${plotExpansion} ${characterAnalysis} ${productionInsights} ${criticalReception} ${viewerRecommendation}`
}

function calculateWordCount(movie: Movie) {
  const content = `${movie.description} ${generatePlainTextArticleContent(movie)}`
  return content.split(/\s+/).filter(word => word.length > 0).length
}

function generateUniqueArticleContent(movie: Movie) {
  const plotExpansion = generatePlotExpansion(movie)
  const characterAnalysis = generateCharacterAnalysis(movie)
  const productionInsights = generateProductionInsights(movie)
  const criticalReception = generateCriticalReception(movie)
  const viewerRecommendation = generateViewerRecommendation(movie)

  return `
    <div class="space-y-8">
      <section>
        <h2 class="text-2xl font-bold mb-4">Plot Summary</h2>
        ${plotExpansion}
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">Character Analysis</h2>
        ${characterAnalysis}
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">Production Insights</h2>
        ${productionInsights}
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">Critical Reception</h2>
        ${criticalReception}
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">Why You Should Watch</h2>
        ${viewerRecommendation}
      </section>
    </div>
  `
}

function generatePlotExpansion(movie: Movie) {
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

function generateCharacterAnalysis(movie: Movie) {
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

function generateProductionInsights(movie: Movie) {
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

function generateCriticalReception(movie: Movie) {
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

function generateViewerRecommendation(movie: Movie) {
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