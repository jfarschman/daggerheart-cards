import React from 'react';

export default function CardPreview({ card }) {
  // Fallback data so the component doesn't crash if passed an empty state
  const data = card || {
    title: "New Item",
    type: "Consumable",
    traits: ["Utility", "Healing"],
    bodyText: "Spend 1 Hope to restore 1d8 HP to a nearby ally.",
    flavorText: "Smells like pine and old bandages.",
    imagePath: "", 
    imageConfig: { x: 50, y: 50, scale: 1 },
    colorTheme: "#4a7c59" // A nice earthy green default
  };

  return (
    /* We use the .dagger-card class from globals.css for the exact mm sizing */
    <div className="dagger-card flex flex-col shadow-lg print:shadow-none bg-white">
      
      {/* 1. Header Area */}
      <div 
        className="px-3 py-2 text-white flex justify-between items-center"
        style={{ backgroundColor: data.colorTheme }}
      >
        <h2 className="font-bold text-[13px] uppercase tracking-wider truncate mr-2">
          {data.title}
        </h2>
        <span className="text-[10px] font-semibold opacity-90 whitespace-nowrap">
          {data.type}
        </span>
      </div>

      {/* 2. Image Window */}
      <div className="h-32 bg-gray-200 relative overflow-hidden border-b-2 border-gray-800">
        {data.imagePath ? (
          <img 
            src={data.imagePath} 
            alt={data.title}
            className="absolute w-full h-full object-cover"
            style={{
              // This is where the magic panning and zooming will happen
              objectPosition: `${data.imageConfig.x}% ${data.imageConfig.y}%`,
              transform: `scale(${data.imageConfig.scale})`
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs italic">
            No Image Uploaded
          </div>
        )}
      </div>

      {/* 3. Card Body */}
      <div className="p-3 flex flex-col flex-grow">
        
        {/* Traits / Tags (rendered as little pill badges) */}
        {data.traits && data.traits.length > 0 && (
          <div className="flex gap-1 mb-2 flex-wrap">
            {data.traits.map((trait, idx) => (
              <span 
                key={idx} 
                className="bg-gray-800 text-white text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide"
              >
                {trait}
              </span>
            ))}
          </div>
        )}

        {/* Main Mechanics Text */}
        <div className="text-[11px] text-gray-900 leading-snug mb-2 flex-grow whitespace-pre-wrap">
          {data.bodyText}
        </div>

        {/* Flavor Text (pushed to the bottom) */}
        {data.flavorText && (
          <div className="text-[10px] text-gray-600 italic border-t border-gray-200 pt-1 mt-auto">
            "{data.flavorText}"
          </div>
        )}
      </div>
    </div>
  );
}