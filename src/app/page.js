"use client";

import { useState, useEffect } from 'react';
import CardPreview from '../components/CardPreview';
import CardEditor from '../components/CardEditor';
import PrintGrid from '../components/PrintGrid';

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
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-sans">
      
      {/* --- LAYER 1: THE INTERACTIVE UI --- */}
      {/* 'no-print' tells the browser: "Do not show this on paper!" */}
      <div className="no-print max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* LEFT COLUMN: Deck Management & Editing */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* THE DECK BROWSER (The horizontal list of saved cards) */}
          <section className="bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-gray-400 font-bold text-xs uppercase tracking-widest">Your Digital Binder</h2>
              <button onClick={handleNewCard} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold transition-all">
                + New Card
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 border-t border-gray-700 pt-3">
              {deck.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCurrentCard(c)}
                  className={`flex-shrink-0 px-4 py-2 rounded-md text-xs border transition-all ${
                    currentCard.id === c.id 
                      ? 'border-green-500 bg-green-500/10 text-green-400' 
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {c.title || 'Untitled Card'}
                </button>
              ))}
            </div>
          </section>

          {/* THE EDITOR FORM */}
          <section className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-white">Card Editor</h1>
              <button onClick={handleSaveCard} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all">
                Save Changes
              </button>
            </div>
            <CardEditor card={currentCard} setCard={setCurrentCard} />
          </section>
        </div>

        {/* RIGHT COLUMN: The Single Card Preview */}
        <div className="flex-1 sticky top-8 h-fit flex flex-col items-center">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Live Preview</h2>
          <div className="p-12 bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl">
             <CardPreview card={currentCard} />
          </div>
          <p className="mt-6 text-gray-500 text-xs italic text-center max-w-xs">
            Dimensions are locked to 89mm x 63mm.<br/>Press Ctrl+P to print your full deck.
          </p>
        </div>
      </div>

      {/* --- LAYER 2: THE PRINT ENGINE --- */}
      {/* This component is hidden via CSS until the printer is triggered. */}
      <PrintGrid deck={deck} />

    </main>
  );
}