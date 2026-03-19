"use client";

import { useState } from 'react';
import CardPreview from '../components/CardPreview';

export default function Home() {
  // This state holds the data for the card currently being viewed/edited.
  // We will connect this to real input fields next.
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
          <h1 className="text-2xl font-bold mb-4 text-white">Daggerheart Card Forge</h1>
          <p className="text-gray-400 mb-6">
            The form inputs to edit the card in real-time will go right here.
          </p>
          
          {/* A quick test button to prove React state is working */}
          <button 
            onClick={() => setCurrentCard({...currentCard, title: "Greater Healing Salve", colorTheme: "#2563eb"})}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium transition-colors"
          >
            Test Update Card
          </button>
        </div>

        {/* Right Column: The Preview Area */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-950 p-8 rounded-xl border border-gray-800 shadow-inner">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6 no-print">Live Preview</h2>
          
          {/* Here is the component we just built! */}
          <CardPreview card={currentCard} />
          
        </div>
      </div>
    </main>
  );
}