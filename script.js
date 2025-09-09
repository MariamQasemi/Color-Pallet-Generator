const generateButton = document.getElementById("generate-btn");
const paletteTypeSelect = document.getElementById("palette-type");
const baseColorInput = document.getElementById("base-color");
const colorPreview = document.getElementById("color-preview");
const paletteContainer = document.querySelector(".palette-container");

generateButton.addEventListener("click", generatePalette);
baseColorInput.addEventListener("input", updateColorPreview);
baseColorInput.addEventListener("blur", validateHexInput);

// Add copy functionality to all copy buttons
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hexValue = this.parentElement.querySelector('.hex-value').textContent;
            copyToClipboard(hexValue, this);
        });
    });
});

// Color utility functions
function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };

    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isValidHex(hex) {
    return /^#[0-9A-F]{6}$/i.test(hex);
}

function isNoneValue(value) {
    return value.toLowerCase() === 'none' || value === '';
}

function updateColorPreview() {
    const hexValue = baseColorInput.value.trim();
    
    if (isValidHex(hexValue)) {
        colorPreview.style.backgroundColor = hexValue;
        colorPreview.classList.add('has-color');
        baseColorInput.classList.remove('invalid');
    } else if (isNoneValue(hexValue)) {
        colorPreview.style.backgroundColor = '#f8f9fa';
        colorPreview.classList.remove('has-color');
        baseColorInput.classList.remove('invalid');
    } else {
        colorPreview.style.backgroundColor = '#f8f9fa';
        colorPreview.classList.remove('has-color');
        baseColorInput.classList.add('invalid');
    }
}

function validateHexInput() {
    const hexValue = baseColorInput.value.trim();
    
    if (hexValue.length > 0 && !isValidHex(hexValue) && !isNoneValue(hexValue)) {
        baseColorInput.classList.add('invalid');
        // Auto-correct common mistakes
        if (hexValue.length === 6 && !hexValue.startsWith('#')) {
            baseColorInput.value = '#' + hexValue;
            updateColorPreview();
        }
    } else {
        baseColorInput.classList.remove('invalid');
    }
}

function getBaseColor() {
    const hexValue = baseColorInput.value.trim();
    
    if (isValidHex(hexValue)) {
        return hexValue;
    } else if (isNoneValue(hexValue)) {
        return null; // Return null to indicate no base color
    } else {
        // Generate a random color if input is invalid
        return generateRandomColor();
    }
}

function copyToClipboard(text, button) {
    // Try the modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button);
        }).catch(() => {
            fallbackCopyTextToClipboard(text, button);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text, button);
    }
}

function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess(button) {
    const originalIcon = button.className;
    button.className = 'fas fa-check copy-btn success';
    button.style.color = '#10b981';
    
    setTimeout(() => {
        button.className = originalIcon;
        button.style.color = '';
    }, 1500);
}

function showCopyError(button) {
    const originalIcon = button.className;
    button.className = 'fas fa-times copy-btn error';
    button.style.color = '#ef4444';
    
    setTimeout(() => {
        button.className = originalIcon;
        button.style.color = '';
    }, 1500);
}

// Color harmony functions
function generateAnalogousPalette() {
    const baseColor = getBaseColor();
    let baseHue, baseSaturation, baseLightness;
    
    if (baseColor) {
        [baseHue, baseSaturation, baseLightness] = hexToHsl(baseColor);
    } else {
        baseHue = Math.random() * 360;
        baseSaturation = 50 + Math.random() * 40;
        baseLightness = 40 + Math.random() * 30;
    }
    
    const colors = [];
    
    for (let i = 0; i < 5; i++) {
        const hue = (baseHue + (i - 2) * 30 + 360) % 360;
        const saturation = Math.max(20, Math.min(90, baseSaturation + (Math.random() - 0.5) * 20));
        const lightness = Math.max(20, Math.min(80, baseLightness + (Math.random() - 0.5) * 20));
        colors.push(hslToHex(hue, saturation, lightness));
    }
    
    return colors;
}

function generateMonochromaticPalette() {
    const baseColor = getBaseColor();
    let baseHue, baseSaturation, baseLightness;
    
    if (baseColor) {
        [baseHue, baseSaturation, baseLightness] = hexToHsl(baseColor);
    } else {
        baseHue = Math.random() * 360;
        baseSaturation = 50 + Math.random() * 40;
        baseLightness = 50;
    }
    
    const colors = [];
    
    for (let i = 0; i < 5; i++) {
        const lightness = Math.max(15, Math.min(85, baseLightness + (i - 2) * 15));
        colors.push(hslToHex(baseHue, baseSaturation, lightness));
    }
    
    return colors;
}

