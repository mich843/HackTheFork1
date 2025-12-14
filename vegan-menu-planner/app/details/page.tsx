'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getEventColors } from '../eventColors';

function DetailsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventType = searchParams.get('event') || 'Event';
  const colors = getEventColors(eventType);

  const [formData, setFormData] = useState({
    numberOfPeople: '',
    budget: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      event: eventType,
      people: formData.numberOfPeople,
      budget: formData.budget,
      address: formData.address
    });

    router.push(`/results?${queryParams.toString()}`);
  };

  const isFormValid = formData.numberOfPeople && formData.budget && formData.address;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} relative`}>
      {/* Event-themed background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${colors.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-2xl relative z-10">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 md:p-12">
          <button
            onClick={() => router.back()}
            style={{ color: colors.primary }}
            className="font-medium mb-6 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            ← Back
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Event Details
            </h1>
            <p
              style={{ color: colors.primary }}
              className="text-lg font-medium"
            >
              {eventType}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="numberOfPeople" className="block text-sm font-semibold text-gray-700 mb-2">
                Number of People
              </label>
              <input
                type="number"
                id="numberOfPeople"
                min="1"
                required
                value={formData.numberOfPeople}
                onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 100"
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                Total Budget ($)
              </label>
              <input
                type="number"
                id="budget"
                min="0"
                step="0.01"
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 2000"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Address
              </label>
              <input
                type="text"
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 123 Main St, San Francisco, CA"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              style={isFormValid ? {
                backgroundColor: colors.primary,
                borderColor: colors.primary
              } : undefined}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                isFormValid
                  ? 'text-white shadow-lg hover:shadow-xl hover:opacity-90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Find Vegan Menus
            </button>
          </form>
        </div>

        <div className="mt-8 bg-white/80 rounded-lg p-6 backdrop-blur">
          <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span style={{ color: colors.primary }} className="font-bold">•</span>
              <span>We&apos;ll show you customized vegan menu options</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.primary }} className="font-bold">•</span>
              <span>See the carbon footprint you&apos;ll save compared to traditional menus</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.primary }} className="font-bold">•</span>
              <span>Learn about the animal suffering prevented</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading...</div>
      </div>
    }>
      <DetailsForm />
    </Suspense>
  );
}
