# Battleship

An online version of the classic game **Battleship**, built with JavaScript using the Test-Driven Development (TDD) method. The game logic is rigorously tested with Jest, and Babel is used for ES6+ compatibility.

## Table of Contents

- [About the Game](#about-the-game)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Game Rules](#game-rules)

## About the Game

Battleship is a classic strategy game where players take turns to guess the location of their opponent's ships. The goal is to sink all of the opponent's ships before they sink yours.

## Features

- **Interactive Gameplay**: Play against a computer opponent.
- **Single-Player Mode**: The game features an AI opponent for solo play.
- **Game Logic**: Implemented using a modular JavaScript codebase, ensuring reusability and scalability.
- **Test-Driven Development**: The entire game logic is built following TDD using Jest.
- **Modern JavaScript**: Uses ES6+ syntax with Babel for cross-browser compatibility.

## Technologies Used

- **JavaScript (ES6+)**
- **Jest** for unit testing
- **Babel** for compiling ES6+ JavaScript
- **HTML5 & CSS3** for the front end
- **Webpack** for bundling assets

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Rui-23/battleship.git
    ```

2. Navigate to the project directory:
    ```bash
    cd battleship
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Build the project:
    ```bash
    npm run build
    ```

5. Start the local server:
    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:8080` to play the game.

## Testing

The project is built using the Test-Driven Development (TDD) approach with Jest. To run the tests, use the following command:

```bash
npm test
```

All the game logic is thoroughly tested to ensure correct functionality.

## Game Rules

1. Take turns guessing the location of the opponent's ships.
2. The game tracks hits, misses, and ships that have been sunk.
3. The first player to sink all of the opponent's ships wins.

---

Feel free to modify this template to suit your project's specifics!