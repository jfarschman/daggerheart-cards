"use client";

import { useState, useEffect, useRef } from 'react';
import CardPreview from '../components/CardPreview';
import CardEditor from '../components/CardEditor';
import PrintGrid from '../components/PrintGrid';

export default function Home() {
  const defaultCard = {
    id: "",
    title: "New Card",
    type: "Item",
    traits: [],
    bodyText: "",
    flavorText: "",
    imagePath: "", 
    imageConfig: { x: 50, y: 50, scale: 1, textHeight: 45, fontSize: 11.5 },
    colorTheme: "#4a7c59"
  };

  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(defaultCard);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // --- NEW: Reference for the hidden file input ---
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedDeck = localStorage.getItem('daggerheart-deck');
    if (savedDeck) {
      const parsedDeck = JSON.parse(savedDeck);
      setDeck(parsedDeck);
      if (parsedDeck.length > 0) setCurrentCard(parsedDeck[0]);
      else setCurrentCard({ ...defaultCard, id: crypto.randomUUID() });
    } else {
      setCurrentCard({ ...defaultCard, id: crypto.randomUUID() });
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem('daggerheart-deck', JSON.stringify(deck));
  }, [deck, isLoaded]);

  const handleSaveCard = () => {
    setDeck((prev) => {
      const idx = prev.findIndex(c => c.id === currentCard.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = currentCard;
        return updated;
      }
      return [...prev, currentCard];
    });
  };

  const handleNewCard = () => {
    const newCard = { ...defaultCard, id: crypto.randomUUID() };
    setCurrentCard(newCard);
  };

  const handleDeleteCard = () => {
    if (window.confirm(`Are you sure you want to delete "${currentCard.title}"?`)) {
      const newDeck = deck.filter(c => c.id !== currentCard.id);
      setDeck(newDeck);
      if (newDeck.length > 0) {
        setCurrentCard(newDeck[0]);
      } else {
        handleNewCard();
      }
    }
  };

  const handleDownloadDeck = () => {
    const dataStr = JSON.stringify(deck, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daggerheart-deck-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- NEW: IMPORT FUNCTION ---
  const handleImportDeck = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedDeck = JSON.parse(e.target.result);
        if (Array.isArray(importedDeck)) {
          setDeck(importedDeck);
          if (importedDeck.length > 0) {
            setCurrentCard(importedDeck[0]);
          }
          alert("Deck imported successfully!");
        } else {
          alert("Invalid deck format. Please ensure it is a valid Daggerheart JSON file.");
        }
      } catch (error) {
        alert("Error parsing JSON file. The file might be corrupted.");
      }
    };
    reader.readAsText(file);
    
    // Reset the input value so the same file can be selected again if needed
    event.target.value = null;
  };

  if (!isLoaded) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-sans">
      <div className="no-print max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        <div className="flex-1 flex flex-col gap-6">
          <section className="bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-gray-400 font-bold text-xs uppercase tracking-widest text-white">Your Binder</h2>
              <div className="flex gap-2">
                
                {/* --- NEW: Hidden file input and Import Button --- */}
                <input 
                  type="file" 
                  accept=".json" 
                  ref={fileInputRef} 
                  onChange={handleImportDeck} 
                  className="hidden" 
                />
                <button onClick={() => fileInputRef.current.click()} className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs font-bold transition-all">
                  Import JSON
                </button>
                
                <button onClick={handleDownloadDeck} className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs font-bold transition-all">
                  Download JSON
                </button>
                <button onClick={handleNewCard} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold transition-all">
                  + New Card
                </button>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 border-t border-gray-700 pt-3">
              {deck.map(c => (
                <button key={c.id} onClick={() => setCurrentCard(c)} className={`flex-shrink-0 px-4 py-2 rounded-md text-xs border transition-all ${currentCard.id === c.id ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  {c.title || 'Untitled'}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-white">Editor</h1>
              <div className="flex gap-3">
                <button onClick={handleDeleteCard} className="px-4 py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white rounded-lg text-sm font-bold transition-all">
                  Delete
                </button>
                <button onClick={handleSaveCard} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all">
                  Save Changes
                </button>
              </div>
            </div>
            <CardEditor card={currentCard} setCard={setCurrentCard} />
          </section>
        </div>

        <div className="flex-1 sticky top-8 h-fit flex flex-col items-center">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Preview</h2>
          <div className="p-10 bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl">
             <CardPreview card={currentCard} />
          </div>
        </div>
      </div>

      <PrintGrid deck={deck} />
    </main>
  );
}