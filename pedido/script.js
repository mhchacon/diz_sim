document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const proposal = document.getElementById('proposal');
    const result = document.getElementById('result');
    const pixelHeart = document.getElementById('pixelHeart');
    const container = document.querySelector('.container');
    
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
    
    // Crie um contêiner específico para o botão "Não"
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'noButtonContainer';
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.zIndex = '1000';
    buttonContainer.style.top = '0';
    buttonContainer.style.left = '0';
    buttonContainer.style.width = '100%';
    buttonContainer.style.height = '100%';
    buttonContainer.style.pointerEvents = 'none'; // Permite clicar através do contêiner
    document.body.appendChild(buttonContainer);
    
    // Mova o botão "Não" para o novo contêiner
    buttonContainer.appendChild(noButton);
    noButton.style.position = 'absolute';
    noButton.style.pointerEvents = 'auto'; // Permite interagir com o botão
    
    // Posicione o botão inicialmente
    positionNoButton();
    
    // Adicione o evento de mouseover
    noButton.addEventListener('mouseover', function() {
        positionNoButton();
    });
    
    // Adicione um evento de redimensionamento da janela
    window.addEventListener('resize', function() {
        positionNoButton();
    });
    
    function positionNoButton() {
        // Obtenha as dimensões da janela visível
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Obtenha as dimensões do botão
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;
        
        // Defina uma margem de segurança
        const safeMargin = 50;
        
        // Calcule os limites seguros
        const maxX = viewportWidth - buttonWidth - safeMargin;
        const maxY = viewportHeight - buttonHeight - safeMargin;
        
        // Gere uma posição aleatória dentro dos limites seguros
        const randomX = Math.floor(Math.random() * (maxX - safeMargin)) + safeMargin;
        const randomY = Math.floor(Math.random() * (maxY - safeMargin)) + safeMargin;
        
        // Posicione o botão
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
        
        // Verifique se o botão está visível
        console.log(`Botão posicionado em: X=${randomX}, Y=${randomY}, Limites: maxX=${maxX}, maxY=${maxY}`);
    }
    
    // Handle "Yes" button click
    yesButton.addEventListener('click', function() {
        proposal.classList.add('hidden');
        result.classList.remove('hidden');
        buttonContainer.style.display = 'none'; // Esconda o contêiner do botão "Não"
        
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