'use client';

import { useRouter } from 'next/navigation';
import { eventThemes } from './lib/eventThemes';

const eventTypes = [
  'Thanksgiving Dinner',
  'Afterwork Buffet',
  'Christmas Dinner',
  'Wedding Reception',
  'Corporate Lunch',
  'Other'
];

export default function Home() {
  const router = useRouter();

  const handleEventSelect = (event: string) => {
    router.push(`/details?event=${encodeURIComponent(event)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            🌱 Vegan Event Planner
          </h1>
          <p className="text-lg text-gray-600">
            Plan your perfect vegan menu and see the positive impact you&apos;re making
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {eventTypes.map((event) => {
            const theme = eventThemes[event];
            return (
              <button
                key={event}
                onClick={() => handleEventSelect(event)}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`h-48 bg-gradient-to-br ${theme.imageGradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <span className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
                    {theme.icon}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {event}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {theme.description}
                  </p>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-${theme.primaryColor} text-white`}>
                    View Menus →
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-bold text-gray-900 mb-1">Carbon Conscious</h3>
              <p className="text-sm text-gray-600">Reduce your event&apos;s environmental impact</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💚</div>
              <h3 className="font-bold text-gray-900 mb-1">Cruelty-Free</h3>
              <p className="text-sm text-gray-600">100% plant-based, no animal suffering</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="font-bold text-gray-900 mb-1">Delicious</h3>
              <p className="text-sm text-gray-600">Amazing flavors your guests will love</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
