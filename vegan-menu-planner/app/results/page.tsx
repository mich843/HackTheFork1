'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getEventColors } from '../eventColors';

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
  image: string;
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
  const colors = getEventColors(eventType);

  useEffect(() => {
    // Load event-specific menu data
    const eventSlug = eventType.toLowerCase().replace(/\s+/g, '-');
    const dataPath = `/data/menus-${eventSlug}.json`;

    fetch(dataPath)
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading menu data:', err);
        // Fallback to generic data
        fetch('/data/menu-results.json')
          .then(res => res.json())
          .then(data => {
            setMenuData(data);
            setLoading(false);
          });
      });
  }, [eventType]);

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
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} relative`}>
      {/* Event-themed background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${colors.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <button
          onClick={() => router.back()}
          style={{ color: colors.primary }}
          className="font-medium mb-6 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          ← Back
        </button>

        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Vegan Menu Options
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Event</p>
              <p style={{ color: colors.primary }} className="font-semibold">{eventType}</p>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuData.menus.map((menu) => {
            const totalPrice = menu.pricePerPerson * parseInt(numberOfPeople || '0');
            const isExpanded = selectedMenu === menu.id;

            return (
              <div
                key={menu.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Menu Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-full shadow-lg">
                    <p className="text-sm font-bold" style={{ color: colors.primary }}>
                      ${menu.pricePerPerson}/person
                    </p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{menu.name}</h2>
                    <p className="text-gray-600">{menu.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Total for {numberOfPeople} people: ${totalPrice.toFixed(2)}</p>
                  </div>

                  <button
                    onClick={() => setSelectedMenu(isExpanded ? null : menu.id)}
                    style={{ color: colors.primary }}
                    className="font-medium mb-4 text-left flex items-center gap-2 hover:opacity-80 transition-opacity"
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

                  <div className="grid gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-2xl">🌍</div>
                        <h3 className="font-bold text-gray-900 text-sm">Carbon Saved</h3>
                      </div>
                      <p className="text-2xl font-bold text-green-700 mb-1">
                        {menu.impactMetrics.carbonSaved.amount} {menu.impactMetrics.carbonSaved.unit}
                      </p>
                      <p className="text-xs text-gray-600">
                        💡 {menu.impactMetrics.carbonSaved.equivalentTo}
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-2xl">💚</div>
                        <h3 className="font-bold text-gray-900 text-sm">Animals Spared</h3>
                      </div>
                      <p className="text-2xl font-bold text-purple-700 mb-2">
                        {menu.impactMetrics.sufferingPrevented.animalsSpared} animals
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(menu.impactMetrics.sufferingPrevented.breakdown).map(([animal, count]) => (
                          <span key={animal} className="bg-purple-100 px-2 py-1 rounded text-xs">
                            {count} {animal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    style={{ backgroundColor: colors.primary }}
                    className="w-full mt-auto text-white font-semibold py-3 rounded-lg transition-opacity hover:opacity-90"
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
