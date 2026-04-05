import React from 'react';

export default function CardPreview({ card }) {
  const data = card || {
    title: "New Item",
    type: "Consumable",
    traits: ["Utility"],
    bodyText: "Spend 1 Hope to restore 1d8 HP...",
    flavorText: "Smells like pine and old bandages.",
    imagePath: "", 
    imageConfig: { x: 50, y: 50, scale: 1, textHeight: 45 },
    colorTheme: "#4a7c59"
  };

  const textHeightPct = data.imageConfig.textHeight || 45;
  const imageHeightPct = 100 - textHeightPct;
  // Extract the font size, defaulting to 11.5 if it doesn't exist yet
  const bodyFontSize = data.imageConfig.fontSize || 11.5;

  return (
    <div className="dagger-card shadow-lg print:shadow-none bg-white flex flex-col relative overflow-hidden border-[3px] border-black rounded-xl">
      
      {/* 1. IMAGE BLOCK (Top Section) */}
      <div 
        className="relative w-full overflow-hidden bg-gray-200"
        style={{ height: `${imageHeightPct}%` }}
      >
        {data.imagePath ? (
          <img 
            src={data.imagePath} 
            alt={data.title}
            className="w-full h-full object-cover absolute"
            style={{
              objectPosition: `${data.imageConfig.x}% ${data.imageConfig.y}%`,
              transform: `scale(${data.imageConfig.scale})`
            }}
          />
        ) : (
           <div className="flex h-full items-center justify-center text-gray-400 text-xs italic bg-gray-100">
             No Image
           </div>
        )}
      </div>

      {/* 2. TEXT BLOCK (Bottom Section) */}
      <div 
        className="relative w-full bg-white flex flex-col items-center px-2 pb-2 z-10"
        style={{ height: `${textHeightPct}%` }}
      >
        
        {/* THE BANNER (Riding the exact mathematical seam) */}
        {/* top-0 pins it to the seam, left-1/2 centers it, -translate handles the 50/50 split */}
        <div 
          className="absolute top-0 left-1/2 w-[85%] h-5 flex items-center justify-center shadow-sm z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            backgroundColor: data.colorTheme,
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)'
          }}
        >
          <span className="text-[9px] font-bold text-white tracking-[2px] uppercase drop-shadow-md">
            {data.type}
          </span>
        </div>

        {/* Content Container - pt-5 ensures text clears the bottom half of the banner safely */}
        <div className="flex flex-col items-center w-full h-full pt-5">
          
          {/* Title */}
          <p className="w-full text-center font-[family-name:var(--font-anton)] text-[18px] uppercase tracking-wider leading-none text-black mt-1">
            {data.title}
          </p>

          {/* Traits (Using negative margin to pull it up tightly against the title) */}
          {data.traits && data.traits.length > 0 && (
            <p 
              className="font-semibold capitalize italic text-[8.5px] text-gray-600 mb-1.5 text-center relative z-10"
              style={{ marginTop: '-12px' }} 
            >
              {data.traits.join(' • ')}
            </p>
          )}

          {/* Body Text */}
          <div 
            className="w-full mt-1.5 leading-snug text-center text-pretty whitespace-pre-wrap flex-grow text-gray-900 overflow-hidden font-[family-name:var(--font-lora)]"
            style={{ fontSize: `${bodyFontSize}px` }}
          >
            {data.bodyText}
          </div>

          {/* Flavor Text (Locks to the bottom) */}
          {data.flavorText && (
            <div className="w-full text-[8px] italic text-gray-600 text-center mt-auto border-t border-gray-300 pt-1 mb-2 leading-tight font-[family-name:var(--font-lora)]">
              "{data.flavorText}"
            </div>
          )}
          
        </div>
      </div>
      
    </div>
  );
}