import { Clock3, IndianRupee, MapPin, Repeat2, Route as RouteIcon, TrainFront } from 'lucide-react'
import { RouteTimeline } from './RouteTimeline'

export function RouteSummary({ route }) {
  if (!route) return null
  const stats = [[MapPin, `${route.distance.toFixed(1)} km`, 'Distance'], [Clock3, `${route.time} min`, 'Journey time'], [TrainFront, `${route.stops} stops`, 'Stations'], [Repeat2, `${route.interchanges.length}`, 'Interchanges'], [IndianRupee, `₹${route.fare}`, 'Est. fare']]
  return <section className="results-section" id="results"><div className="section-kicker">Your route</div><div className="route-heading"><div><h2>Journey details</h2><p>{route.stationNames[0]} <span>to</span> {route.stationNames.at(-1)}</p></div><span className="algorithm-chip"><RouteIcon size={15} />{route.algorithm === 'stops' ? 'BFS · Minimum stops' : 'Dijkstra · Shortest distance'}</span></div><div className="summary-grid">{stats.map(([Icon, value, label]) => <div className="summary-stat" key={label}><Icon size={17} /><strong>{value}</strong><span>{label}</span></div>)}</div><div className="route-layout"><div className="timeline-panel"><div className="panel-label">Station timeline <span>{route.path.length} stations</span></div><RouteTimeline route={route} /></div><div className="route-note"><div className="note-icon"><TrainFront size={20} /></div><strong>Smart journey estimate</strong><p>Includes {route.interchanges.length ? '5 minutes per interchange' : 'no interchange'} and a 30-second dwell time at each stop.</p></div></div></section>
}
