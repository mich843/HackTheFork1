'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Dish {
  name: string;
  description: string;
}

interface ImpactMetrics {
  carbonSaved: {
    amount: number;
    unit: string;
    comparison: string;
    equivalentTo: string;
  };
  sufferingPrevented: {
    animalsSpared: number;
    breakdown: Record<string, number>;
    description: string;
  };
}

interface Menu {
  id: string;
  name: string;
  description: string;
  dishes: Dish[];
  pricePerPerson: number;
  impactMetrics: ImpactMetrics;
}

interface MenuData {
  menus: Menu[];
  metadata: {
    generatedFor: {
      eventType: string;
      numberOfPeople: number;
      budget: number;
      address: string;
    };
  };
}

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const eventType = searchParams.get('event') || '';
  const numberOfPeople = searchParams.get('people') || '';
  const budget = searchParams.get('budget') || '';
  const address = searchParams.get('address') || '';

  useEffect(() => {
    fetch('/data/menu-results.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading menu data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
          <p className="text-emerald-700 text-lg">Finding the perfect vegan menus for you...</p>
        </div>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading menu data</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <button
          onClick={() => router.back()}
          className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Vegan Menu Options
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Event</p>
              <p className="font-semibold text-gray-900">{eventType}</p>
            </div>
            <div>
              <p className="text-gray-600">Guests</p>
              <p className="font-semibold text-gray-900">{numberOfPeople} people</p>
            </div>
            <div>
              <p className="text-gray-600">Budget</p>
              <p className="font-semibold text-gray-900">${budget}</p>
            </div>
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-semibold text-gray-900 truncate">{address}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {menuData.menus.map((menu) => {
            const totalPrice = menu.pricePerPerson * parseInt(numberOfPeople || '0');
            const isExpanded = selectedMenu === menu.id;

            return (
              <div
                key={menu.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{menu.name}</h2>
                      <p className="text-gray-600 mb-4">{menu.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Price per person</p>
                      <p className="text-3xl font-bold text-emerald-600">${menu.pricePerPerson}</p>
                      <p className="text-sm text-gray-500">Total: ${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMenu(isExpanded ? null : menu.id)}
                    className="text-emerald-600 hover:text-emerald-700 font-medium mb-4 flex items-center gap-2"
                  >
                    {isExpanded ? '▼' : '▶'} {isExpanded ? 'Hide' : 'Show'} Menu Items
                  </button>

                  {isExpanded && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <div className="grid gap-3">
                        {menu.dishes.map((dish, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900">{dish.name}</h3>
                            <p className="text-sm text-gray-600">{dish.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-5 border-2 border-green-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl">🌍</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Carbon Footprint Saved</h3>
                          <p className="text-sm text-gray-600">{menu.impactMetrics.carbonSaved.comparison}</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-green-700 mb-2">
                        {menu.impactMetrics.carbonSaved.amount} {menu.impactMetrics.carbonSaved.unit}
                      </p>
                      <p className="text-sm text-gray-600">
                        💡 Equivalent to: {menu.impactMetrics.carbonSaved.equivalentTo}
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-5 border-2 border-purple-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl">💚</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Animal Lives Spared</h3>
                          <p className="text-sm text-gray-600">{menu.impactMetrics.sufferingPrevented.description}</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-purple-700 mb-2">
                        {menu.impactMetrics.sufferingPrevented.animalsSpared} animals
                      </p>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Breakdown:</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(menu.impactMetrics.sufferingPrevented.breakdown).map(([animal, count]) => (
                            <span key={animal} className="bg-purple-100 px-2 py-1 rounded">
                              {count} {animal}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    onClick={() => alert('In the full version, this would proceed to catering booking!')}
                  >
                    Select This Menu
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white/90 backdrop-blur rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About These Impact Metrics</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Carbon Footprint:</strong> We calculate the CO2 equivalent emissions saved by choosing plant-based
              options compared to traditional meat and dairy-based versions of the same meals. This includes emissions
              from animal agriculture, transportation, and processing.
            </p>
            <p>
              <strong>Animal Suffering:</strong> These numbers represent the animals that would have been raised and
              slaughtered for a traditional non-vegan version of this meal. By choosing vegan options, you directly
              prevent this suffering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
