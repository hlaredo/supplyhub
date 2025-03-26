/**
 * Hero Component
 * 
 * A dynamic article carousel that serves as the main landing section of the application.
 * Implements auto-rotation and manual navigation for featured articles.
 * 
 * Key Features:
 * 1. Auto-rotating Carousel
 *    - 5-second rotation interval
 *    - Automatic cleanup on unmount
 *    - Smooth transitions between slides
 * 
 * 2. Manual Navigation
 *    - Dot indicators for direct slide access
 *    - Arrow controls for sequential navigation
 *    - Circular navigation (last to first and vice versa)
 * 
 * 3. Responsive Layout
 *    - Grid-based article layout
 *    - Optimized image loading with Next.js Image
 *    - Mobile-first design approach
 * 
 * 4. Related Articles
 *    - Dynamic filtering of related content
 *    - Maximum of 2 related articles shown
 *    - Excludes current article from related list
 * 
 * Technical Implementation:
 * - Uses React useState for carousel state management
 * - Implements useEffect for auto-rotation timer
 * - Utilizes Next.js Image for optimized image loading
 * - Employs Tailwind CSS for responsive styling
 * 
 * @component
 * @example
 * ```tsx
 * <Hero />
 * ```
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { articles } from '../../constants';

/**
 * Hero Component Implementation
 * 
 * Manages the carousel state and implements the slide show functionality
 * with both automatic rotation and manual navigation controls.
 * 
 * Features:
 * - Auto-rotation every 5 seconds
 * - Manual navigation through dots and arrows
 * - Smooth transitions between slides
 * - Responsive image and content layout
 * 
 * @returns {JSX.Element} Rendered hero section with article carousel
 */
export default function Hero() {
  // Track the index of the currently displayed article
  const [currentArticle, setCurrentArticle] = useState(0);
  // Track loading states for images
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  // Auto-rotation effect with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentArticle((prev) => (prev + 1) % articles.length);
    }, 5000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  /**
   * Handles manual navigation through dot indicators
   * @param {number} index - Target slide index
   */
  const handleDotClick = (index: number) => {
    setCurrentArticle(index);
  };

  /**
   * Handles image load completion
   * @param {number} articleId - The ID of the article whose image has loaded
   */
  const handleImageLoad = (articleId: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [articleId]: true
    }));
  };

  return (
    <section className="relative pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Carousel Container */}
        <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Viewport Container - Handles overflow */}
          <div className="overflow-hidden">
            {/* Slides Container - Handles transitions */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentArticle * 100}%)`,
              }}
            >
              {/* Individual Article Slides */}
              {articles.map((article) => (
                <div 
                  key={article.id}
                  className="w-full flex-none"
                >
                  {/* Article Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Image Container with Next.js Image optimization */}
                    <div className="relative h-[400px] rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        priority={article.id === 1}
                        className={`object-cover transition-opacity duration-500 ${
                          loadedImages[article.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        onLoad={() => handleImageLoad(article.id)}
                        onError={(e) => {
                          // Handle image load errors gracefully
                          e.currentTarget.style.opacity = '0';
                        }}
                      />
                      {/* Loading state placeholder */}
                      {!loadedImages[article.id] && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />
                      )}
                    </div>
                    
                    {/* Article Content Container */}
                    <div className="flex flex-col justify-center space-y-6">
                      <h2 className="text-3xl font-bold text-gray-900">
                        {article.title}
                      </h2>
                      <p className="text-xl text-gray-600">
                        {article.summary}
                      </p>

                      {/* Related Articles Section */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Related Articles
                        </h3>
                        <div className="space-y-3">
                          {/* Filter and display related articles */}
                          {articles
                            .filter(a => a.id !== article.id)
                            .slice(0, 2)
                            .map(relatedArticle => (
                              <p 
                                key={relatedArticle.id}
                                className="text-gray-600 hover:text-blue-600 cursor-pointer"
                              >
                                {relatedArticle.title}
                              </p>
                            ))}
                        </div>
                      </div>

                      {/* Call to Action Button */}
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors w-fit">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white z-10"
            onClick={() => handleDotClick((currentArticle - 1 + articles.length) % articles.length)}
            aria-label="Previous article"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white z-10"
            onClick={() => handleDotClick((currentArticle + 1) % articles.length)}
            aria-label="Next article"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentArticle ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 