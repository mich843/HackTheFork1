'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const eventTypes = [
  'Thanksgiving Dinner',
  'Afterwork Buffet',
  'Christmas Dinner',
  'Birthday Party',
  'Wedding Reception',
  'Corporate Lunch',
  'Holiday Potluck',
  'Other'
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
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              🌱 Vegan Event Planner
            </h1>
            <p className="text-lg text-gray-600">
              Plan your perfect vegan menu and see the positive impact you&apos;re making
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="event" className="block text-sm font-semibold text-gray-700 mb-3">
                What type of event are you planning?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {eventTypes.map((event) => (
                  <button
                    key={event}
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className={`px-4 py-3 rounded-lg text-left transition-all ${
                      selectedEvent === event
                        ? 'bg-emerald-600 text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedEvent}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                selectedEvent
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Details
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>🌍 Every vegan meal makes a difference for our planet and animals</p>
        </div>
      </div>
    </div>
  );
}
