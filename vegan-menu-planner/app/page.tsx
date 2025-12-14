'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const eventTypes = [
  {
    name: 'Thanksgiving Dinner',
    image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop',
    description: 'Traditional feast with plant-based twists'
  },
  {
    name: 'Afterwork Buffet',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    description: 'Casual networking and delicious bites'
  },
  {
    name: 'Christmas Dinner',
    image: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?w=400&h=300&fit=crop',
    description: 'Festive holiday celebration meals'
  },
  {
    name: 'Wedding Reception',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
    description: 'Elegant dining for your special day'
  },
  {
    name: 'Corporate Lunch',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
    description: 'Professional catering for meetings'
  },
  {
    name: 'Other',
    image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=400&h=300&fit=crop',
    description: 'Custom event planning'
  }
];

export default function Home() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvent) {
      router.push(`/details?event=${encodeURIComponent(selectedEvent)}`);
    }
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((event) => (
              <button
                key={event.name}
                type="button"
                onClick={() => setSelectedEvent(event.name)}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  selectedEvent === event.name
                    ? 'ring-4 ring-emerald-500 shadow-2xl scale-105'
                    : 'hover:shadow-xl hover:scale-102'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    selectedEvent === event.name
                      ? 'bg-emerald-600/40'
                      : 'bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70'
                  }`} />
                  {selectedEvent === event.name && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-2">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="bg-white p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {event.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!selectedEvent}
              className={`py-4 px-12 rounded-lg font-semibold text-lg transition-all ${
                selectedEvent
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Details
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>🌍 Every vegan meal makes a difference for our planet and animals</p>
        </div>
      </div>
    </div>
  );
}
