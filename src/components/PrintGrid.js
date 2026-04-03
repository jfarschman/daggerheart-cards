import React from 'react';
import CardPreview from './CardPreview';

export default function PrintGrid({ deck }) {
  // Split the deck into chunks of 9 for 3x3 pages
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
              <div key={card.id} className="relative w-[63mm] h-[89mm]">
                
                {/* --- SCISSOR GUIDES (Professional Crop Marks) --- */}
                {/* These lines sit just outside the card and point along the cutting edge */}
                
                {/* Top Left Corner */}
                <div className="absolute -top-[4mm] -left-[1px] w-[1px] h-[3mm] bg-gray-400" />
                <div className="absolute -top-[1px] -left-[4mm] w-[3mm] h-[1px] bg-gray-400" />
                
                {/* Top Right Corner */}
                <div className="absolute -top-[4mm] -right-[1px] w-[1px] h-[3mm] bg-gray-400" />
                <div className="absolute -top-[1px] -right-[4mm] w-[3mm] h-[1px] bg-gray-400" />
                
                {/* Bottom Left Corner */}
                <div className="absolute -bottom-[4mm] -left-[1px] w-[1px] h-[3mm] bg-gray-400" />
                <div className="absolute -bottom-[1px] -left-[4mm] w-[3mm] h-[1px] bg-gray-400" />
                
                {/* Bottom Right Corner */}
                <div className="absolute -bottom-[4mm] -right-[1px] w-[1px] h-[3mm] bg-gray-400" />
                <div className="absolute -bottom-[1px] -right-[4mm] w-[3mm] h-[1px] bg-gray-400" />

                {/* The Card Component */}
                <CardPreview card={card} />
                
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}