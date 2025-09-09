# 🎨 Color Palette Generator

A professional, interactive color palette generator that creates harmonious color schemes based on established color theory principles. Generate beautiful color palettes with custom base colors or completely random combinations.



## ✨ Features

### 🎯 Color Harmony Types
- **Analogous** - Colors next to each other on the color wheel (30° apart)
- **Monochromatic** - Different shades of the same hue
- **Complementary** - Colors opposite each other on the color wheel (180° apart)
- **Triadic** - Three colors evenly spaced (120° apart)
- **Tetradic** - Four colors forming a rectangle on the color wheel (90° apart)
- **Split Complementary** - Base color with two colors adjacent to its complement
- **Random** - Completely random color combinations

### 🎨 Advanced Features
- **Custom Base Color Input** - Enter any hex color as your starting point
- **Real-time Color Preview** - See your input color instantly
- **Copy to Clipboard** - One-click copying of hex values with visual feedback
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Professional UI** - Smooth animations and modern design
- **Optional Base Color** - Generate random palettes or use your own color



## 🛠️ Installation

### Option 1: Clone Repository
```bash
git clone https://github.com/MariamQasemi/Color-Pallet-Generator.git
cd Color-Pallet-Generator
```

### Option 2: Download ZIP
1. Click the "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the files to your desired location

## 🎮 How to Use

### Basic Usage
1. **Open `index.html`** in your web browser
2. **Select a palette type** from the dropdown menu
3. **Click "Generate Palette"** to create a new color scheme

### Using Custom Colors
1. **Enter a hex color** in the input field (e.g., `#FF5733`)
2. **See the color preview** update in real-time
3. **Select your desired palette type**
4. **Generate** harmonious colors based on your input

### Copying Colors
1. **Click any copy button** next to a hex value
2. **See visual feedback** (green checkmark for success)
3. **Paste anywhere** to use the color code

## 🎨 Color Theory Behind Each Type

### Analogous
Creates harmonious, calming palettes using colors that are adjacent on the color wheel. Perfect for creating cohesive, soothing designs.

**Example**: Blue → Blue-Green → Green

### Monochromatic
Uses different shades and tints of a single hue. Great for creating depth and hierarchy while maintaining color harmony.

**Example**: Light Blue → Blue → Dark Blue

### Complementary
High contrast palettes using colors opposite each other on the color wheel. Creates vibrant, energetic designs.

**Example**: Blue ↔ Orange

### Triadic
Three colors evenly spaced around the color wheel. Provides balanced contrast while maintaining harmony.

**Example**: Red, Yellow, Blue

### Tetradic
Four colors forming a rectangle on the color wheel. Rich, complex palettes with multiple color relationships.

**Example**: Red, Yellow, Blue, Green

### Split Complementary
Less harsh than pure complementary, using the base color with two colors adjacent to its complement.

**Example**: Blue with Yellow-Orange and Red-Orange



### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### File Structure
```
Color-Pallet-Generator/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── style.css           # CSS styling and animations
└── README.md           # This file
```

## 🎯 Key Functions

### Color Conversion
- `hexToHsl()` - Converts hex colors to HSL for manipulation
- `hslToHex()` - Converts HSL back to hex for display

### Palette Generation
- `generateAnalogousPalette()` - Creates analogous color schemes
- `generateMonochromaticPalette()` - Creates monochromatic schemes
- `generateComplementaryPalette()` - Creates complementary schemes
- `generateTriadicPalette()` - Creates triadic schemes
- `generateTetradicPalette()` - Creates tetradic schemes
- `generateSplitComplementaryPalette()` - Creates split complementary schemes

### User Interface
- `updateColorPreview()` - Updates the color preview circle
- `copyToClipboard()` - Handles clipboard functionality
- `showCopySuccess()` - Visual feedback for successful copy
- `attachCopyListeners()` - Manages copy button event listeners


## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Ideas for Contributions
- Add new color harmony types
- Implement color accessibility checking
- Add color palette export functionality
- Create color palette history/save feature
- Add color name suggestions
- Implement color contrast ratio checking

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mariam Qasemi**
- GitHub: [@MariamQasemi](https://github.com/MariamQasemi)
- Email: mariamqaasemi@gmail.com

## 🙏 Acknowledgments

- Color theory principles based on traditional color wheel concepts
- HSL color space implementation for accurate color manipulation
- Modern web APIs for enhanced user experience
- Responsive design principles for cross-device compatibility


---

⭐ **Star this repository if you found it helpful!**

🔗 **Share with designers and developers who might benefit from this tool!**
