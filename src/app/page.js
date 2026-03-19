"use client";

import { useState, useEffect } from 'react';
import CardPreview from '../components/CardPreview';
import CardEditor from '../components/CardEditor';

export default function Home() {
  // A blank template for when you click "New Card"
  const defaultCard = {
    id: "", // We will generate a unique ID for new cards
    title: "New Card",
    type: "Item",
    traits: [],
    bodyText: "",
    flavorText: "",
    imagePath: "", 
    imageConfig: { x: 50, y: 50, scale: 1 },
    colorTheme: "#4a7c59"
  };

  // State for your entire deck and the currently active card
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(defaultCard);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. INITIAL LOAD: Pull the deck from localStorage when the app opens
  useEffect(() => {
    const savedDeck = localStorage.getItem('daggerheart-deck');
    if (savedDeck) {
      const parsedDeck = JSON.parse(savedDeck);
      setDeck(parsedDeck);
      if (parsedDeck.length > 0) {
        setCurrentCard(parsedDeck[0]); // Load the first card in the deck
      } else {
        // If deck is empty, generate an ID for the default card
        setCurrentCard({ ...defaultCard, id: crypto.randomUUID() });
      }
    } else {
      setCurrentCard({ ...defaultCard, id: crypto.randomUUID() });
    }
    setIsLoaded(true);
  }, []);

  // 2. AUTO-SAVE DECK: Save to localStorage whenever the 'deck' array changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('daggerheart-deck', JSON.stringify(deck));
    }
  }, [deck, isLoaded]);

  // Handle saving the current card into the deck array
  const handleSaveCard = () => {
    setDeck((prevDeck) => {
      // Check if this card already exists in the deck
      const existingCardIndex = prevDeck.findIndex(c => c.id === currentCard.id);
      
      if (existingCardIndex >= 0) {
        // Update existing card
        const updatedDeck = [...prevDeck];
        updatedDeck[existingCardIndex] = currentCard;
        return updatedDeck;
      } else {
        // Add as a brand new card
        return [...prevDeck, currentCard];
      }
    });
    alert(`"${currentCard.title}" saved to your deck!`);
  };

  // Handle creating a brand new blank card
  const handleNewCard = () => {
    setCurrentCard({ ...defaultCard, id: crypto.randomUUID() });
  };

  // Prevent rendering until local storage is read (avoids Next.js errors)
  if (!isLoaded) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading Binder...</div>;

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Column: The Editor Area */}
        <div className="flex-1 flex flex-col gap-4 no-print">
          
          {/* DECK BROWSER: See all your saved cards */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-gray-300 font-semibold text-sm uppercase tracking-wider">Your Deck ({deck.length})</h2>
              <button 
                onClick={handleNewCard}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white text-xs font-bold transition-colors"
              >
                + New Card
              </button>
            </div>
            
            {/* Scrollable list of saved cards */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {deck.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCurrentCard(c)}
                  className={`flex-shrink-0 text-xs px-3 py-2 rounded border whitespace-nowrap transition-colors ${
                    currentCard.id === c.id 
                      ? 'border-green-500 bg-gray-900 text-white' 
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {c.title || 'Untitled'}
                </button>
              ))}
              {deck.length === 0 && <span className="text-xs text-gray-500 italic">No cards saved yet. Click Save Card below.</span>}
            </div>
          </div>

          {/* THE EDITOR */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Card Forge</h1>
              <button 
                onClick={handleSaveCard}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white font-medium transition-colors text-sm shadow"
              >
                Save Card
              </button>
            </div>
            <CardEditor card={currentCard} setCard={setCurrentCard} />
          </div>
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