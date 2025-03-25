/**
 * Features Component
 * 
 * Displays the main product offerings in a responsive grid layout.
 * Each feature is presented as a card with consistent styling and interaction.
 * 
 * Features:
 * - Responsive grid layout
 * - Interactive feature cards
 * - Custom icons per feature
 * - Consistent styling with brand colors
 * - Call-to-action buttons
 * 
 * @component
 */

import Image from 'next/image';
import Link from 'next/link';
import { features } from '../../constants';
import { titleToSlug } from '../../utils';

/**
 * Features Component Implementation
 * 
 * Renders a grid of feature cards, each highlighting a main product offering.
 * Uses Tailwind CSS for styling and responsive design.
 * 
 * @returns {JSX.Element} Rendered features section
 */
export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Unlock the Power of Supply Chain Intelligence
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8"
            >
              {/* Feature Icon */}
              <div className={`relative w-24 h-24 mx-auto mb-8 rounded-full bg-${feature.color}-50 p-4 flex items-center justify-center group-hover:bg-${feature.color}-100 transition-colors`}>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className={`object-contain text-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`}
                />
              </div>

              {/* Feature Title */}
              <h3 className={`text-xl font-bold text-center mb-4 text-${feature.color}-600`}>
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-gray-600 text-center mb-8">
                {feature.description}
              </p>

              {/* Call-to-action Button */}
              <Link
                href={`/${titleToSlug(feature.title)}`}
                className={`inline-block w-full text-center py-3 px-6 rounded-full bg-${feature.color}-600 text-white hover:bg-${feature.color}-700 transition-colors`}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 