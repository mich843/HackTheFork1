"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const eventTypes = [
  "Thanksgiving Dinner",
  "Afterwork Buffet",
  "Christmas Dinner",
  "Birthday Party",
  "Wedding Reception",
  "Corporate Event",
  "Other",
];

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    eventType: "",
    numberOfPeople: "",
    budget: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams({
      eventType: formData.eventType,
      numberOfPeople: formData.numberOfPeople,
      budget: formData.budget,
      address: formData.address,
    });
    
    router.push(`/menus?${params.toString()}`);
  };

  const isFormValid = 
    formData.eventType && 
    formData.numberOfPeople && 
    formData.budget && 
    formData.address;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Vegan Event Planner
            </h1>
            <p className="text-lg text-gray-600">
              Plan your sustainable event and discover the positive impact
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="eventType"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Event Type
                </label>
                <select
                  id="eventType"
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  required
                >
                  <option value="">Select an event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="numberOfPeople"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Number of People
                </label>
                <input
                  type="number"
                  id="numberOfPeople"
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={(e) =>
                    setFormData({ ...formData, numberOfPeople: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="e.g., 100"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Total Budget ($)
                </label>
                <input
                  type="number"
                  id="budget"
                  min="0"
                  step="0.01"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="e.g., 1500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Event Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="e.g., 123 Main St, City, State"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
              >
                Find Vegan Menu Options
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Discover delicious vegan menus while reducing your carbon footprint
              and animal suffering
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
