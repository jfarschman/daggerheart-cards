"use client";

import { useState } from 'react';
import CardPreview from '../components/CardPreview';
import CardEditor from '../components/CardEditor';

export default function Home() {
  const [currentCard, setCurrentCard] = useState({
    title: "Healing Salve",
    type: "Consumable",
    traits: ["Utility", "Healing"],
    bodyText: "Spend 1 Hope to restore 1d8 HP to a nearby ally.",
    flavorText: "Smells like pine and old bandages.",
    imagePath: "", 
    imageConfig: { x: 50, y: 50, scale: 1 },
    colorTheme: "#4a7c59"
  });

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Column: The Editor Area */}
        <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-xl no-print border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Daggerheart Card Forge</h1>
            {/* We will wire this button up to our save system later */}
            <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white font-medium transition-colors text-sm shadow">
              Save Card
            </button>
          </div>
          
          {/* Injecting the new Editor Component */}
          <CardEditor card={currentCard} setCard={setCurrentCard} />
        </div>

        {/* Right Column: The Preview Area */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-950 p-8 rounded-xl border border-gray-800 shadow-inner overflow-hidden">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6 no-print">Live Preview</h2>
          <CardPreview card={currentCard} />
        </div>
      </div>
    </main>
  );
}