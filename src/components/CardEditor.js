import React from 'react';

export default function CardEditor({ card, setCard }) {
  // Generic handler for basic text and color inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  // Handler specifically for traits (converts comma-separated string to an array)
  const handleTraitsChange = (e) => {
    const traitsArray = e.target.value.split(',').map(t => t.trim()).filter(t => t !== "");
    setCard({ ...card, traits: traitsArray });
  };

  // Handler to convert an uploaded image file into a local preview URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCard({ ...card, imagePath: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for the image positioning sliders
  const handleImageConfig = (e) => {
    const { name, value } = e.target;
    setCard({ 
      ...card, 
      imageConfig: { ...card.imageConfig, [name]: parseFloat(value) } 
    });
  };

  return (
    <div className="space-y-5 bg-gray-800 p-2 rounded text-sm">
      
      {/* 1. Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-1">Card Title</label>
          <input 
            type="text" name="title" value={card.title} onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Card Type</label>
          <input 
            type="text" name="type" value={card.type} onChange={handleChange}
            placeholder="e.g., Consumable, Item..."
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-1">Traits (comma separated)</label>
          <input 
            type="text" name="traits" value={card.traits ? card.traits.join(', ') : ''} onChange={handleTraitsChange}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Domain Color</label>
          <div className="flex items-center gap-2">
            <input 
              type="color" name="colorTheme" value={card.colorTheme} onChange={handleChange}
              className="h-9 w-12 bg-gray-900 border border-gray-700 rounded cursor-pointer"
            />
            <span className="text-gray-500 font-mono">{card.colorTheme}</span>
          </div>
        </div>
      </div>

      {/* 2. Text Content */}
      <div>
        <label className="block text-gray-400 mb-1">Body Text</label>
        <textarea 
          name="bodyText" value={card.bodyText} onChange={handleChange} rows="3"
          className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-1">Flavor Text</label>
        <input 
          type="text" name="flavorText" value={card.flavorText} onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none italic"
        />
      </div>

      {/* 3. Image Upload & Controls */}
      <div className="border-t border-gray-700 pt-4 mt-4">
        <label className="block text-gray-400 mb-2 font-semibold">Image Upload & Adjustments</label>
        <input 
          type="file" accept="image/*" onChange={handleImageUpload}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer mb-4"
        />

        {/* Sliders will only show up if an image is actually loaded */}
        {card.imagePath && (
          <div className="grid grid-cols-3 gap-4 bg-gray-900 p-3 rounded border border-gray-700">
            <div>
              <label className="block text-xs text-gray-500 mb-1">X Position ({card.imageConfig.x}%)</label>
              <input 
                type="range" name="x" min="0" max="100" value={card.imageConfig.x} onChange={handleImageConfig}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Y Position ({card.imageConfig.y}%)</label>
              <input 
                type="range" name="y" min="0" max="100" value={card.imageConfig.y} onChange={handleImageConfig}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Scale ({card.imageConfig.scale}x)</label>
              <input 
                type="range" name="scale" min="0.5" max="3" step="0.1" value={card.imageConfig.scale} onChange={handleImageConfig}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}