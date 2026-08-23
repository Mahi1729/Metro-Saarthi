import { ArrowDown, Repeat2 } from 'lucide-react'
import { lines } from '../data/metroData'

export function RouteTimeline({ route }) {
  return <div className="timeline">{route.path.map((stationId, index) => { const edge = route.edges[index]; const interchange = route.interchanges.includes(stationId); return <div className="timeline-row" key={stationId}><div className={`timeline-marker ${index === 0 || index === route.path.length - 1 ? 'terminal' : ''}`}><span /></div><div className={`timeline-copy ${interchange ? 'interchange' : ''}`}><strong>{route.stationNames[index]}</strong>{interchange && <em><Repeat2 size={13} /> Change to {lines[edge.line].name}</em>}{edge && <div className="segment"><ArrowDown size={15} style={{ color: lines[edge.line].color }} /><span style={{ color: lines[edge.line].color }}>{lines[edge.line].name}</span><small>{edge.time} min</small></div>}</div></div> })}</div>
}
