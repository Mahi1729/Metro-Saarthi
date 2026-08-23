import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'

export function StationPicker({ label, value, onChange, stations, exclude }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const selected = stations.find((station) => station.id === value)
  const filtered = stations.filter((station) => station.id !== exclude && station.name.toLowerCase().includes(query.toLowerCase()))
  return <div className="picker-wrap">
    <label>{label}</label>
    <button className={`picker ${open ? 'picker-open' : ''}`} onClick={() => setOpen(!open)} type="button">
      <span className="picker-dot" style={{ background: selected ? selected.lineColor : '#ccd1d8' }} />
      <span className={selected ? '' : 'muted'}>{selected?.name || `Select ${label.toLowerCase()} station`}</span>
      <ChevronDown size={17} className={open ? 'rotate' : ''} />
    </button>
    {open && <div className="picker-menu">
      <div className="picker-search"><Search size={16} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stations..." /></div>
      <div className="station-options">{filtered.map((station) => <button key={station.id} type="button" onClick={() => { onChange(station.id); setOpen(false); setQuery('') }}><span className="option-line" style={{ background: station.lineColor }} /><span>{station.name}</span><small>{station.lineName}</small></button>)}{!filtered.length && <p className="empty-search">No stations found</p>}</div>
    </div>}
  </div>
}
