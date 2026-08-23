import { stationById, stations, connections, lines } from '../data/metroData'

export function MetroMap({ route }) {
  const routeSet = new Set(route?.path || [])
  const activeEdges = new Set((route?.edges || []).flatMap((edge) => [`${edge.from}-${edge.to}`, `${edge.to}-${edge.from}`]))
  return <div className="map-shell"><div className="map-caption"><span><i className="live-dot" />Live network topology</span><span>{route ? `${route.path.length} stations in route` : 'Select stations to highlight a route'}</span></div><div className="map-scroll"><svg className="metro-map" viewBox="0 0 780 650" role="img" aria-label="Metro network visualization">
    <g className="map-grid">{Array.from({ length: 9 }).map((_, index) => <line key={`v${index}`} x1={80 + index * 80} y1="70" x2={80 + index * 80} y2="590" />)}{Array.from({ length: 7 }).map((_, index) => <line key={`h${index}`} x1="50" y1={90 + index * 80} x2="730" y2={90 + index * 80} />)}</g>
    {connections.filter((edge) => edge.from < edge.to).map((edge) => { const from = stationById[edge.from]; const to = stationById[edge.to]; const active = activeEdges.has(`${edge.from}-${edge.to}`); return <line key={`${edge.from}-${edge.to}-${edge.line}`} className={`map-edge ${active ? 'active-edge' : ''}`} x1={from.coordinates.x} y1={from.coordinates.y} x2={to.coordinates.x} y2={to.coordinates.y} stroke={lines[edge.line].color} /> })}
    {stations.map((station) => <g key={station.id} className={`map-node ${routeSet.has(station.id) ? 'active-node' : ''} ${route?.path?.[0] === station.id || route?.path?.at(-1) === station.id ? 'terminal-node' : ''}`}><circle cx={station.coordinates.x} cy={station.coordinates.y} r={routeSet.has(station.id) ? 9 : 5} fill={routeSet.has(station.id) ? '#fffdf8' : lines[station.line].color} stroke={lines[station.line].color} /><text x={station.coordinates.x + 12} y={station.coordinates.y - 10}>{station.name}</text></g>)}
  </svg></div><div className="map-legend">{Object.entries(lines).map(([key, line]) => <span key={key}><i style={{ background: line.color }} />{line.name}</span>)}</div></div>
}
