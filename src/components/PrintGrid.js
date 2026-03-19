import React from 'react';
import CardPreview from './CardPreview';

export default function PrintGrid({ deck }) {
  const chunks = [];
  for (let i = 0; i < deck.length; i += 9) {
    chunks.push(deck.slice(i, i + 9));
  }

  return (
    <div className="hidden print:block bg-white">
      {chunks.map((page, pageIdx) => (
        <div key={pageIdx} className="print-page">
          <div className="print-grid">
            {page.map((card) => (
              <div key={card.id} className="relative">
                {/* Crop Marks */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-black/30" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-black/30" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-black/30" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-black/30" />
                
                <CardPreview card={card} />
              </div>
            ))}
          </div>
          {/* Removed the separate page-break div from here */}
        </div>
      ))}
    </div>
  );
}