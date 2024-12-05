function viewLetter() {
    const modal = document.getElementById('letterModal');
    modal.style.display = 'block'; // Show the modal
}

function closeLetter() {
    const modal = document.getElementById('letterModal');
    modal.style.display = 'none'; // Hide the modal
}


function generateEvenlySpacedIcons() {
    const iconContainer = document.body; // Use the body as the container
    const icons = [
        './assets/paperplane.png',
        './assets/lettericon.png'
    ]; // Paths to your icons
    const rows = 10; // Number of rows in the grid
    const cols = 10; // Number of columns in the grid

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const cellWidth = viewportWidth / cols;
    const cellHeight = viewportHeight / rows;

    // Get the letter image's bounding rectangle
    const letterElement = document.querySelector('.letterimg img');
    const letterBounds = letterElement.getBoundingClientRect();

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const img = document.createElement('img');
            img.src = icons[Math.floor(Math.random() * icons.length)];
            img.className = 'random-icon';

            let attempts = 0;
            let randomX, randomY, left, top;

            do {
                randomX = Math.random() * cellWidth;
                randomY = Math.random() * cellHeight;
                left = col * cellWidth + randomX;
                top = row * cellHeight + randomY;

                attempts++;
                if (attempts > 50) {
                    console.warn("Max attempts reached for placing an icon.");
                    break; // Safeguard to prevent infinite loop
                }
            } while (
                left < letterBounds.right &&
                left + 30 > letterBounds.left &&
                top < letterBounds.bottom &&
                top + 30 > letterBounds.top
            );

            // Only place the icon if a valid position was found
            if (attempts <= 50) {
                img.style.left = `${left}px`;
                img.style.top = `${top}px`;
                iconContainer.appendChild(img);
            }
        }
    }
}

// Call the function after the DOM has loaded and the letter is positioned
window.onload = generateEvenlySpacedIcons;
