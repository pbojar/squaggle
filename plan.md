# Squaggle Roadmap

## Phase 1 - Server Setup

- [x] Setup Go module
- [x] Create a simple HTTP server
- [x] Serve a static `index.html` file
- [ ] Add game elements/placeholders to `index.html`
- [x] Create `main.js` and link it to `index.html`
- [x] Confirm `main.js` is linked

## Phase 2 - Game Board and Letter Generation

- [x] Create english classic 4x4 dice set
- [x] Create english modern 4x4 dice set
- [ ] Create english modern 5x5 dice set
- [ ] Link dice set to game board
- [ ] Add methods to align/shuffle die orientations on board
- [ ] Create API endpoints for `/newgame`, `/align-X`, `/shuffle` etc... that return/alter board state
- [ ] Dynamically create appropriate grid using javascript

## Phase 3 - Playing the Game

- [ ] Add event listeners to letter tiles
- [ ] Highlight grid on selection
- [ ] Keep track of selected letters to form words
- [ ] Disallow invalid selections based on boggle rules

## Phase 4 - Word Validation

- [x] Extract appropriate words from open-source dictionaries (e.g., wiktionary)
- [ ] Create SQL DB of definitions and index.txt with sorted words
- [ ] Implement a directed acyclic word graph to enable fast validation
