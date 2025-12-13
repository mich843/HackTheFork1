"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

interface Menu {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  totalPrice: number;
  items: string[];
  carbonFootprintSaved: {
    value: number;
    unit: string;
  };
  sufferingFootprintAvoided: {
    value: number;
    unit: string;
  };
}

interface MenuData {
  eventType: string;
  numberOfPeople: number;
  budget: number;
  address: string;
  menus: Menu[];
}

function MenusContent() {
  const searchParams = useSearchParams();
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("/menus/default-menus.json");
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error loading menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading menu options...</p>
        </div>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading menus</p>
        </div>
      </div>
    );
  }

  const eventType = searchParams.get("eventType") || menuData.eventType;
  const numberOfPeople = searchParams.get("numberOfPeople") || menuData.numberOfPeople;
  const budget = searchParams.get("budget") || menuData.budget;
  const address = searchParams.get("address") || menuData.address;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-green-700 hover:text-green-800 font-medium mb-4"
            >
              ← Back to Event Details
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Vegan Menu Options
            </h1>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Event:</span>{" "}
                  <span className="text-gray-600">{eventType}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">People:</span>{" "}
                  <span className="text-gray-600">{numberOfPeople}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Budget:</span>{" "}
                  <span className="text-gray-600">${budget}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Location:</span>{" "}
                  <span className="text-gray-600">{address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {menuData.menus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {menu.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{menu.description}</p>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Menu Items:
                    </h3>
                    <ul className="space-y-1">
                      {menu.items.map((item, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        Price per person:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${menu.pricePerPerson}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-700 font-medium">
                        Total price:
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        ${menu.totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 space-y-3">
                    <h3 className="font-bold text-green-900 text-lg">
                      Environmental Impact
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xl">🌍</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              Carbon Footprint Saved
                            </p>
                            <p className="text-xs text-gray-600">
                              vs. traditional menu
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-700">
                            {menu.carbonFootprintSaved.value}
                          </p>
                          <p className="text-xs text-gray-600">
                            {menu.carbonFootprintSaved.unit}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xl">🐾</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              Suffering Avoided
                            </p>
                            <p className="text-xs text-gray-600">
                              vs. traditional menu
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-700">
                            {menu.sufferingFootprintAvoided.value}
                          </p>
                          <p className="text-xs text-gray-600">
                            {menu.sufferingFootprintAvoided.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              About These Metrics
            </h3>
            <p className="text-gray-600 text-sm">
              The carbon footprint and suffering metrics shown represent the
              difference between choosing a vegan menu versus a traditional
              non-vegan version of the same meal. Carbon savings are calculated
              based on the reduced greenhouse gas emissions from plant-based
              ingredients. Animal suffering is measured by the number of animals
              that would typically be used in a traditional menu of this size.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading menu options...</p>
        </div>
      </div>
    }>
      <MenusContent />
    </Suspense>
  );
}
