const imageUpload = document.getElementById('image-upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorBox = document.getElementById('color-box');
const hexCodeSpan = document.getElementById('hex-code');
const copyButton = document.getElementById('copy-button');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const output = document.getElementById('output');

// Handle image upload
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                canvas.style.display = 'block';
                output.style.visibility = 'visible';
            };
            img.onerror = () => {
                alert('Error loading the image. Please try another image.');
            };
        };
        reader.onerror = () => {
            alert('Error reading the file. Please try another image.');
        };
        reader.readAsDataURL(file);
    }
});

// Get color from image on click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    const hex = rgbToHex(imageData[0], imageData[1], imageData[2]);
    colorBox.style.backgroundColor = hex;
    hexCodeSpan.textContent = hex;
    copyButton.style.display = 'inline-block';
});

// Convert RGB to Hex
function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("");
}

// Copy hex code to clipboard
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(hexCodeSpan.textContent)
        .then(() => alert('Hex code copied to clipboard!'))
        .catch(() => alert('Failed to copy hex code.'));
});

// Toggle Light/Dark Mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
});
