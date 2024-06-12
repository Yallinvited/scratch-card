document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');

    const underneathImage = new Image();
    const overlayImage = new Image();

    // Set the source of the underneath image
    underneathImage.src = 'IMG_2709.JPG';
    console.log('Loading underneath image...');

    // Set the source of the overlay image
    overlayImage.src = '733919D9-D6C1-4047-94ED-F5BF1A4A3C26.PNG'; // Replace with your transparent PNG image
    console.log('Loading overlay image...');

    // Ensure both images load before setting up the canvas
    let imagesLoaded = 0;
    const onImageLoad = () => {
        imagesLoaded += 1;
        console.log(`Image loaded: ${imagesLoaded}`);
        if (imagesLoaded === 2) {
            setupCanvas();
        }
    };

    underneathImage.onload = onImageLoad;
    overlayImage.onload = onImageLoad;

    underneathImage.onerror = () => {
        console.error('Failed to load underneath image.');
    };

    overlayImage.onerror = () => {
        console.error('Failed to load overlay image.');
    };

    function setupCanvas() {
        // Ensure the canvas matches the size of the underneath image
        canvas.width = underneathImage.width;
        canvas.height = underneathImage.height;

        // Draw the overlay image on the canvas
        ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
        console.log('Overlay image drawn on canvas.');
    }

    let isDrawing = false;

    // Event listeners for scratching functionality
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        scratch(e);
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        ctx.beginPath();
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        scratch(e);
    });

    function scratch(e) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 30;
        ctx.lineCap = 'round';

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
});

