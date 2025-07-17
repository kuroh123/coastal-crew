"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/ui/navigation";
import AuthGuard from "@/components/ui/auth-guard";
import { Leaf } from "lucide-react";

const rewards = [
  {
    id: 1,
    name: "Reusable Water Bottle",
    cost: 50,
    image: "/rewards/water-bottle.png",
    description: "Eco-friendly stainless steel bottle."
  },
  {
    id: 2,
    name: "Plantable Seed Pencil",
    cost: 20,
    image: "/rewards/seed-pencil.png",
    description: "Pencil that grows into a plant."
  },
  {
    id: 3,
    name: "Organic Tote Bag",
    cost: 40,
    image: "/rewards/tote-bag.png",
    description: "Reusable organic cotton tote."
  }
];

export default function RedeemShop() {
  const [ecoTokens, setEcoTokens] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/volunteer/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setEcoTokens(data.ecoTokens ?? 0));
  }, []);

  return (
    <AuthGuard requiredRole="VOLUNTEER">
      <div className="min-h-screen bg-gradient-to-br from-teal-100 to-yellow-100">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Redeem EcoTokens</h1>
            <p className="text-gray-600 mb-4">Exchange your EcoTokens for eco-friendly rewards!</p>
            <div className="inline-flex items-center bg-white rounded-full px-6 py-2 shadow">
              <Leaf className="w-6 h-6 text-teal-500 mr-2" />
              <span className="text-lg font-semibold text-teal-700">{ecoTokens} EcoTokens</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {rewards.map(reward => (
              <div key={reward.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <img src={reward.image} alt={reward.name} className="h-100 w-75 object-contain mb-4" />
                <h2 className="text-xl font-bold mb-2">{reward.name}</h2>
                <p className="text-gray-600 mb-2 text-center">{reward.description}</p>
                <div className="flex items-center mb-4">
                  <Leaf className="w-5 h-5 text-teal-500 mr-1" />
                  <span className="font-semibold text-teal-700">{reward.cost} EcoTokens</span>
                </div>
                <button
                  disabled={ecoTokens < reward.cost}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    ecoTokens >= reward.cost
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {ecoTokens >= reward.cost ? "Redeem" : "Insufficient EcoTokens"}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/volunteer/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