function generateComplementaryPalette() {
    const baseColor = getBaseColor();
    let baseHue, baseSaturation, baseLightness;
    
    if (baseColor) {
        [baseHue, baseSaturation, baseLightness] = hexToHsl(baseColor);
    } else {
        baseHue = Math.random() * 360;
        baseSaturation = 50 + Math.random() * 40;
        baseLightness = 40 + Math.random() * 30;
    }
    
    const complementaryHue = (baseHue + 180) % 360;
    const colors = [];
    
    // Base color and its variations
    colors.push(hslToHex(baseHue, baseSaturation, baseLightness));
    colors.push(hslToHex(baseHue, Math.max(20, baseSaturation - 20), Math.min(80, baseLightness + 20)));
    colors.push(hslToHex(baseHue, Math.min(90, baseSaturation + 20), Math.max(20, baseLightness - 20)));
    
    // Complementary color and its variations
    colors.push(hslToHex(complementaryHue, baseSaturation, baseLightness));
    colors.push(hslToHex(complementaryHue, Math.max(20, baseSaturation - 20), Math.min(80, baseLightness + 20)));
    
    return colors;
}

function generateTriadicPalette() {
    const baseColor = getBaseColor();
    let baseHue, baseSaturation, baseLightness;
    
    if (baseColor) {
        [baseHue, baseSaturation, baseLightness] = hexToHsl(baseColor);
    } else {
        baseHue = Math.random() * 360;
        baseSaturation = 50 + Math.random() * 40;
        baseLightness = 40 + Math.random() * 30;
    }
    
    const colors = [];
    
    for (let i = 0; i < 3; i++) {
        const hue = (baseHue + i * 120) % 360;
        colors.push(hslToHex(hue, baseSaturation, baseLightness));
    }
    
    // Add variations
    colors.push(hslToHex(baseHue, Math.max(20, baseSaturation - 20), Math.min(80, baseLightness + 20)));
    colors.push(hslToHex((baseHue + 120) % 360, Math.max(20, baseSaturation - 20), Math.min(80, baseLightness + 20)));
    
    return colors;
}

function generateTetradicPalette() {
    const baseColor = getBaseColor();
    let baseHue, baseSaturation, baseLightness;
    
    if (baseColor) {
        [baseHue, baseSaturation, baseLightness] = hexToHsl(baseColor);
    } else {
        baseHue = Math.random() * 360;
        baseSaturation = 50 + Math.random() * 40;
        baseLightness = 40 + Math.random() * 30;
    }
    
    const colors = [];
    
    for (let i = 0; i < 4; i++) {
        const hue = (baseHue + i * 90) % 360;
        colors.push(hslToHex(hue, baseSaturation, baseLightness));
    }
    
    // Add one more variation
    colors.push(hslToHex(baseHue, Math.max(20, baseSaturation - 20), Math.min(80, baseLightness + 20)));
    
    return colors;
}

function generateSplitComplementaryPalette() {
    const baseColor = getBaseColor();
    let baseHue, baseSaturation, baseLightness;
    
    if (baseColor) {
        [baseHue, baseSaturation, baseLightness] = hexToHsl(baseColor);
    } else {
        baseHue = Math.random() * 360;
        baseSaturation = 50 + Math.random() * 40;
        baseLightness = 40 + Math.random() * 30;
    }
    
    const colors = [];
    
    // Base color
    colors.push(hslToHex(baseHue, baseSaturation, baseLightness));
    colors.push(hslToHex(baseHue, Math.max(20, baseSaturation - 20), Math.min(80, baseLightness + 20)));
    
    // Split complementary colors (150° and 210° from base)
    colors.push(hslToHex((baseHue + 150) % 360, baseSaturation, baseLightness));
    colors.push(hslToHex((baseHue + 210) % 360, baseSaturation, baseLightness));
    colors.push(hslToHex((baseHue + 150) % 360, Math.max(20, baseSaturation - 20), Math.min(80, baseLightness + 20)));
    
    return colors;
}

function generateRandomPalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }
    return colors;
}

function generatePalette() {
    const paletteType = paletteTypeSelect.value;
    let colors = [];

    switch (paletteType) {
        case 'analogous':
            colors = generateAnalogousPalette();
            break;
        case 'monochromatic':
            colors = generateMonochromaticPalette();
            break;
        case 'complementary':
            colors = generateComplementaryPalette();
            break;
        case 'triadic':
            colors = generateTriadicPalette();
            break;
        case 'tetradic':
            colors = generateTetradicPalette();
            break;
        case 'split-complementary':
            colors = generateSplitComplementaryPalette();
            break;
        default:
            colors = generateRandomPalette();
    }

    updatePaletteDisplay(colors);
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        if (colors[index]) {
            const color = colors[index];
            const colorDiv = box.querySelector(".color");
            const hexValue = box.querySelector(".hex-value");

            colorDiv.style.backgroundColor = color;
            hexValue.textContent = color;
        }
    });

    // Re-attach copy event listeners to all copy buttons
    attachCopyListeners();
}

function attachCopyListeners() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        // Remove any existing event listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-query and attach new listeners
    const newCopyButtons = document.querySelectorAll('.copy-btn');
    newCopyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hexValue = this.parentElement.querySelector('.hex-value').textContent;
            copyToClipboard(hexValue, this);
        });
    });
}

// Set initial state and generate palette
baseColorInput.value = '';
updateColorPreview();
generatePalette();