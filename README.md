# 🗡️ Daggerheart Card Forge

A local, lightweight web application for creating, managing, and printing custom homebrew cards for the Daggerheart tabletop roleplaying game. 

This tool is designed to perfectly output $63\text{mm} \times 89\text{mm}$ (Standard Poker / MTG size) cards in a 3x3 grid, complete with professional crop marks for easy cutting.

## ✨ Features
* **Live Editor:** WYSIWYG editor with dynamic text scaling and layout adjustments.
* **Auto Image Compression:** Uploaded images are automatically shrunk and converted to lightweight JPEGs via HTML5 Canvas, preventing browser storage crashes.
* **Local Storage:** Your entire deck is saved automatically to your browser's local storage. No accounts or databases required.
* **Print-Ready Engine:** A hidden CSS grid layout that perfectly formats your deck into an 8.5"x11" printable sheet when you press `Cmd/Ctrl + P`.
* **JSON Export/Import:** Back up your entire deck to a single text file and share it across devices.
* **Official Typography:** Uses *Anton* for punchy titles and *Lora* for highly legible body text.

## 🚀 Getting Started

### Prerequisites
You will need to have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Download or clone this repository to your local machine.
2. Open your terminal and navigate into the project folder:
   ```bash
   cd daggerheart-cards
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the development server:

```bash
npm run dev
```
5. Open http://localhost:3000 in your web browser.

### Printing Instructions
To ensure your cards print at the exact physical dimensions required for 3D-printed cutting tools, you must use the following settings in your browser's print dialog:

* Paper Size: US Letter (8.5 x 11)
* Scale: 100% or "Actual Size" (Do NOT use "Fit to Page")
* Margins: None / 0
* Background Graphics: ON / Checked

Note: For the most accurate physical dimensions and layout, Google Chrome or Mozilla Firefox are highly recommended over Safari, as WebKit handles CSS print layouts unpredictably.

### Troubleshooting


### License & Compatibility
This tool is for personal, non-commercial homebrew use.
Daggerheart™ Compatible. Terms at Daggerheart.com. Not affiliated with Darrington Press.