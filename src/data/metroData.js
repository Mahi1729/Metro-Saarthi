export const lines = {
  coral: { name: 'Coral Line', color: '#f97368', soft: '#fff0ed' },
  teal: { name: 'Teal Line', color: '#16a394', soft: '#e9f8f5' },
  amber: { name: 'Amber Line', color: '#e7a93b', soft: '#fff7e4' },
  indigo: { name: 'Indigo Line', color: '#5367d9', soft: '#eef0ff' },
}

export const stations = [
  { id: 'rajiv-chowk', name: 'Rajiv Chowk', line: 'coral', coordinates: { x: 430, y: 230 } },
  { id: 'central-secretariat', name: 'Central Secretariat', line: 'coral', coordinates: { x: 430, y: 310 } },
  { id: 'lajpat-nagar', name: 'Lajpat Nagar', line: 'coral', coordinates: { x: 430, y: 390 } },
  { id: 'nehru-place', name: 'Nehru Place', line: 'coral', coordinates: { x: 430, y: 470 } },
  { id: 'botanical-garden', name: 'Botanical Garden', line: 'coral', coordinates: { x: 430, y: 550 } },
  { id: 'kashmere-gate', name: 'Kashmere Gate', line: 'teal', coordinates: { x: 170, y: 210 } },
  { id: 'civil-lines', name: 'Civil Lines', line: 'teal', coordinates: { x: 250, y: 270 } },
  { id: 'vidhan-sabha', name: 'Vidhan Sabha', line: 'teal', coordinates: { x: 330, y: 330 } },
  { id: 'hauz-khas', name: 'Hauz Khas', line: 'teal', coordinates: { x: 430, y: 390 } },
  { id: 'huda-city-centre', name: 'Huda City Centre', line: 'teal', coordinates: { x: 540, y: 455 } },
  { id: 'noida-sector-18', name: 'Noida Sector 18', line: 'teal', coordinates: { x: 650, y: 520 } },
  { id: 'dwarka', name: 'Dwarka', line: 'amber', coordinates: { x: 120, y: 470 } },
  { id: 'janakpuri-west', name: 'Janakpuri West', line: 'amber', coordinates: { x: 210, y: 420 } },
  { id: 'rajouri-garden', name: 'Rajouri Garden', line: 'amber', coordinates: { x: 300, y: 370 } },
  { id: 'karol-bagh', name: 'Karol Bagh', line: 'amber', coordinates: { x: 360, y: 300 } },
  { id: 'anand-vihar', name: 'Anand Vihar', line: 'amber', coordinates: { x: 570, y: 300 } },
  { id: 'shahdara', name: 'Shahdara', line: 'amber', coordinates: { x: 660, y: 250 } },
  { id: 'airport-terminal', name: 'Airport Terminal', line: 'indigo', coordinates: { x: 120, y: 180 } },
  { id: 'aerocity', name: 'Aerocity', line: 'indigo', coordinates: { x: 215, y: 180 } },
  { id: 'new-delhi', name: 'New Delhi', line: 'indigo', coordinates: { x: 330, y: 180 } },
  { id: 'pragati-maidan', name: 'Pragati Maidan', line: 'indigo', coordinates: { x: 530, y: 180 } },
  { id: 'mayur-vihar', name: 'Mayur Vihar', line: 'indigo', coordinates: { x: 640, y: 180 } },
]

const edges = [
  ['rajiv-chowk', 'central-secretariat', 1.8, 4, 'coral'], ['central-secretariat', 'lajpat-nagar', 2.4, 5, 'coral'], ['lajpat-nagar', 'nehru-place', 2.1, 4, 'coral'], ['nehru-place', 'botanical-garden', 3.2, 7, 'coral'],
  ['kashmere-gate', 'civil-lines', 1.4, 3, 'teal'], ['civil-lines', 'vidhan-sabha', 2.1, 4, 'teal'], ['vidhan-sabha', 'hauz-khas', 3.6, 7, 'teal'], ['hauz-khas', 'huda-city-centre', 4.2, 8, 'teal'], ['huda-city-centre', 'noida-sector-18', 5.5, 10, 'teal'],
  ['dwarka', 'janakpuri-west', 2.2, 4, 'amber'], ['janakpuri-west', 'rajouri-garden', 2.8, 5, 'amber'], ['rajouri-garden', 'karol-bagh', 3.1, 6, 'amber'], ['karol-bagh', 'rajiv-chowk', 2.0, 4, 'amber'], ['rajiv-chowk', 'anand-vihar', 4.0, 8, 'amber'], ['anand-vihar', 'shahdara', 2.4, 5, 'amber'],
  ['airport-terminal', 'aerocity', 1.5, 3, 'indigo'], ['aerocity', 'new-delhi', 3.8, 7, 'indigo'], ['new-delhi', 'pragati-maidan', 2.7, 5, 'indigo'], ['pragati-maidan', 'mayur-vihar', 2.3, 5, 'indigo'],
  ['rajiv-chowk', 'new-delhi', 1.2, 3, 'indigo'], ['lajpat-nagar', 'hauz-khas', 2.6, 5, 'teal'], ['central-secretariat', 'karol-bagh', 2.2, 5, 'amber'], ['nehru-place', 'noida-sector-18', 4.0, 8, 'coral'], ['anand-vihar', 'mayur-vihar', 2.5, 5, 'indigo'], ['kashmere-gate', 'airport-terminal', 5.6, 11, 'indigo'],
]

export const connections = edges.flatMap(([from, to, distance, time, line]) => [
  { from, to, distance, time, line }, { from: to, to: from, distance, time, line },
])

export const metroGraph = stations.reduce((graph, station) => ({ ...graph, [station.id]: [] }), {})
connections.forEach((connection) => metroGraph[connection.from].push({ station: connection.to, ...connection }))

export const stationById = Object.fromEntries(stations.map((station) => [station.id, station]))
