document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const proposal = document.getElementById('proposal');
    const result = document.getElementById('result');
    const pixelHeart = document.getElementById('pixelHeart');
    
    // Heart pattern (1 = pixel, 0 = no pixel)
    const heartPattern = [
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
    ];
    
    // Make the "No" button run away
    noButton.addEventListener('mouseover', function() {
        // Calculate random position within the viewport
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noButton.style.position = 'fixed';
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
    });
    
    // Handle "Yes" button click
    yesButton.addEventListener('click', function() {
        proposal.classList.add('hidden');
        result.classList.remove('hidden');
        
        // Create pixel heart
        createPixelHeart();
    });
    
    function createPixelHeart() {
        // Create all pixels first
        for (let y = 0; y < heartPattern.length; y++) {
            for (let x = 0; x < heartPattern[y].length; x++) {
                const pixel = document.createElement('div');
                pixel.classList.add('pixel');
                
                if (heartPattern[y][x] === 1) {
                    pixel.dataset.x = x;
                    pixel.dataset.y = y;
                }
                
                pixelHeart.appendChild(pixel);
            }
        }
        
        // Get all pixels that should be active
        const activePixels = [];
        document.querySelectorAll('.pixel[data-x]').forEach(pixel => {
            activePixels.push(pixel);
        });
        
        // Shuffle array for random reveal
        shuffleArray(activePixels);
        
        // Reveal pixels one by one
        let i = 0;
        const interval = setInterval(() => {
            if (i < activePixels.length) {
                activePixels[i].classList.add('active');
                i++;
            } else {
                clearInterval(interval);
            }
        }, 50);
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});