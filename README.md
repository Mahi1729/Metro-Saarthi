# Metro Saarthi

> Plan a better journey through the city.

Metro Saarthi is a polished, client-side metro route planner for a Delhi NCR-inspired network. Choose your origin and destination, compare two route strategies, and get a clear journey breakdown with distance, travel time, stops, interchanges, and estimated fare.

## Highlights

- **Interactive station search** with source and destination selectors
- **Shortest-distance routing** powered by Dijkstra's algorithm
- **Fewest-stops routing** powered by breadth-first search (BFS)
- **Side-by-side route comparison** for distance, stops, and journey time
- **Visual network map** with the active route highlighted
- **Journey timeline** showing each station and interchange
- **Smart estimates** for fare, dwell time, and interchange time
- Responsive interface designed for desktop and mobile screens

## Preview

![Metro Saarthi route planner](src/assets/hero.png)

## Getting Started

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Install and run

```bash
git clone https://github.com/Mahi1729/Metro-Saarthi.git
cd Metro-Saarthi
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

## How It Works

The application models stations as graph nodes and metro connections as weighted edges. When a journey is requested, Metro Saarthi calculates both available route views:

| Route view | Algorithm | Optimizes for |
| --- | --- | --- |
| Shortest distance | Dijkstra | Total kilometres |
| Minimum stops | BFS | Number of station stops |

Each selected route is then summarized with:

- total distance and station count
- estimated journey time
- interchange count
- estimated Indian rupee fare
- station-by-station timeline

## Tech Stack

- **React** for the interface and component architecture
- **Vite** for development and production builds
- **JavaScript** for route and fare calculations
- **Lucide React** for interface icons
- **Tailwind CSS Vite plugin** alongside custom CSS styling

## Project Structure

```text
src/
├── algorithms/       # BFS and Dijkstra implementations
├── assets/           # Visual and static assets
├── components/       # Navigation, map, picker, route, and feature UI
├── data/             # Stations, lines, and graph connections
├── hooks/            # Route-planning state and orchestration
├── utils/            # Fare, journey-time, and route helpers
├── App.jsx           # Main application layout
└── style.css         # Visual system and responsive styling
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |

## Data and Scope

The current network is a self-contained demonstration dataset with 22 stations across four named lines. It does not call an external transit API, require a backend, or provide live service alerts. Network data can be expanded in `src/data/metroData.js`.

## License

This project currently has no declared open-source license.