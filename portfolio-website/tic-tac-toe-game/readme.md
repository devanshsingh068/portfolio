Tic-Tac-Toe: Glassmorphism Edition
A sleek, responsive, and interactive Tic-Tac-Toe web application featuring a modern "glassmorphism" UI design, pixel-art background, and synchronized audio feedback.

## Features
Glassmorphism UI: Uses CSS backdrop-filter to create a frosted glass effect on game tiles.

Animated Strike-through: A dynamic line that animates and rotates to highlight the winning combination.

Responsive Design: Built with CSS Grid to ensure the game board scales perfectly for mobile and desktop.

Audio Feedback: Includes custom sound effects for player moves, wins, and background music.

Celebratory Elements: Displays a victory sticker and changes status text when a player wins.

## Tech Stack
Frontend: HTML5, CSS3.

Logic: JavaScript (ES6).

Assets: Custom Pixel Art background and MP3 audio files.

## File Structure
Plaintext
├── index.html      # Layout and structure
├── index.css       # Styling, glassmorphism, and animations
├── script.js       # Game logic and win detection
├── background.jpg  # Pixel art background
├── sticker.png     # Victory celebration sticker
├── music.mp3       # Background music
├── ting.mp3        # Turn sound effect
└── gameover.mp3    # Game over sound effect
## How to Play
Clone the Repo:

Bash
git clone https://github.com/your-username/tic-tac-toe.git
Open the Game: Simply open index.html in your web browser.

Gameplay: Click on any empty tile to place your mark (X or 0).

Win: Align three marks horizontally, vertically, or diagonally to win.

Reset: Click the "Reset" button to clear the board and start a new game.

## Technical Highlights
### Win Detection Logic
The game calculates wins using a predefined array of winning indices and corresponding CSS transform coordinates to position the strike-through line:

JavaScript
const wins = [
    [0, 1, 2, 5, 5, 0],   // Row 1
    [3, 4, 5, 5, 15, 0],  // Row 2
    // [box1, box2, box3, translateX, translateY, rotate]
];